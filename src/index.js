'use strict'
const getEcmaVersionAST = require('./get-ecma-version-ast.js');

function getEcmaVersion(code) {
    return getEcmaVersionAST(code);
}

module.exports = { getEcmaVersion };
