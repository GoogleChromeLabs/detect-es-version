const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const PackageJsonUtils = {
  /**
   * Gets the value of a key in an object. Allows for accessing nested keys like "foo.bar"
   * @param {Object} obj Any object
   * @param {String} keyString A string to access the object by e.g. "foo.bar"
   * @return {*} The value of the key in obj
   */
  getObjectField(obj, keyString) {
    const keyArr = keyString.split('.');
    keyArr.forEach((key) => {
      if (obj) {
        obj = obj[key];
      }
    });
    return obj;
  },

  async getPackageJSON(packagePath) {
    const packageJsonFile = await promisify(fs.readFile)(
      path.resolve(packagePath, 'package.json'),
      'utf8'
    );
    return JSON.parse(packageJsonFile);
  },
};

module.exports = PackageJsonUtils;
