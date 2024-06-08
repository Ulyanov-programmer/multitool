import beautify from 'js-beautify'
import { Plugin } from './_plugin.js'

export class BeautifyHtml extends Plugin {
  #options

  constructor({ paths, options }) {
    super({ srcPath: paths.src, destPath: paths.dest, })

    this.#options = options
  }

  runProcess(paths = this.srcPath) {
    let normalizedPaths = this.normalizeInputPaths(paths)
    if (!normalizedPaths) return []


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
    let data = this.fs.readFileSync(pathToFile, Plugin.ENCODING)

    let result = beautify.html(data, this.#options)

    let fileName = this.path.parse(pathToFile).base

    this.fs.writeFileSync(this.destPath + fileName, result, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      name: pathToFile,
      style: 'yellow'
    })

    // a link to the processed file is returned 
    return this.destPath + fileName
  }
}