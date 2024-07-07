import beautify from 'js-beautify'
import { Plugin } from './_plugin.js'

export class Beautify extends Plugin {
  #options
  #beautifyPlugin

  constructor(options) {
    super({
      ...options,
      logColor: '#99005C',

      runTaskCallback: paths => { return this.#process(paths) },
    })

    this.#options = options.options
    this.#beautifyPlugin = options.beautifyPluginSlug
  }

  #process(paths) {
    for (let pathToFile of paths) {
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
      })
    }
  }
}