import postcss from 'postcss'
import { Plugin } from './_plugin.js'
import { FlatCache } from './flatCache.js'

export class PostCss extends Plugin {
  #plugins
  #postcssItem
  #outputExtname

  constructor(options) {
    super({
      associations: options.associations,
      workingDirectory: options.workingDirectory,
    })

    this.#plugins = options.plugins
    this.#outputExtname = options.outputExtname

    this.#postcssItem = postcss(this.#plugins)

    options.reLaunchOn && this.startWatching(options.reLaunchOn)

    this.cache = new FlatCache({
      id: this.constructor.name,
      cacheFolderPath: this.paths.cache + this.constructor.name + '/'
    })

    this.runProcess()
  }

  async runProcess(paths = this.files()) {
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
    let destFilePath = this.getDistPathForFile(pathToFile, this.#outputExtname)

    let css = this.fs.readFileSync(pathToFile)

    let result = await this.#postcssItem.process(css,
      {
        from: pathToFile,
        to: destFilePath,
      }
    )

    this.fs.outputFileSync(destFilePath, result.css, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
      style: 'green'
    })

    return destFilePath
  }
}