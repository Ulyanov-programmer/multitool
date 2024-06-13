import posthtml from 'posthtml'
import { Plugin } from './_plugin.js'

export class PostHtml extends Plugin {
  #pluginsArray

  constructor({ paths, plugins }) {
    super({ srcPath: paths.src, destPath: paths.dest, })

    this.#pluginsArray = plugins

    this.runProcess()
  }

  async runProcess(paths = this.srcPath) {
    paths = await this.getCachedFiles(paths)

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
      name: pathToFile,
      style: 'cyan'
    })

    return this.getDistPathForFile(pathToFile)
  }
}