import ttf2woff2 from 'ttf2woff2'
import { Plugin } from './_plugin.js'

export class Ttf2Woff2 extends Plugin {
  cache

  constructor(options) {
    super({
      associations: options.associations,
      workingDirectory: options.workingDirectory,
      ignore: options.ignore,
      logColor: '#2E2927',
      runTaskCallback: paths => { return this.#process(paths) },
    })

    this.startWatching(options.reLaunchOn)

    this.emitter.emit('runTask')
  }

  #process(paths) {
    for (let pathToFile of paths) {
      let fontInput = this.fs.readFileSync(pathToFile)

      this.fs.outputFileSync(
        this.getDistPathForFile(pathToFile, 'woff2'),
        ttf2woff2(fontInput)
      )

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }
  }
}