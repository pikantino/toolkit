export interface Plugin {
    /**
     * Method to update package.json key-value map before application start to collect package files.
     * Will be called for every package in target's package.json. All paths in package.json should be relative to packge.json's path
     * @param {string} packageName Name of the package
     * @param {string} packagePath Absolute (!) path to package package.json
     * @param {{[p: string]: string}} packageJson PackageJson as key-value map
     * @returns {{[p: string]: string}} PackageJson as key-value map
     */
    beforePackageInfoCollecting?: (packageName: string, packageJsonPath: string, packageJson: { [key: string]: string }) => Promise<{ [key: string]: string }>;
    /**
     * Method to cleanup after successful build
     * @returns {Promise<void>}
     */
    afterPackagesBuilt?: () => Promise<void>;
}
