import { globSync } from 'glob'
import path from 'path'

export function getAllPluginNames() {
  let plugins = globSync('./plugins/*.*')
    .map(pluginPath => path.parse(pluginPath).name)

  return plugins.filter(name => name != 'deleteDist')
}
export function getPathToThePlugin(pluginName) {
  let plugin = globSync(`./plugins/${pluginName}.js`, { dotRelative: true })

  if (!plugin?.length) {
    throw new Error(`Task ${pluginName} has not been found!`)
  }

  return plugin[0]
}