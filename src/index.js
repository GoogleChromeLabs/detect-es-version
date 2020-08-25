'use strict';
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const async = require('async');
const parsePackageString = require('npm-package-arg');
const enhancedResolve = require('enhanced-resolve');
const acorn = require('acorn');
const walker = require('acorn-walk');
const types = require('ast-module-types');
const InstallationUtils = require('./utils/installation-utils');

const MIN_ECMA_VERSION = 5;
const MAX_THREADS = 10;
const DEFAULT_RESOLVER_OPTIONS = {
  mainFields: ['module', 'browser', 'main'],
  conditionNames: ['browser'],
};
const DEFAULT_PARSER_OPTIONS = {
  ecmaVersion: 2020,
  sourceType: 'module',
  allowHashBang: true,
};

function getNodeEcmaVersion(node) {
  switch (node.type) {
    case 'ClassDeclaration':
      return 2015;
    case 'ClassExpression':
      return 5;
    case 'VariableDeclaration':
      if (node.kind === 'const') {
        return 2015;
      }
    case 'FunctionDeclaration':
      if (node.async) {
        return 2017;
      }
    default:
      return 5;
  }
}

function getNodeDependency(node) {
  switch (node.type) {
    case 'ImportDeclaration':
    case 'ExportNamedDeclaration':
    case 'ExportAllDeclaration':
      if (node.source && node.source.value) {
        return node.source.value;
      }
      break;
    case 'CallExpression':
      if (types.isPlainRequire(node)) {
        if (
          node.arguments[0].type === 'Literal' ||
          node.arguments[0].type === 'StringLiteral'
        ) {
          return node.arguments[0].value;
        } else if (node.arguments[0].type === 'TemplateLiteral') {
          return node.arguments[0].quasis[0].value.raw;
        }
      } else if (types.isMainScopedRequire(node)) {
        return node.arguments[0].value;
      }
  }
}

/**
 * Determines whether a given ecma version is considered modern
 * @param ecmaVersion The given ecma version
 * @return {boolean} True if the ecma version is >5. False otherwise.
 */
function isEcmaVersionModern(ecmaVersion) {
  return ecmaVersion > 5;
}

/**
 * Determines the ecma version of a string of source code or AST
 * @param {String|Object} content The source code or AST to inspect
 * @return {Number} The ecma version of the source code or AST
 */
function getEcmaVersion(content) {
  let ecmaVersion = MIN_ECMA_VERSION;
  const ast =
    typeof content === 'object'
      ? content
      : acorn.parse(content, DEFAULT_PARSER_OPTIONS);
  walker.full(ast, function (node) {
    ecmaVersion = Math.max(ecmaVersion, getNodeEcmaVersion(node));
  });
  return ecmaVersion;
}

/**
 * Determines the ecma version of an entry point and its dependency tree
 * @param {String} entryPoint An absolute filepath to an entry point
 * @param {Object} resolverOptions The resolver options for resolving entry points
 * @param {Set<String>} visited A set of visited entry points
 * @return {Promise<Number>} The ecma version of the entry point and its dependency tree
 */
async function getEntryPointEcmaVersion(
  entryPoint,
  resolverOptions = DEFAULT_RESOLVER_OPTIONS,
  visited = new Set()
) {
  if (visited.has(entryPoint) || entryPoint.endsWith('json')) {
    return MIN_ECMA_VERSION;
  }
  visited.add(entryPoint);

  let entryEcmaVersion = MIN_ECMA_VERSION;
  let dependencies = [];

  const code = await fs.readFile(entryPoint, 'utf8');
  const ast = acorn.parse(code, DEFAULT_PARSER_OPTIONS);

  walker.full(ast, function (node) {
    entryEcmaVersion = Math.max(entryEcmaVersion, getNodeEcmaVersion(node));
    const dependency = getNodeDependency(node);
    if (dependency && dependency.startsWith('.')) {
      dependencies.push(dependency);
    }
  });

  const resolve = promisify(enhancedResolve.create(resolverOptions));
  const dependencyEcmaVersions = await async.mapLimit(
    dependencies,
    MAX_THREADS,
    async (dependency) => {
      const dependencyPath = await resolve(
        path.dirname(entryPoint),
        dependency
      );
      return await getEntryPointEcmaVersion(
        dependencyPath,
        resolverOptions,
        visited
      );
    }
  );
  return Math.max(entryEcmaVersion, ...dependencyEcmaVersions);
}

/**
 * Returns the ecma version of an entry point of a package
 * @param {String} packagePath An absolute filepath to a package
 * @param {Object} resolverOptions The resolver options for resolving entry points
 * @return {Promise<Number>} The ecma version of the entry point and its dependency tree
 */
async function getLocalPackageEcmaVersion(
  packagePath,
  resolverOptions = DEFAULT_RESOLVER_OPTIONS
) {
  const resolve = promisify(enhancedResolve.create(resolverOptions));
  const entryPoint = await resolve(packagePath, '.');
  return await getEntryPointEcmaVersion(entryPoint, resolverOptions);
}

/**
 * Returns the ecma version of an entry point of a package installed from npm
 * @param {String} packageString A string representing the package. e.g. preact@10.4.7
 * @param {Object} resolverOptions The resolver options for resolving entry points
 * @return {Promise<Number>} The ecma version of the entry point and its dependency tree
 */
async function getPackageEcmaVersion(
  packageString,
  resolverOptions = DEFAULT_RESOLVER_OPTIONS
) {
  const installPath = await InstallationUtils.getInstallPath();
  await InstallationUtils.installPackage(packageString, installPath);

  const packageName = parsePackageString(packageString).name;
  const packagePath = path.join(installPath, 'node_modules', packageName);
  const ecmaVersion = await getLocalPackageEcmaVersion(
    packagePath,
    resolverOptions
  );

  await InstallationUtils.cleanupPath(installPath);
  return ecmaVersion;
}

module.exports = {
  getEcmaVersion,
  getEntryPointEcmaVersion,
  getPackageEcmaVersion,
  getLocalPackageEcmaVersion,
  isEcmaVersionModern,
};
