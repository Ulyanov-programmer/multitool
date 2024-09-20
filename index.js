import './config.js'
import { Plugin } from './plugins/other/_plugin.js'
import { getAllPluginNames, getPathToThePlugin } from './plugins/other/getPluginNames.js'

// ? To run plugins, you must specify the 
// ? `plugins` argument at startup in command line.
// example - 'plugins=plugFileName1,plugFileName2
let runPluginNames = process.argv.find(arg => arg.includes('plugins'))

runPluginNames = runPluginNames && runPluginNames.replace("plugins=", '').split(' ')

if (!runPluginNames?.length)
  runPluginNames = getAllPluginNames()


for (let pluginName of runPluginNames) {
  let pathToTask = getPathToThePlugin(pluginName)

  try {
    await import(pathToTask)
  }
  catch (error) {
    console.error(error)
  }
}

// It is necessary to run plugins
Plugin.globalEmitter.emit('pluginsAreReady')