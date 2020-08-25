const MIN_ECMA_VERSION = 5;

const astTypeToFeatures = getAstTypeToFeatures(require('../data/es-features'));

function getAstTypeToFeatures(esFeatures) {
  const astTypeToFeatures = {};
  for (feature of esFeatures) {
    if (!astTypeToFeatures[feature.astType]) {
      astTypeToFeatures[feature.astType] = [];
    }
    astTypeToFeatures[feature.astType].push(feature);
  }
  return astTypeToFeatures;
}

function getNodeEcmaVersion(node) {
  const features = astTypeToFeatures[node.type];
  const matchedEcmaVersions = features
    ? features
        .filter((feature) => (feature.isMatch ? feature.isMatch(node) : true))
        .map((feature) => feature.ecmaVersion)
    : [];
  return Math.max(...matchedEcmaVersions, MIN_ECMA_VERSION);
}

module.exports = getNodeEcmaVersion;
