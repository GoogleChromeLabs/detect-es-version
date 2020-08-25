const path = require('path');
const async = require('async');
const InstallationUtils = require('./utils/installation-utils');
const PackageJsonUtils = require('./utils/package-json-utils');
const { getLocalPackageEcmaVersion } = require('./index');
const { DEFAULT_MAX_THREADS } = require('./constants');

const ALL_FIELDS = [
  'main',
  'module',
  'browser',
  'jsnext:main',
  'modern',
  'source',
  'exports.browser',
];

async function safeGetPackageMetrics(pkg) {
  try {
    return await getPackageMetrics(pkg);
  } catch (e) {
    return {
      packageName: pkg.name,
      error: e.message,
    };
  }
}

function createResolverOptions(entryPointField) {
  return entryPointField.startsWith('exports.')
    ? {
        mainFields: ALL_FIELDS,
        conditionNames: new Set(entryPointField.replace('exports.', '')),
      }
    : {
        mainFields: [entryPointField, ...ALL_FIELDS],
      };
}

/**
 * Get a package's metrics
 * @param {String} packagePath An absolute path to a package directory
 * @returns Promise<{Object}> Returns metrics for the package
 */
async function getLocalPackageMetrics(packagePath) {
  const packageJson = await PackageJsonUtils.getPackageJSON(packagePath);

  return Object.fromEntries(
    await async.mapLimit(
      ALL_FIELDS.filter((field) =>
        PackageJsonUtils.getObjectField(packageJson, field)
      ),
      DEFAULT_MAX_THREADS,
      async (field) => {
        const ecmaVersion = await getLocalPackageEcmaVersion(
          packagePath,
          createResolverOptions(field)
        );
        return [field, ecmaVersion];
      }
    )
  );
}

/**
 * Get a package's metrics
 * @param {Object} pkg An object representing a package
 * @returns {Object} Returns metrics for the package
 */
async function getPackageMetrics(pkg) {
  const packageString = pkg.name + '@' + pkg.version;
  const installPath = await InstallationUtils.getInstallPath();
  await InstallationUtils.installPackage(packageString, installPath);
  const packageMetrics = await getLocalPackageMetrics(
    path.join(installPath, 'node_modules', pkg.name)
  );
  await InstallationUtils.cleanupPath(installPath);
  return { packageName: pkg.name, ...packageMetrics };
}

/**
 * Get a list of packages' metrics
 * @param {Object[]} packageList A list of packages
 * @return {Promise<Object[]>} Returns a list of metrics objects. Erroneous metrics are removed.
 */
async function getPackageListMetrics(packageList) {
  const packageMetrics = await async.mapLimit(
    packageList,
    DEFAULT_MAX_THREADS,
    safeGetPackageMetrics
  );
  return packageMetrics.filter((packageMetrics) => !packageMetrics['error']);
}

module.exports = {
  getPackageListMetrics,
  getPackageMetrics,
  getLocalPackageMetrics,
};
