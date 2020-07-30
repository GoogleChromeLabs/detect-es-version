'use strict'

function isModern(code) {
    let result = require('./is-modern-ast.js')(code);
    return result;
}

module.exports = isModern;
