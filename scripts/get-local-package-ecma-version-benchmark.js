/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

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
    '| %s | %dms |',
    packageString,
    await BenchmarkUtils.getAsyncRuntime(() =>
      getLocalPackageEcmaVersion(packagePath)
    )
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
    .add(`Benchmarking getLocalPackageEcmaVersion for ${packageString}`, {
      defer: true,
      fn: async function (deferred) {
        await getLocalPackageEcmaVersion(packagePath);
        deferred.resolve();
      },
    })
    .on('cycle', function (event) {
      console.log('%s  ', String(event.target));
      console.log(
        '  Mean runtime: %dms  ',
        String((event.target.stats.mean * 1000).toFixed(2))
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

  console.log('Cold-start Benchmarks');
  console.log('');
  console.log('| File | Time |');
  console.log('|------|------|');
  for (const packageName of packageNames) {
    await coldStartBenchmark(packageName);
  }

  console.log('\nWarm-run Benchmarks  ');
  await warmRunBenchmark(packageNames, 0);
}

main();
