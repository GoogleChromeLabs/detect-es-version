const path = require('path');
const Benchmark = require('benchmark');
const parsePackageString = require('npm-package-arg');
const InstallationUtils = require('../src/utils/installation-utils');
const BenchmarkUtils = require('./utils/benchmark-utils');
const { getLocalPackageEcmaVersion } = require('../src/index.js');

async function coldStartBenchmark(packageString) {
  const installPath = await InstallationUtils.getInstallPath();
  await InstallationUtils.installPackage(packageString, installPath);
  const packageName = parsePackageString(packageString).name;
  const packagePath = path.join(installPath, 'node_modules', packageName);

  console.log(
    '  %dms | %s',
    await BenchmarkUtils.getRuntime(() =>
      getLocalPackageEcmaVersion(packagePath)
    ),
    packageString
  );

  await InstallationUtils.cleanupPath(installPath);
}

// Multiple asynchronous suites will interfere in BenchmarkJS so we must use
// suite.on('complete') to sequentially run suites
async function warmRunBenchmark(packageStrings, index) {
  if (index >= packageStrings.length) {
    return;
  }
  const packageString = packageStrings[index];
  const installPath = await InstallationUtils.getInstallPath();
  await InstallationUtils.installPackage(packageString, installPath);
  const packageName = parsePackageString(packageString).name;
  const packagePath = path.join(installPath, 'node_modules', packageName);

  const suite = new Benchmark.Suite('getLocalPackageEcmaVersion');
  suite
    .add(`  Benchmarking getLocalPackageEcmaVersion for ${packageString}`, {
      defer: true,
      fn: async function (deferred) {
        await getLocalPackageEcmaVersion(packagePath);
        deferred.resolve();
      },
    })
    .on('cycle', function (event) {
      console.log('  ' + String(event.target));
      console.log(
        '    Mean runtime: ' +
          String((event.target.stats.mean * 1000).toFixed(2)) +
          'ms'
      );
    })
    .on('complete', async function (event) {
      await InstallationUtils.cleanupPath(installPath);
      warmRunBenchmark(packageStrings, index + 1);
    });

  suite.run();
}

async function main() {
  const packageNames = [
    'bowser@2.10.0',
    'chalk@4.1.0',
    '@lattice/configurer@0.0.1',
    '@babel/core@7.11.4',
    'request@2.88.2',
    'react@16.13.1',
    'react-dom@16.13.1',
    'lit-html@1.2.1',
    'lodash@4.17.19',
    'lodash-es@4.17.15',
    'conf@7.1.1',
    'swr@0.3.0',
    'vue@2.6.11',
    '@nelsongomes/ts-timeframe@0.2.2',
  ];

  console.log('Single-run Benchmarks');
  for (const packageName of packageNames) {
    await coldStartBenchmark(packageName);
  }

  console.log('\nMulti-run Benchmarks');
  await warmRunBenchmark(packageNames, 0);
}

main();
