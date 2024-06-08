import postcss from 'postcss'
import { Plugin } from './_plugin.js'

export class PostCss extends Plugin {
  #plugins
  #postcssItem
  #outputExtname

  constructor({ paths, plugins, outputExtname }) {
    super({ srcPath: paths.src, destPath: paths.dest, })

    this.#plugins = plugins
    this.#outputExtname = outputExtname

    this.#postcssItem = postcss(this.#plugins)
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
    let destFilePath = this.#outputExtname
      ? this.destPath + this.path.parse(pathToFile).name + '.' + this.#outputExtname
      : this.destPath + this.path.parse(pathToFile).base

    let css = this.fs.readFileSync(pathToFile)

    let result = await this.#postcssItem.process(css,
      {
        from: pathToFile,
        to: destFilePath,
      }
    )

    this.fs.ensureFileSync(destFilePath)
    this.fs.writeFileSync(destFilePath, result.css, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      name: pathToFile,
      style: 'green'
    })

    return destFilePath
  }
}