import { globSync } from 'glob'
import path from 'path'

/**
 * Returns the names of all files in the plugins folder.
 */
export function getAllPluginNames() {
  let plugins = globSync('./plugins/*.*')
    .map(pluginPath => path.parse(pluginPath).name)

  return plugins
}

/**
 * Adds a configuration to globalThis from a file specified via terminal arguments.
 */
export async function addConfigFromArgvToGlobalThis() {
  let configFileName = process.argv
    .find(arg => arg.includes("config="))
    .replace("config=", '')

  let pathToConfig = path.resolve(configFileName).normalize()

  let config = await import("file://" + pathToConfig, { with: { type: 'json' } })
  globalThis.config = config.default
}

/**
 * Returns plugins passed through the command line to run. If there are none, it returns the names of all the main plugins.
 * @returns Array of plugin file names
 */
export function getPlugins() {
  let plugins = process.argv
    .find(arg => arg.includes('plugins'))
    ?.replace("plugins=", '')
    ?.split(' ')

  if (!plugins?.length)
    plugins = getAllPluginNames()

  return plugins
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