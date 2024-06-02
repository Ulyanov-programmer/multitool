import beautify from 'js-beautify'
import { Plugin } from './_plugin.js'

export class BeautifyHtml extends Plugin {
  #options

  constructor({ paths, options }) {
    super({
      srcPath: paths.src,
      destPath: paths.dest,
    })
    this.#options = options
  }

  runProcess(paths = this.srcPath) {
    paths = this.transformPathsToArrayIfHasMagic(paths)

    if (paths instanceof Array) {
      for (let pathToFile of paths) {
        this.processedBuffer.push(this.#process(pathToFile))
      }
    }
    else {
      this.processedBuffer.push(this.#process(paths))
    }

    return this.cleanProcessedBufferAndReturnIt(this.processedBuffer)
  }

  #process(pathToFile) {
    pathToFile = this.path.normalize(pathToFile)

    let data = this.fs.readFileSync(pathToFile, Plugin.ENCODING)

    let result = beautify.html(data, this.#options)

    let fileName = pathToFile.split(this.path.sep).at(-1)

    this.fs.writeFileSync(this.destPath + fileName, result, Plugin.ENCODING)

    this.log({
      plugin: this.constructor.name,
      processedFile: {
        name: pathToFile,
        style: 'yellow'
      }
    })

    // a link to the processed file is returned 
    return this.destPath + fileName
  }
}