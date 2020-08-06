const fs = require('fs');
const path = require("path");
const isModern = require('../src/is-modern');

const FIXTURES_DIR = `${__dirname}/fixtures/`;

describe('isModern', () => {
    it('should return false for var', () => {
        expect(isModern("var x = 123;")).toBe(false);
    });

    it('should return false for const', () => {
        expect(isModern("const x = 123;")).toBe(true);
    });

    it('should return false for async', () => {
        expect(isModern("async function f(){}")).toBe(true);
    });

    it.each`
      filename                           | expected
      ${'bowser.js'}                     | ${false}
      ${'bowser.es2015.js'}              | ${true}
      ${'domlette.js'}                   | ${false}
      ${'domlette.es2015.js'}            | ${true}
      ${'toybox-js-render-component.js'} | ${false}
      ${'ts-trapper.js'}                 | ${false}
`('should return $expected for $filename', ({filename, expected}) => {
        const code = fs.readFileSync(path.resolve(FIXTURES_DIR, filename));
        expect(isModern(code)).toBe(expected);
    });
})
