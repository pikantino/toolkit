"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var fs = require('fs');
/**
 * Load plugins by their names. Initially tryes to load plugin with "@pikantino/" prefix.
 * Provides plugins using require() and exposes default export.
 * @param {string[]} pluginsNames
 * @returns {Plugin[]} Plugins
 */
function loadPlugins(pluginsNames) {
    var cwd = process.cwd();
    var nodeModulesPath = path.join(cwd, 'node_modules');
    return pluginsNames.map(function (pluginName) {
        var pluginFolderPath = path.join(nodeModulesPath, '@pikantino', pluginName);
        var pluginPackageJsonPath = path.join(pluginFolderPath, 'package.json');
        if (fs.existsSync(pluginPackageJsonPath)) {
            var packageJson = JSON.parse(fs.readFileSync(pluginPackageJsonPath).toString());
            var pluginMainFile = packageJson['main'];
            if (!pluginPackageJsonPath) {
                throw new Error("Can not find main file for " + pluginName + ". Is " + pluginName + " has \"main\" in package.json?");
            }
            try {
                return require(path.join(pluginFolderPath, pluginMainFile)).default;
            }
            catch (e) {
                throw new Error("Can not require " + pluginName + " from main entry or plugin doesn't provide default export.");
            }
        }
        else {
            throw new Error("Can not load " + pluginName + ". Is " + pluginName + " installed?");
        }
    });
}
exports.loadPlugins = loadPlugins;
/**
 * Load plugins by their names divided by ",". Initially tryes to load plugin with "@pikantino/" prefix.
 * Provides plugins using require() and exposes default export.
 * @param {string} pluginNamesString
 * @returns {Plugin[]}
 */
function loadPluginsFromString(pluginNamesString) {
    if (pluginNamesString === void 0) { pluginNamesString = ''; }
    if (pluginNamesString && pluginNamesString.length) {
        var names = pluginNamesString.split(',').map(function (name) { return name.trim(); });
        return loadPlugins(names);
    }
    return [];
}
exports.loadPluginsFromString = loadPluginsFromString;
