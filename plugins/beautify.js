import beautify from 'js-beautify'
import { Plugin } from './_plugin.js'

export class Beautify extends Plugin {
  #formatOptions = {
    html: {
      indent_size: 2,
      max_preserve_newlines: 1,
    },
    css: {
      indent_size: 2,
      max_preserve_newlines: 1,
    },
  }

  constructor(options) {
    super({
      ...options,
      logColor: '#99005C',
    })

    for (let emitter of options.subscribeOnEmitters ?? []) {
      emitter.on('posthtmlDone', this.#process.bind(this))
    }
  }

  #process(paths) {
    for (let pathToFile of paths) {
      let data = this.fs.readFileSync(pathToFile, Plugin.ENCODING)
      let result

      switch (this.path.parse(pathToFile).ext) {
        case '.html':
          result = beautify.html(data, this.#formatOptions.html)
          break
        case '.css':
          result = beautify.css(data, this.#formatOptions.css)
          break
      }

      this.fs.writeFileSync(pathToFile, result, Plugin.ENCODING)

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }
  }
}