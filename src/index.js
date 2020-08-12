'use strict'
const fs = require('fs');
const parsePackageString = require('npm-package-arg');
const enhancedResolve = require('enhanced-resolve');
const InstallationUtils = require('./utils/installation-utils');
const getEcmaVersionAST = require('./get-ecma-version-ast.js');

const resolve = enhancedResolve.create.sync({
    modules: ['node_modules'],
    mainFields: ['browser', 'module', 'main', 'style'],
});

function isEcmaVersionModern(ecmaVersion) {
    return ecmaVersion > 5;
}

function getEntryPointEcmaVersion(context, packageName) {
    const resolvedPath = resolve(context, packageName);
    const code = fs.readFileSync(resolvedPath, 'utf8');
    // TODO (ISSUE#5) Implement recursive getEntryPointEcmaVersion
    return getEcmaVersion(code);
}

function getPackageEcmaVersion(packageString) {
    const parsedPackage = parsePackageString(packageString);
    const installPath = InstallationUtils.getInstallPath();
    InstallationUtils.installPackage(parsedPackage.name, installPath);
    const ecmaVersion = getEntryPointEcmaVersion(installPath, parsedPackage.name);
    InstallationUtils.cleanupPath(installPath);
    return ecmaVersion;
}

function getEcmaVersion(code) {
    return getEcmaVersionAST(code);
}

module.exports = { getEcmaVersion, getPackageEcmaVersion, getEntryPointEcmaVersion, isEcmaVersionModern };
