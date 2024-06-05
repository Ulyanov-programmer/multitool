import posthtml from 'posthtml'
import { Plugin } from './_plugin.js'

export class PostHtml extends Plugin {
  #pluginsArray

  constructor({ paths, plugins }) {
    super({ srcPath: paths.src, destPath: paths.dest, })

    this.#pluginsArray = plugins
  }

  async runProcess(paths = this.srcPath) {
    this.emitter.emit('processStart')

    paths = this.transformPathsToArrayIfHasMagic(paths)

    if (paths instanceof Array) {
      for (let pathToFile of paths) {
        this.processedBuffer.push(await this.#process(pathToFile))
      }
    }
    else {
      this.processedBuffer.push(await this.#process(paths))
    }

    this.emitter.emit('processEnd')

    return this.cleanProcessedBufferAndReturnIt()
  }

  async #process(pathToFile) {
    pathToFile = this.path.normalize(pathToFile)

    let result = await posthtml(this.#pluginsArray)
      .process(this.fs.readFileSync(pathToFile, Plugin.ENCODING))

    let fileName = pathToFile.split(this.path.sep).at(-1)

    this.fs.writeFileSync(this.destPath + fileName, result.html, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      name: pathToFile,
      style: 'cyan'
    })

    // a link to the processed file is returned 
    return this.destPath + fileName
  }
}