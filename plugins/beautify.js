import beautify from 'js-beautify'
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
      ignore: globalThis.paths.output.assets + '**',
      workingDirectory: globalThis.paths.output.root,
      logColor: '#99005C',
      runOnEvents: {
        names: [
          'run:beautifyTask',
        ],
        function: paths => { return this.#process(paths) }
      },
    })
  }

  #process(paths) {
    for (let pathToFile of paths) {
      let data = Plugin.fs.readFileSync(pathToFile, Plugin.ENCODING)
      let result

      switch (Plugin.path.parse(pathToFile).ext) {
        case '.html':
          result = beautify.html(data, this.#formatOptions.html)
          break
        case '.css':
          result = beautify.css(data, this.#formatOptions.css)
          break
      }

      Plugin.fs.writeFileSync(pathToFile, result, Plugin.ENCODING)

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }
  }
}