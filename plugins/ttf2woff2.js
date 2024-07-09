import ttf2woff2 from 'ttf2woff2'
import { Plugin } from './other/_plugin.js'

export default class Ttf2Woff2 extends Plugin {
  constructor() {
    super({
      associations: '{otf,ttf}',
      ignore: globalThis.paths.sources.assets + '**',
      watchEvents: ['add'],
      logColor: '#2E2927',

      runTaskCallback: paths => { return this.#process(paths) },
    })

    this.emitter.emit('runTask')
  }

  #process(paths) {
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
}