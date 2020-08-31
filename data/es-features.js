/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

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
    key: 'es.array-pattern',
    astType: 'ArrayPattern',
    ecmaVersion: 2015,
  },
  {
    key: 'es.object-pattern',
    astType: 'ObjectPattern',
    ecmaVersion: 2015,
  },
  {
    key: 'es.computed-property',
    astType: 'Property',
    isMatch: (node) => node.computed == true,
    ecmaVersion: 2015,
  },
  {
    key: 'es.object-functions',
    astType: 'Property',
    isMatch: (node) => node.method == true,
    ecmaVersion: 2015,
  },
  {
    key: 'es.meta-property',
    astType: 'MetaProperty',
    ecmaVersion: 2015,
  },
  {
    key: 'es.for-of',
    astType: 'ForOfStatement',
    ecmaVersion: 2015,
  },
  {
    key: 'es.octal',
    astType: 'Literal',
    isMatch: (node) => node.raw.startsWith('0o') || node.raw.startsWith('0O'),
    ecmaVersion: 2015,
  },
  {
    key: 'es.binary',
    astType: 'Literal',
    isMatch: (node) => node.raw.startsWith('0b'),
    ecmaVersion: 2015,
  },
  {
    key: 'es.template-element',
    astType: 'TemplateElement',
    ecmaVersion: 2015,
  },
  {
    key: 'es.template-literal',
    astType: 'TemplateLiteral',
    ecmaVersion: 2015,
  },
  {
    key: 'es.tagged-template',
    astType: 'TaggedTemplateExpression',
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
    key: 'es.class-declaration',
    astType: 'ClassDeclaration',
    ecmaVersion: 2015,
  },
  {
    key: 'es.class-expression',
    astType: 'ClassExpression',
    ecmaVersion: 2015,
  },
  {
    key: 'es.class-body',
    astType: 'ClassBody',
    ecmaVersion: 2015,
  },
  {
    key: 'es.class-functions',
    astType: 'MethodDefinition',
    isMatch: (node) =>
      node.kind == 'constructor' ||
      node.kind == 'get' ||
      node.kind == 'set' ||
      node.kind == 'method',
    ecmaVersion: 2015,
  },
  {
    key: 'es.arrow-function',
    astType: 'ArrowFunctionExpression',
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
    key: 'es.await',
    astType: 'AwaitExpression',
    ecmaVersion: 2017,
  },
  {
    key: 'es.for-await-of',
    astType: 'ForOfStatement',
    isMatch: (node) => node.await == true,
    ecmaVersion: 2018,
  },
  {
    key: 'es.object-spread',
    astType: 'ObjectExpression',
    isMatch: (node) =>
      node.properties.some((property) => property.type == 'SpreadElement'),
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
  {
    key: 'es.optional-chaining',
    astType: 'ChainExpression',
    ecmaVersion: 2020,
  },
  {
    key: 'es.nullish-coalescing',
    astType: 'LogicalExpression',
    isMatch: (node) => node.operator == '??',
    ecmaVersion: 2020,
  },
];
