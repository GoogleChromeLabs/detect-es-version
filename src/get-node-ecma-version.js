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

const { MIN_ECMA_VERSION } = require('./constants');

const astTypeToFeatures = getAstTypeToFeatures(require('../data/es-features'));

function getAstTypeToFeatures(esFeatures) {
  const astTypeToFeatures = new Map();
  for (const feature of esFeatures) {
    if (!astTypeToFeatures.has(feature.astType)) {
      astTypeToFeatures.set(feature.astType, []);
    }
    astTypeToFeatures.get(feature.astType).push(feature);
  }
  return astTypeToFeatures;
}

function getNodeEcmaVersion(node) {
  const features = astTypeToFeatures.has(node.type)
    ? astTypeToFeatures.get(node.type)
    : [];
  const matchedEcmaVersions = features
    .filter((feature) => (feature.isMatch ? feature.isMatch(node) : true))
    .map((feature) => feature.ecmaVersion);
  return Math.max(...matchedEcmaVersions, MIN_ECMA_VERSION);
}

module.exports = getNodeEcmaVersion;
