'use strict'
const acorn = require("acorn");

function isTokenModern(token) {
    switch(token.type.label) {
        case 'name':
            if (token.value === 'async') {
                return true;
            }
            break;
        case 'const':
            return true;
        default:
            return false;
    }
}

function isModern(code) {
    const tokenizer = acorn.tokenizer(code, {
        ecmaVersion: 11
    });

    let token;
    do {
        token = tokenizer.getToken()
        if (isTokenModern(token)) {
            return true;
        }
    } while (token.type !== acorn.tokTypes.eof)
    return false;
}

module.exports = isModern;
