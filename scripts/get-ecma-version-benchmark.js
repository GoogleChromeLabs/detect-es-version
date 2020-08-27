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
    '| %s (%d KB) | %dms | %dms | %dms |',
    filename,
    sizeInKB,
    BenchmarkUtils.getRuntime(() => getEcmaVersionTokenizer(code)),
    BenchmarkUtils.getRuntime(() => getEcmaVersion(code)),
    BenchmarkUtils.getRuntime(() => getEcmaVersionParseable(code))
  );
}

function warmRunBenchmark(filename) {
  let filePath = path.resolve(ENTRY_POINTS_DIR, filename);
  const code = fs.readFileSync(filePath, 'utf-8');
  const sizeInKB = fs.statSync(filePath)['size'] / 1000;

  const suite = new Benchmark.Suite('getEcmaVersion implementation benchmarks');
  suite
    .add('getEcmaVersionTokenizer', () => getEcmaVersionTokenizer(code))
    .add('getEcmaVersionAST', () => getEcmaVersion(code))
    .add('getEcmaVersionParseable', () => getEcmaVersionParseable(code))
    .on('start', () =>
      console.log(
        'Benchmarking getEcmaVersion for %s (%d KB)  ',
        filename,
        sizeInKB
      )
    )
    .on('cycle', function (event) {
      console.log('  %s  ', String(event.target));
      console.log(
        '    Mean runtime: %dms  ',
        String((event.target.stats.mean * 1000).toFixed(2))
      );
    })
    .on('complete', function () {
      console.log(
        '  Fastest implementation: %s  ',
        String(this.filter('fastest').map('name'))
      );
    });

  suite.run();
}

const filenames = fs.readdirSync(ENTRY_POINTS_DIR);

console.log('Cold-start Benchmarks');
console.log('');
console.log('| File (size) | Tokenizer | AST | Parseable |');
console.log('|-------------|-----------|-----|-----------|');
filenames.forEach((filename) => coldStartBenchmark(filename));

console.log('\nWarm-run Benchmarks  ');
filenames.forEach((filename) => warmRunBenchmark(filename));
