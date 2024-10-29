import { Plugin } from './other/_plugin.js'
import ttf2woff2 from 'ttf2woff2'

/**
 * This plugin converts font files in .otf/ttf format to .woff2 format.
 * It also works if you add a new font file.
 */

new Plugin({
  name: 'ttf2Woff2',
  associations: '{otf,ttf}',
  ignore: globalThis.config.sources.assets + '**',
  logColor: '#2E2927',
  runOnEvents: {
    names: [
      'fs:add',
      'pluginsAreReady',
    ],
    function: process
  },
})

function process(paths) {
  for (let pathToFile of paths) {
    let fontInput = Plugin.fs.readFileSync(pathToFile)

    Plugin.fs.outputFileSync(
      Plugin.getDistPathForFile(pathToFile, 'woff2'),
      ttf2woff2(fontInput)
    )

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
    })
  }
}