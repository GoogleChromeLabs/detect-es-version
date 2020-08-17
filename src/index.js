'use strict'
const fs = require('fs');
const { promisify } = require('util');
const parsePackageString = require('npm-package-arg');
const enhancedResolve = require('enhanced-resolve');
const InstallationUtils = require('./utils/installation-utils');
const getEcmaVersionAST = require('./get-ecma-version-ast.js');

const resolve = promisify(enhancedResolve.create({
    mainFields: ['module', 'browser', 'main'],
}));

function isEcmaVersionModern(ecmaVersion) {
    return ecmaVersion > 5;
}

async function getEntryPointEcmaVersion(context, packageName) {
    const resolvedPath = await resolve(context, packageName);
    const code = fs.readFileSync(resolvedPath, 'utf8');
    // TODO (ISSUE#5) Implement recursive getEntryPointEcmaVersion
    return getEcmaVersion(code);
}

async function getPackageEcmaVersion(packageString) {
    const parsedPackage = parsePackageString(packageString);
    const installPath = await InstallationUtils.getInstallPath();
    await InstallationUtils.installPackage(parsedPackage.name, installPath);
    const ecmaVersion = await getEntryPointEcmaVersion(installPath, parsedPackage.name);
    await InstallationUtils.cleanupPath(installPath);
    return ecmaVersion;
}

function getEcmaVersion(code) {
    return getEcmaVersionAST(code);
}

module.exports = { getEcmaVersion, getPackageEcmaVersion, getEntryPointEcmaVersion, isEcmaVersionModern };
