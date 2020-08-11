'use strict'
const acorn = require("acorn");
const walk = require("acorn-walk");

function getEcmaVersion(code) {
    const AST = acorn.parse(code, {
        ecmaVersion: 11,
        sourceType: 'module',
        allowHashBang: true
    });

    let ecmaVersion = 5;
    walk.simple(AST, {
        VariableDeclaration(node) {
            if (node.kind === 'const') {
                ecmaVersion = Math.max(ecmaVersion, 2015);
            }
        },
        Function(node) {
            if (node.async) {
                ecmaVersion = Math.max(ecmaVersion, 2017);
            }
        }
    })
    return ecmaVersion;
}

module.exports = getEcmaVersion;
