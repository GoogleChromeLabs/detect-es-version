module.exports = [
  {
    key: 'es.default-param',
    astType: 'AssignmentPattern',
    ecmaVersion: 2015,
  },
  {
    key: 'es.rest',
    astType: 'RestElement',
    ecmaVersion: 2015,
  },
  {
    key: 'es.spread',
    astType: 'SpreadElement',
    ecmaVersion: 2015,
  },
  {
    key: 'es.computed-property',
    astType: 'ObjectProperty',
    isMatch: (node) => node.computed == true,
    ecmaVersion: 2015,
  },
  {
    key: 'es.for-of',
    astType: 'ForOfStatement',
    ecmaVersion: 2015,
  },
  {
    key: 'es.binary',
    astType: 'Literal',
    isMatch: (node) => node.raw.startsWith('0b'),
    ecmaVersion: 2015,
  },
  {
    key: 'es.template-literal',
    astType: 'TemplateLiteral',
    ecmaVersion: 2015,
  },
  {
    key: 'es.const',
    astType: 'VariableDeclaration',
    isMatch: (node) => node.kind == 'const',
    ecmaVersion: 2015,
  },
  {
    key: 'es.let',
    astType: 'VariableDeclaration',
    isMatch: (node) => node.kind == 'let',
    ecmaVersion: 2015,
  },
  {
    key: 'es.class',
    astType: 'ClassMethod',
    ecmaVersion: 2015,
  },
  {
    key: 'es.super',
    astType: 'Super',
    ecmaVersion: 2015,
  },
  {
    key: 'es.generator',
    astType: 'FunctionDeclaration',
    isMatch: (node) => node.generator == true,
    ecmaVersion: 2015,
  },
  {
    key: 'es.exponentiation',
    astType: 'BinaryExpression',
    isMatch: (node) => node.operator == '**',
    ecmaVersion: 2016,
  },
  {
    key: 'es.exponentiation-assignment',
    astType: 'AssignmentExpression',
    isMatch: (node) => node.operator == '**=',
    ecmaVersion: 2016,
  },
  {
    key: 'es.async',
    astType: 'FunctionDeclaration',
    isMatch: (node) => node.async == true,
    ecmaVersion: 2017,
  },
  {
    key: 'es.for-await-of',
    astType: 'ForOfStatement',
    isMatch: (node) => node.await == true,
    ecmaVersion: 2018,
  },
  {
    key: 'es.optional-catch-binding',
    astType: 'CatchClause',
    isMatch: (node) => node.param == null,
    ecmaVersion: 2019,
  },
  {
    key: 'es.big-int',
    astType: 'Literal',
    isMatch: (node) => node.bigint != null,
    ecmaVersion: 2020,
  },
];
