#!/usr/bin/env node
'use strict'
const ora = require("ora");
const { getPackageEcmaVersion, isEcmaVersionModern } = require("./src/index.js");

function main(packageString) {
    const spinner = ora({stream: process.stdout});
    spinner.text = `Fetching ${packageString}`;
    spinner.start();
    try {
        const ecmaVersion = getPackageEcmaVersion(packageString)
        if (isEcmaVersionModern(ecmaVersion)) {
            spinner.succeed(`${packageString} is modern (ES${ecmaVersion})!`);
        } else {
            spinner.warn(`${packageString} is legacy (ES${ecmaVersion}).`);
        }
        process.exit(0);
    } catch (e) {
        spinner.fail(`Unable to fetch the package ${packageString}. ${e.message}`);
        process.exit(1);
    }
}

const packageString = process.argv[2];
main(packageString);
