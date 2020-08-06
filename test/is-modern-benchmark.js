const fs = require('fs');
const path = require("path");
const Benchmark = require('benchmark');
const isModernTokenizer = require('../src/is-modern-tokenizer');
const isModernAST = require('../src/is-modern-ast');
const isModernParseable = require('../src/is-modern-parseable');

const FIXTURES_DIR = `${__dirname}/fixtures/`;

function getRuntime(code, isModern) {
    const start = Date.now();
    isModern(code);
    return Date.now() - start;
}

function benchmarkIsModernOnce(filename) {
    let filePath = path.resolve(FIXTURES_DIR, filename);
    const code = fs.readFileSync(filePath, 'utf-8');
    const sizeInKB = fs.statSync(filePath)["size"] / 1000;

    console.log(
        "  %dms | %dms | %dms | %s (%d KB)",
        getRuntime(code, isModernTokenizer),
        getRuntime(code, isModernAST),
        getRuntime(code, isModernParseable),
        filename,
        sizeInKB
    );
}

function benchmarkIsModernMultiple(filename) {
    let filePath = path.resolve(FIXTURES_DIR, filename);
    const code = fs.readFileSync(filePath, 'utf-8');
    const sizeInKB = fs.statSync(filePath)["size"] / 1000;

    const suite = new Benchmark.Suite;
    suite
        .add('isModernTokenizer', function () {
            isModernTokenizer(code);
        })
        .add('isModernAST', function () {
            isModernAST(code);
        })
        .add('isModernParseable', function () {
            isModernParseable(code);
        })
        .on('start', function () {
            console.log('Benchmarking isModern for %s (%d KB)', filename, sizeInKB);
        })
        .on('cycle', function (event) {
            console.log('  ' + String(event.target));
            console.log('    Mean runtime: ' + String((event.target.stats.mean * 1000).toFixed(2)) + 'ms');
        })
        .on('complete', function () {
            console.log('  Fastest implementation: ' + this.filter('fastest').map('name') + '\n');
        })

    suite.run();
}

const filenames = fs.readdirSync(FIXTURES_DIR);

console.log('Single-run Benchmarks')
console.log('Tokenizer | AST | Parseable | File');
filenames.forEach((filename) => benchmarkIsModernOnce(filename));

console.log('');

console.log('Multi-run Benchmarks')
filenames.forEach((filename) => benchmarkIsModernMultiple(filename));
