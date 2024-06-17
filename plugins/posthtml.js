import posthtml from 'posthtml'
import { Plugin } from './_plugin.js'
import { FlatCache } from './flatCache.js'

export class PostHtml extends Plugin {
  #pluginsArray
  cache

  constructor({ paths, plugins, reLaunchOn }) {
    super({ srcPath: paths.src, destPath: paths.dest, })

    this.#pluginsArray = plugins

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
        this.processedBuffer.push(await this.#process(pathToFile))
      }
    }
    catch (error) {
      this.errorLog(error)
      return this.returnAndCleanProcessedBuffer()
    }


    this.emitter.emit('processEnd')

    return this.returnAndCleanProcessedBuffer()
  }

  async #process(pathToFile) {
    let distPathToFile = this.getDistPathForFile(pathToFile)

    let result = await posthtml(this.#pluginsArray)
      .process(this.fs.readFileSync(pathToFile, Plugin.ENCODING))

    this.fs.outputFileSync(distPathToFile, result.html, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
      style: 'cyan'
    })

    return this.getDistPathForFile(pathToFile)
  }
}