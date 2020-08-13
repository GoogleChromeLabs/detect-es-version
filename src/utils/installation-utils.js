const rimraf = require('rimraf')
const tmp = require('tmp');
const childProcess = require('child_process');
const { promisify } = require('util');

const InstallationUtils = {
    async getInstallPath() {
        return promisify(tmp.dir)();
    },

    async installPackage(
        packageString,
        installPath,
    ) {
        const flags = [
            'no-package-lock',
            'no-shrinkwrap',
            'no-optional',
            'no-bin-links',
            'prefer-offline',
            'progress false',
            'loglevel error',
            'ignore-scripts',
            'save-exact',
            'production',
            'json',
        ];

        const command = `npm install ${packageString} --${flags.join(' --')}`;
        await promisify(childProcess.exec)(
            command,
            {cwd: installPath, maxBuffer: 1024 * 500}
        );
    },

    async cleanupPath(installPath) {
        const noop = () => {};
        rimraf(installPath, noop);
    },
}

module.exports = InstallationUtils
