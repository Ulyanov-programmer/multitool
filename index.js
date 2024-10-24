import { Plugin } from './plugins/other/_plugin.js'
import * as additional from './plugins/other/additionalFunctions.js'


// ? To run plugins, you must specify the 'plugins' argument at startup in command line.
// example - yarn start plugins=plugFileName1,plugFileName2

await additional.addConfigFromArgvToGlobalThis()


try {
  for (let pluginName of additional.getPlugins()) {
    await import(additional.getPathToThePlugin(pluginName))
  }

  Plugin.globalEmitter.emit('pluginsAreReady')
}
catch (error) {
  console.error(error)
}