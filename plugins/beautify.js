import beautify from 'js-beautify'
import { paths } from '../paths.js'
import { Plugin } from './other/_plugin.js'

export default class Beautify extends Plugin {
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

  constructor() {
    super({
      associations: '{html,css}',
      ignore: paths.output.assets + '**',
      workingDirectory: paths.output.root,
      logColor: '#99005C',
    })

    globalThis.emitter.on('beautifyTaskRun', this.#process.bind(this))
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