'use strict';
const acorn = require('acorn');

function getEcmaVersion(code) {
  try {
    acorn.parse(code, {
      ecmaVersion: 5,
      sourceType: 'module',
      allowHashBang: true,
    });
    return 5;
  } catch (e) {
    return 2015;
  }
}

module.exports = getEcmaVersion;
