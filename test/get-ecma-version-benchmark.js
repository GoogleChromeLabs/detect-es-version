const fs = require('fs');
const path = require('path');
const Benchmark = require('benchmark');
const BenchmarkUtils = require('./utils/benchmark-utils');
const getEcmaVersionTokenizer = require('../src/get-ecma-version-tokenizer');
const { getEcmaVersion } = require('../src/index');
const getEcmaVersionParseable = require('../src/get-ecma-version-parseable');

const ENTRY_POINTS_DIR = path.join(__dirname, 'fixtures', 'entryPoints');

function coldStartBenchmark(filename) {
  let filePath = path.resolve(ENTRY_POINTS_DIR, filename);
  const code = fs.readFileSync(filePath, 'utf-8');
  const sizeInKB = fs.statSync(filePath)['size'] / 1000;

  console.log(
    '  %dms | %dms | %dms | %s (%d KB)',
    BenchmarkUtils.getRuntime(() => getEcmaVersionTokenizer(code)),
    BenchmarkUtils.getRuntime(() => getEcmaVersion(code)),
    BenchmarkUtils.getRuntime(() => getEcmaVersionParseable(code)),
    filename,
    sizeInKB
  );
}

function warmRunBenchmark(filename) {
  let filePath = path.resolve(ENTRY_POINTS_DIR, filename);
  const code = fs.readFileSync(filePath, 'utf-8');
  const sizeInKB = fs.statSync(filePath)['size'] / 1000;

  const suite = new Benchmark.Suite();
  suite
    .add('getEcmaVersionTokenizer', () => getEcmaVersionTokenizer(code))
    .add('getEcmaVersionAST', () => getEcmaVersion(code))
    .add('getEcmaVersionParseable', () => getEcmaVersionParseable(code))
    .on('start', () =>
      console.log(
        'Benchmarking getEcmaVersion for %s (%d KB)',
        filename,
        sizeInKB
      )
    )
    .on('cycle', function (event) {
      console.log('  ' + String(event.target));
      console.log(
        '    Mean runtime: ' +
          String((event.target.stats.mean * 1000).toFixed(2)) +
          'ms'
      );
    })
    .on('complete', () =>
      console.log(
        '  Fastest implementation: ' + this.filter('fastest').map('name') + '\n'
      )
    );

  suite.run();
}

const filenames = fs.readdirSync(ENTRY_POINTS_DIR);

console.log('Cold-start Benchmarks');
console.log('Tokenizer | AST | Parseable | File');
filenames.forEach((filename) => coldStartBenchmark(filename));

console.log('\nWarm-run Benchmarks');
filenames.forEach((filename) => warmRunBenchmark(filename));
