const {getPackageEcmaVersion} = require('../src/index.js');

// ${'desktop@0.1.0'}           | ${true}
// no main
it.each`
  packageName                  | expected
  ${'request@2.88.2'}          | ${5}
  ${'react@16.13.1'}           | ${5}
  ${'lit-html@1.2.1'}          | ${2015}
  ${'lodash@4.17.19'}          | ${5}
  ${'conf@7.1.1'}              | ${2015}
`('getPackageEcmaVersion should return $expected for $packageName', async ({packageName, expected}) => {
    expect(await getPackageEcmaVersion(packageName)).toBe(expected);
});
