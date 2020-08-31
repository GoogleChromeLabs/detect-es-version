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
