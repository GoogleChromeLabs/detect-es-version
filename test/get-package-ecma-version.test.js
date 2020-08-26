const { getPackageEcmaVersion } = require('../src/index.js');

describe('getPackageEcmaVersion should', () => {
  it.each`
    packageName                          | expected
    ${'bowser@2.10.0'}                   | ${2015}
    ${'chalk@4.1.0'}                     | ${2018}
    ${'@lattice/configurer@0.0.1'}       | ${5}
    ${'@babel/core@7.11.4'}              | ${2015}
    ${'request@2.88.2'}                  | ${5}
    ${'react@16.13.1'}                   | ${5}
    ${'lit-html@1.2.1'}                  | ${2015}
    ${'lodash@4.17.19'}                  | ${5}
    ${'lodash-es@4.17.15'}               | ${5}
    ${'conf@7.1.1'}                      | ${2018}
    ${'swr@0.3.0'}                       | ${5}
    ${'vue@2.6.11'}                      | ${5}
    ${'@nelsongomes/ts-timeframe@0.2.2'} | ${5}
  `('return $expected for $packageName', async ({ packageName, expected }) => {
    expect(await getPackageEcmaVersion(packageName)).toBe(expected);
  });
});
