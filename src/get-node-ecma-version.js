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
