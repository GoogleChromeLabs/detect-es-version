const fs = require('fs');
const path = require('path');
const { getEcmaVersion } = require('../src');
const esFeatures = require('../data/es-features');
const { MIN_ECMA_VERSION } = require('../src/constants');

const ENTRY_POINTS_DIR = path.join(__dirname, 'fixtures', 'entryPoints');

const keyToEcma = new Map(
  esFeatures.map((esFeature) => [esFeature.key, esFeature.ecmaVersion])
);

describe('getEcmaVersion should', () => {
  it.each`
    testCase
    ${'function foo() {bar}'}
    ${'function foo() {bar}'}
    ${'var foo = 123'}
    ${"var arr = ['hello']"}
    ${"var foo = 'async'"}
    ${"var foo = 'const'"}
    ${"var foo = '0b0101'"}
    ${"var foo = '0o123'"}
  `(`return ${MIN_ECMA_VERSION} for $testCase`, ({ testCase }) => {
    expect(getEcmaVersion(testCase)).toBe(MIN_ECMA_VERSION);
  });
  // TODO have index.js import all? autoassign ecmaVersion
  it.each`
    key                                        | testCase
    ${'es.default-param' /*2015...*/}          | ${'function foo(bar=1) {}'}
    ${'es.rest'}                               | ${'function foo(...rest) {}'}
    ${'es.spread'}                             | ${'[...arr]'}
    ${'es.array-pattern'}                      | ${'[foo, bar] = arr'}
    ${'es.object-pattern'}                     | ${'({foo, bar} = obj)'}
    ${'es.computed-property'}                  | ${'var foo = {[bar]: 3}'}
    ${'es.object-functions'}                   | ${'var foo = {bar() {}}'}
    ${'es.meta-property'}                      | ${'function f() {new.target}'}
    ${'es.for-of'}                             | ${'for (var element of arr) {}'}
    ${'es.octal'}                              | ${'var foo = 0o755'}
    ${'es.binary'}                             | ${'var foo = 0b0101'}
    ${'es.template-element'}                   | ${'var foo = `hello`'}
    ${'es.template-literal'}                   | ${'var foo = `hello ${bar}`'}
    ${'es.tagged-template'}                    | ${'var foo = tag`hello`'}
    ${'es.const'}                              | ${'const foo = 123'}
    ${'es.let'}                                | ${'let foo = 123'}
    ${'es.class-declaration'}                  | ${'class Foo {}'}
    ${'es.class-expression'}                   | ${'var Foo2 = class {}'}
    ${'es.generator'}                          | ${'function* foo() {}'}
    ${'es.arrow-function'}                     | ${'() => {}'}
    ${'es.object-spread'}                      | ${'var foo = { ...bar };'}
    ${'es.exponentiation' /*2016...*/}         | ${'2 ** 4'}
    ${'es.async' /*2017...*/}                  | ${'async function f() {}'}
    ${'es.for-await-of' /*2018...*/}           | ${'async () => { for await (var foo of bar) { } }'}
    ${'es.optional-catch-binding' /*2019...*/} | ${'try {} catch {}'}
    ${'es.big-int' /*2020...*/}                | ${'var foo = 123n'}
    ${'es.optional-chaining'}                  | ${'obj?.foo'}
    ${'es.nullish-coalescing'}                 | ${'var foo = 0 ?? 42'}
  `('judge $key correctly', ({ key, testCase }) => {
    expect(keyToEcma.get(key)).toBeDefined();
    expect(getEcmaVersion(testCase)).toBe(keyToEcma.get(key));
  });

  it.each`
    filename                           | expected
    ${'bowser.js'}                     | ${5}
    ${'bowser.es2015.js'}              | ${2015}
    ${'domlette.js'}                   | ${5}
    ${'domlette.es2015.js'}            | ${2015}
    ${'toybox-js-render-component.js'} | ${5}
    ${'ts-trapper.js'}                 | ${5}
  `('return $expected for $filename', ({ filename, expected }) => {
    const code = fs.readFileSync(
      path.resolve(ENTRY_POINTS_DIR, filename),
      'utf-8'
    );
    expect(getEcmaVersion(code)).toBe(expected);
  });
});
