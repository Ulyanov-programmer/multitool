import postcss from 'postcss'
import { Plugin } from './_plugin.js'

export class PostCss extends Plugin {
  #plugins
  #postcssItem
  #outputExtname
  #customEmitters

  constructor(options) {
    super({
      ...options,
      logColor: '#2277ff',

      runTaskCallback: paths => { return this.#process(paths) },
    })

    this.#customEmitters = options.emitEventOnDone ?? []

    this.#plugins = options.plugins
    this.#outputExtname = options.outputExtname

    this.#postcssItem = postcss(this.#plugins)

    this.emitter.emit('runTask')
  }

  async #process(paths) {
    for (let pathToFile of paths) {
      let destFilePath = Plugin.getDistPathForFile(pathToFile, this.#outputExtname)

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
        extension: 'css',
      })
    }

    for (let emitter of this.#customEmitters ?? []) {
      emitter.emit('posthtmlDone', this.returnAndCleanProcessedBuffer())
    }
  }
}