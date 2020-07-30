import buble from 'rollup-plugin-buble';

export default {
  dest: 'build.js',
  entry: 'index.js',
  format: 'cjs',
  plugins: [buble()]
};