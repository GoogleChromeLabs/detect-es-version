'use strict';
const acorn = require('acorn');

function getTokenEcmaVersion(token) {
  switch (token.type.label) {
    case 'name':
      if (token.value === 'async') {
        return 2017;
      }
      break;
    case 'const':
      return 2017;
    default:
      return 5;
  }
}

function getEcmaVersion(code) {
  const tokenizer = acorn.tokenizer(code, {
    ecmaVersion: 11,
  });

  let token;
  let ecmaVersion = 5;
  do {
    token = tokenizer.getToken();
    ecmaVersion = Math.max(ecmaVersion, getTokenEcmaVersion(token));
  } while (token.type !== acorn.tokTypes.eof);
  return ecmaVersion;
}

module.exports = getEcmaVersion;
