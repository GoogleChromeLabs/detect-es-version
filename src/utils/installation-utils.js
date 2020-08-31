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

const rimraf = require('rimraf');
const tmp = require('tmp-promise');
const childProcess = require('child_process');
const { promisify } = require('util');

const InstallationUtils = {
  async getInstallPath() {
    return (await tmp.dir()).path;
  },

  async installPackage(packageString, installPath) {
    const flags = [
      'no-package-lock',
      'no-shrinkwrap',
      'no-optional',
      'no-bin-links',
      'prefer-offline',
      'progress false',
      'loglevel error',
      'ignore-scripts',
      'no-save',
      'production',
      'json',
    ];

    const command = `npm install ${packageString} --${flags.join(' --')}`;
    await promisify(childProcess.exec)(command, {
      cwd: installPath,
      maxBuffer: 1024 * 500,
    });
  },

  async cleanupPath(installPath) {
    const noop = () => {};
    rimraf(installPath, noop);
  },
};

module.exports = InstallationUtils;
