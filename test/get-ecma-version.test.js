const fs = require('fs');
const path = require("path");
const { getEcmaVersion } = require('../src');

const FIXTURES_DIR = `${__dirname}/fixtures/`;

describe('getEcmaVersion', () => {
    it('should return false for var', () => {
        expect(getEcmaVersion("var x = 123;")).toBe(5);
    });

    it('should return false for const', () => {
        expect(getEcmaVersion("const x = 123;")).toBe(2015);
    });

    it('should return false for async', () => {
        expect(getEcmaVersion("async function f(){}")).toBe(2017);
    });

    it.each`
      filename                           | expected
      ${'bowser.js'}                     | ${5}
      ${'bowser.es2015.js'}              | ${2015}
      ${'domlette.js'}                   | ${5}
      ${'domlette.es2015.js'}            | ${2015}
      ${'toybox-js-render-component.js'} | ${5}
      ${'ts-trapper.js'}                 | ${5}
`('should return $expected for $filename', ({filename, expected}) => {
        const code = fs.readFileSync(path.resolve(FIXTURES_DIR, filename));
        expect(getEcmaVersion(code)).toBe(expected);
    });
})
