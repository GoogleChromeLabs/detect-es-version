const path = require('path');
const async = require('async');
const InstallationUtils = require('./utils/installation-utils');
const PackageJsonUtils = require('./utils/package-json-utils');
const { getLocalPackageEcmaVersion } = require('./index');
const DEFAULT_MAX_THREADS = 10;
// Prefers fields closer to the beginning of the list
const MODERN_FIELDS = ['exports.browser', 'browser', 'module'];
const ALL_FIELDS = ['module', 'browser', 'main'];

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

/**
 * Get a package's metrics
 * @param {String} packagePath An absolute path to a package directory
 * @returns Promise<{Object}> Returns metrics for the package
 */
async function getLocalPackageMetrics(packagePath) {
  const packageMetrics = {};
  const packageJson = await PackageJsonUtils.getPackageJSON(packagePath);
  if (PackageJsonUtils.getObjectField(packageJson, 'main')) {
    packageMetrics.main = await getLocalPackageEcmaVersion(packagePath, {
      mainFields: ['main', ...ALL_FIELDS],
    });
  }
  for (const modernField of MODERN_FIELDS) {
    if (PackageJsonUtils.getObjectField(packageJson, modernField)) {
      packageMetrics.modern = await getLocalPackageEcmaVersion(packagePath, {
        mainFields: modernField.includes('.')
          ? ALL_FIELDS
          : [modernField, ...ALL_FIELDS],
        conditionNames: modernField.startsWith('exports.')
          ? new Set(modernField.replace('exports.', ''))
          : [],
      });
      packageMetrics.modernField = modernField;
      break;
    }
  }
  return packageMetrics;
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
