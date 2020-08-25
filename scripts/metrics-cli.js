#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const ora = require('ora');
const { argv } = require('yargs');
const { getPackageListMetrics } = require('../src/metrics');
let DEFAULT_INPUT_FILE_PATH = path.join(
  __dirname,
  'fixtures',
  'top-1000-packages.json'
);
const DEFAULT_OUTPUT_FILE_PATH = path.join(
  __dirname,
  'results',
  'results.json'
);

async function writePackageStatsToFile(inputFilePath, outputFilePath) {
  const packageList = require(inputFilePath).map((pkgObj) => pkgObj.package);
  const packageListMetrics = await getPackageListMetrics(packageList);
  fs.writeFileSync(outputFilePath, JSON.stringify(packageListMetrics, null, 2));
}

async function main(
  inputFile = DEFAULT_INPUT_FILE_PATH,
  outputFile = DEFAULT_OUTPUT_FILE_PATH
) {
  const inputFilePath = path.resolve(inputFile);
  const outputFilePath = path.resolve(outputFile);
  const spinner = ora({ stream: process.stdout });
  spinner.text = `Analyzing Packages..`;
  spinner.start();
  try {
    const start = Date.now();
    await writePackageStatsToFile(inputFilePath, outputFilePath);
    const duration = (Date.now() - start) / 1000;
    spinner.succeed(
      `Analyzed ${inputFile} in ${duration.toFixed(
        2
      )}s.\nResults have been stored in ${outputFile}`
    );
    process.exit(0);
  } catch (e) {
    spinner.fail(`Failed to analyze packages. Error: ${e.message}`);
    process.exit(1);
  }
}

main(argv.input, argv.output);
