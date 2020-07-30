'use strict'
const acorn = require("acorn");
const walk = require("acorn-walk");

function isModern(code) {
    const AST = acorn.parse(code, {
        ecmaVersion: 11,
        sourceType: 'module',
        allowHashBang: true
    });

    let isASTModern = false;
    walk.simple(AST, {
        VariableDeclaration(node) {
            if (node.kind === 'const') {
                isASTModern = true;
            }
        },
        Function(node) {
            if (node.async) {
                isASTModern = true;
            }
        }
    })
    return isASTModern;
}

module.exports = isModern;
