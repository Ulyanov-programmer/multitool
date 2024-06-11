import posthtml from 'posthtml'
import { Plugin } from './_plugin.js'

export class PostHtml extends Plugin {
  #pluginsArray

  constructor({ paths, plugins }) {
    super({ srcPath: paths.src, destPath: paths.dest, })

    this.#pluginsArray = plugins
  }

  async runProcess(paths = this.srcPath) {
    let normalizedPaths = this.normalizeInputPaths(paths)
    if (!normalizedPaths) return []


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
    let result = await posthtml(this.#pluginsArray)
      .process(this.fs.readFileSync(pathToFile, Plugin.ENCODING))

    this.fs.writeFileSync(this.getDistPathForFile(pathToFile), result.html, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      name: pathToFile,
      style: 'cyan'
    })


    // a link to the processed file is returned 
    return this.getDistPathForFile(pathToFile)
  }
}