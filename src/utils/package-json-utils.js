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
