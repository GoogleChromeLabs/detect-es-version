const fs = require('fs');
const path = require('path');
const Benchmark = require('benchmark');
const getEcmaVersionTokenizer = require('../src/get-ecma-version-tokenizer');
const getEcmaVersionAST = require('../src/get-ecma-version-ast');
const getEcmaVersionParseable = require('../src/get-ecma-version-parseable');

const FIXTURES_DIR = `${__dirname}/fixtures/`;

function getRuntime(code, getEcmaVersion) {
  const start = Date.now();
  getEcmaVersion(code);
  return Date.now() - start;
}

function benchmarkGetEcmaVersionOnce(filename) {
  let filePath = path.resolve(FIXTURES_DIR, filename);
  const code = fs.readFileSync(filePath, 'utf-8');
  const sizeInKB = fs.statSync(filePath)['size'] / 1000;

  console.log(
    '  %dms | %dms | %dms | %s (%d KB)',
    getRuntime(code, getEcmaVersionTokenizer),
    getRuntime(code, getEcmaVersionAST),
    getRuntime(code, getEcmaVersionParseable),
    filename,
    sizeInKB
  );
}

function benchmarkGetEcmaVersionMultiple(filename) {
  let filePath = path.resolve(FIXTURES_DIR, filename);
  const code = fs.readFileSync(filePath, 'utf-8');
  const sizeInKB = fs.statSync(filePath)['size'] / 1000;

  const suite = new Benchmark.Suite();
  suite
    .add('getEcmaVersionTokenizer', function () {
      getEcmaVersionTokenizer(code);
    })
    .add('getEcmaVersionAST', function () {
      getEcmaVersionAST(code);
    })
    .add('getEcmaVersionParseable', function () {
      getEcmaVersionParseable(code);
    })
    .on('start', function () {
      console.log(
        'Benchmarking getEcmaVersion for %s (%d KB)',
        filename,
        sizeInKB
      );
    })
    .on('cycle', function (event) {
      console.log('  ' + String(event.target));
      console.log(
        '    Mean runtime: ' +
          String((event.target.stats.mean * 1000).toFixed(2)) +
          'ms'
      );
    })
    .on('complete', function () {
      console.log(
        '  Fastest implementation: ' + this.filter('fastest').map('name') + '\n'
      );
    });

  suite.run();
}

const filenames = fs.readdirSync(FIXTURES_DIR);

console.log('Single-run Benchmarks');
console.log('Tokenizer | AST | Parseable | File');
filenames.forEach((filename) => benchmarkGetEcmaVersionOnce(filename));

console.log('');

console.log('Multi-run Benchmarks');
filenames.forEach((filename) => benchmarkGetEcmaVersionMultiple(filename));
