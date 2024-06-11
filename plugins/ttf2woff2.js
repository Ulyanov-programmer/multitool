import ttf2woff2 from 'ttf2woff2'
import { Plugin } from './_plugin.js'

export class Ttf2Woff2 extends Plugin {
  constructor({ paths, }) {
    super({ srcPath: paths.src, destPath: paths.dest, })
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
    let fontInput = this.fs.readFileSync(pathToFile)

    this.fs.ensureDirSync(this.destPath)

    this.fs.writeFileSync(
      this.getDistPathForFile(pathToFile, '.woff2'),
      ttf2woff2(fontInput)
    )

    this.emitter.emit('processedFile', {
      name: pathToFile,
      style: 'blue'
    })

    // a link to the processed file is returned 
    return this.getDistPathForFile(pathToFile)
  }
}