import posthtml from 'posthtml'
import { Plugin } from './_plugin.js'

export class PostHtml extends Plugin {
  #pluginsArray
  #customEmitters

  constructor(options) {
    super({
      ...options,
      logColor: '#e54d26',

      runTaskCallback: paths => { return this.#process(paths) },
    })

    this.#customEmitters = options.emitEventOnDone ?? []

    this.#pluginsArray = options.plugins

    this.emitter.emit('runTask')
  }

  async #process(paths) {
    for (let pathToFile of paths) {
      let distPathToFile = Plugin.getDistPathForFile(pathToFile)

      let result = await posthtml(this.#pluginsArray)
        .process(this.fs.readFileSync(pathToFile, Plugin.ENCODING))

      this.fs.outputFileSync(distPathToFile, result.html, Plugin.ENCODING)

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }

    for (let emitter of this.#customEmitters ?? []) {
      emitter.emit('posthtmlDone', this.returnAndCleanProcessedBuffer())
    }
  }
}