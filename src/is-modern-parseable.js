'use strict'
const acorn = require("acorn");

function isModern(code) {
    try {
        acorn.parse(code, {
            ecmaVersion: 5,
            sourceType: 'module',
            allowHashBang: true
        });
        return false;
    } catch (e) {
        return true;
    }
}

module.exports = isModern;
