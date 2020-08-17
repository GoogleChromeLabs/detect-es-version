'use strict'
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const parsePackageString = require('npm-package-arg');
const enhancedResolve = require('enhanced-resolve');
const InstallationUtils = require('./utils/installation-utils');
const getEcmaVersion = require('./get-ecma-version-ast.js');

const resolve = promisify(enhancedResolve.create({
    mainFields: ['module', 'browser', 'main'],
}));

function isEcmaVersionModern(ecmaVersion) {
    return ecmaVersion > 5;
}

async function getLocalPackageEcmaVersion(packagePath) {
    const entryPoint = await resolve(packagePath, '.');
    const code = fs.readFileSync(entryPoint, 'utf8');
    // TODO (ISSUE#5) Implement recursive getLocalPackageEcmaVersion
    return getEcmaVersion(code);
}

async function getPackageEcmaVersion(packageString) {
    const parsedPackage = parsePackageString(packageString);

    const installPath = await InstallationUtils.getInstallPath();
    await InstallationUtils.installPackage(parsedPackage.name, installPath);

    const packagePath = path.join(installPath, 'node_modules', parsedPackage.name);
    const ecmaVersion = await getLocalPackageEcmaVersion(packagePath);

    await InstallationUtils.cleanupPath(installPath);

    return ecmaVersion;
}

module.exports = { getEcmaVersion, getPackageEcmaVersion, getLocalPackageEcmaVersion, isEcmaVersionModern };
