import { Plugin } from './other/_plugin.js'
import postcss from 'postcss'
import { plugins } from './other/postcssPlugins.js'

/**
 * This plugin converts .pcss files by applying plugins based on the postcss library to them.
 * It also works when files are changed.
 * 
 * Upon completion of processing, the beatify plugin is called for all processed files.
 */

new Plugin({
  name: 'postcss',
  associations: 'pcss',
  ignore: globalThis.config.sources.assets + '**',
  logColor: '#2277ff',
  runOnEvents: {
    names: [
      'fs:change',
      'pluginsAreReady',
    ],
    function: process,
  },
  outputExtname: 'css',
})

const postcssItem = postcss(plugins)

async function process(paths) {
  for (let pathToFile of paths) {
    let destFilePath = Plugin.getDistPathForFile(pathToFile, 'css')

    let css = Plugin.fs.readFileSync(pathToFile)

    let result = await postcssItem.process(css,
      { from: pathToFile, to: destFilePath, }
    )

    Plugin.fs.outputFileSync(destFilePath, result.css, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
      extension: 'css',
    })
  }

  Plugin.globalEmitter.emit('run:beautifyTask', this.processedBuffer)
}