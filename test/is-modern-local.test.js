const fs = require('fs');
const path = require("path");
const isModern = require('../src/is-modern');
const {exec} = require('child_process');

test('var should not be modern', () => {
  expect(isModern("var x = 123;")).toBe(false);
});

test('const should be modern', () => {
  expect(isModern("const x = 123;")).toBe(true);
});

test('async should be modern', () => {
  expect(isModern("async function f(){}")).toBe(true);
});

const localPackages = [
  {
    path: './fixtures/bowser/es5.js',
    isModern: false
  },
  {
    path: './fixtures/bowser/src/bowser.js',
    isModern: true
  },
  {
    path: './fixtures/domlette/dist/domlette.js',
    isModern: false
  },
  {
    path: './fixtures/domlette/dist/domlette.es6.js',
    isModern: true
  },
  {
    path: './fixtures/ts-trapper/lib/js/index.js',
    isModern: false
  },
  {
    path: './fixtures/ts-trapper/lib/jsnext/index.js',
    isModern: false
  },
  {
    path: './fixtures/toybox-js-render-component/build.js',
    isModern: false
  },
  {
    path: './fixtures/toybox-js-render-component/jsnext-build.js',
    isModern: false
  },
]

function testPackage(localPackage) {
  const code = fs.readFileSync(path.resolve(__dirname, localPackage.path));
  expect(isModern(code)).toBe(localPackage.isModern);
}

describe('local tests', () => {
  localPackages.forEach((packageTest) => {
    testPackage(packageTest);
  })
})
