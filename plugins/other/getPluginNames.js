import { globSync } from 'glob'
import path from 'path'

/**
 * Returns the names of all files in the plugins folder, excluding subfolders and `deleteDist` plugin.
 */
export function getAllPluginNames() {
  let plugins = globSync('./plugins/*.*')
    .map(pluginPath => path.parse(pluginPath).name)

  return plugins.filter(name => name != 'deleteDist')
}

/**
 * Tries to find the path to the plugin based on its name.
 * The search takes place in the `plugins` folder.
 * @param {string} pluginName The name of the plugin you are looking for.
 * @returns The path to the plugin file.
 * @throws Creates an error if the plugin was not found.
 */
export function getPathToThePlugin(pluginName) {
  let plugin = globSync(`./plugins/${pluginName}.js`, { dotRelative: true })

  if (!plugin?.length) {
    throw new Error(`Plugin ${pluginName} has not been found!`)
  }

  return plugin[0]
}