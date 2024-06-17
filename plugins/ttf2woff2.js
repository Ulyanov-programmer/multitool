import ttf2woff2 from 'ttf2woff2'
import { Plugin } from './_plugin.js'
import { FlatCache } from './flatCache.js'

export class Ttf2Woff2 extends Plugin {
  cache

  constructor({ paths, reLaunchOn }) {
    super({ srcPath: paths.src, destPath: paths.dest, })

    reLaunchOn && this.startWatching(reLaunchOn)

    this.cache = new FlatCache({
      paths: {
        src: this.srcPath,
      },
      id: this.constructor.name,
      cacheFolderPath: this.paths.cache + this.constructor.name + '/'
    })

    this.runProcess()
  }

  async runProcess(paths = this.srcPath) {
    paths = this.cache.getChangedFiles(paths)

    let normalizedPaths = this.normalizeInputPaths(paths)
    if (!normalizedPaths) return


    this.emitter.emit('processStart')

    try {
      for (let pathToFile of normalizedPaths) {
        this.processedBuffer.push(this.#process(pathToFile))
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
      style: 'blue'
    })

    // a link to the processed file is returned 
    return this.getDistPathForFile(pathToFile)
  }
}