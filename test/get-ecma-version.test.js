const fs = require('fs');
const path = require('path');
const { getEcmaVersion } = require('../src');

const ENTRY_POINTS_DIR = path.join(__dirname, 'fixtures', 'entryPoints');

describe('getEcmaVersion should', () => {
  it('return 5 for var', () => {
    expect(getEcmaVersion('var x = 123;')).toBe(5);
  });

  it('return 2015 for const', () => {
    expect(getEcmaVersion('const x = 123;')).toBe(2015);
  });

  it('return 2017 for async', () => {
    expect(getEcmaVersion('async function f(){}')).toBe(2017);
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
