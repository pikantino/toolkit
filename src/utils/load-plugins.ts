const path = require('path');
const fs = require('fs');

/**
 * Load plugins by their names. Initially tryes to load plugin with "@pikantino/" prefix.
 * Provides plugins using require() and exposes default export.
 * @param {string[]} pluginsNames
 * @returns {Plugin[]} Plugins
 */
export function loadPlugins(pluginsNames: string[]): Plugin[] {
    const cwd: string = process.cwd();
    const nodeModulesPath: string = path.join(cwd, 'node_modules');

    return pluginsNames.map((pluginName: string) => {
        const pluginFolderPath: string = path.join(nodeModulesPath, '@pikantino', pluginName);
        const pluginPackageJsonPath: string = path.join(pluginFolderPath, 'package.json');
        if (fs.existsSync(pluginPackageJsonPath)) {
            const packageJson: { [key: string]: string } = JSON.parse(fs.readFileSync(pluginPackageJsonPath).toString());
            const pluginMainFile = packageJson['main'];

            if (!pluginPackageJsonPath) {
                throw new Error(`Can not find main file for ${pluginName}. Is ${pluginName} has "main" in package.json?`);
            }

            try {
                return require(path.join(pluginFolderPath, pluginMainFile)).default;
            }
            catch (e) {
                throw new Error(`Can not require ${pluginName} from main entry or plugin doesn't provide default export.`);
            }
        } else {
            throw new Error(`Can not load ${pluginName}. Is ${pluginName} installed?`);
        }
    })
}

/**
 * Load plugins by their names divided by ",". Initially tryes to load plugin with "@pikantino/" prefix.
 * Provides plugins using require() and exposes default export.
 * @param {string} pluginNamesString
 * @returns {Plugin[]}
 */
export function loadPluginsFromString(pluginNamesString: string = ''): Plugin[] {
    if (pluginNamesString && pluginNamesString.length) {
        const names: string[] = pluginNamesString.split(',').map((name: string) => name.trim());
        return loadPlugins(names);
    }
    return [];
}
