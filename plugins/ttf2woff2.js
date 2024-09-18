import { Plugin } from './other/_plugin.js'
import ttf2woff2 from 'ttf2woff2'


new Plugin({
  name: 'ttf2Woff2',
  associations: '{otf,ttf}',
  ignore: globalThis.paths.sources.assets + '**',
  watchEvents: ['add'],
  logColor: '#2E2927',
  runOnEvents: {
    names: [
      'tasksAreReady',
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