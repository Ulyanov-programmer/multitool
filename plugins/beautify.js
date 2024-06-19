import beautify from 'js-beautify'
import { Plugin } from './_plugin.js'
import { FlatCache } from './flatCache.js'

export class Beautify extends Plugin {
  #options
  #beautifyPlugin
  cache

  constructor(options) {
    super({
      associations: options.associations,
      workingDirectory: options.workingDirectory,
      ignore: options.ignore,
    })

    this.#options = options.options
    this.#beautifyPlugin = options.beautifyPluginSlug

    options.reLaunchOn && this.startWatching(options.reLaunchOn)

    this.cache = new FlatCache({
      id: this.constructor.name,
    })
  }

  runProcess(paths = this.files()) {
    paths = this.cache.getChangedFiles(paths)

    let normalizedPaths = this.normalizeInputPaths(paths)
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
    let data = this.fs.readFileSync(pathToFile, Plugin.ENCODING)
    let result

    switch (this.#beautifyPlugin) {
      case 'html':
        result = beautify.html(data, this.#options)
        break
      case 'css':
        result = beautify.css(data, this.#options)
        break
    }

    this.fs.writeFileSync(pathToFile, result, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
      style: 'yellow'
    })
  }
}