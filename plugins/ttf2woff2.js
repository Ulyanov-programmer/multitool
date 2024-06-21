import ttf2woff2 from 'ttf2woff2'
import { Plugin } from './_plugin.js'
import { LocalCache } from './cache.js'

export class Ttf2Woff2 extends Plugin {
  cache

  constructor(options) {
    super({
      associations: options.associations,
      workingDirectory: options.workingDirectory,
      ignore: options.ignore,
      logColor: '#2986cc',
    })

    options.reLaunchOn && this.startWatching(options.reLaunchOn)

    this.cache = new LocalCache()

    this.runProcess()
  }

  async runProcess(paths = this.files()) {
    paths = this.cache.getChangedFiles(paths)

    let normalizedPaths = this.unGlobAndNormalizePaths(paths)
    if (!normalizedPaths) return


    this.emitter.emit('processStart')

    try {
      for (let pathToFile of normalizedPaths) {
        this.#process(pathToFile)
      }
    }
    catch (error) {
      this.errorLog(error)
      return this.returnAndCleanProcessedBuffer()
    }


    this.emitter.emit('processEnd')

    return this.returnAndCleanProcessedBuffer()
  }

  #process(pathToFile) {
    let fontInput = this.fs.readFileSync(pathToFile)

    this.fs.outputFileSync(
      this.getDistPathForFile(pathToFile, '.woff2'),
      ttf2woff2(fontInput)
    )

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
    })
  }
}