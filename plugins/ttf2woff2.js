import ttf2woff2 from 'ttf2woff2'
import { paths } from '../paths.js'
import { Plugin } from './other/_plugin.js'

export default class Ttf2Woff2 extends Plugin {
  constructor() {
    super({
      associations: '{otf,ttf}',
      ignore: paths.sources.assets + '**',
      watchEvents: ['add'],
      logColor: '#2E2927',

      runTaskCallback: paths => { return this.#process(paths) },
    })

    this.emitter.emit('runTask')
  }

  #process(paths) {
    for (let pathToFile of paths) {
      let fontInput = this.fs.readFileSync(pathToFile)

      this.fs.outputFileSync(
        Plugin.getDistPathForFile(pathToFile, 'woff2'),
        ttf2woff2(fontInput)
      )

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }
  }
}