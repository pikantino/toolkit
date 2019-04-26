/**
 * Load plugins by their names. Initially tryes to load plugin with "@pikantino/" prefix.
 * Provides plugins using require() and exposes default export.
 * @param {string[]} pluginsNames
 * @returns {Plugin[]} Plugins
 */
export declare function loadPlugins(pluginsNames: string[]): Plugin[];
/**
 * Load plugins by their names divided by ",". Initially tryes to load plugin with "@pikantino/" prefix.
 * Provides plugins using require() and exposes default export.
 * @param {string} pluginNamesString
 * @returns {Plugin[]}
 */
export declare function loadPluginsFromString(pluginNamesString?: string): Plugin[];
