import { Plugin } from './other/_plugin.js'
import beautify from 'js-beautify'

/**
 * This plugin formats files in the dist folder.
 * It is recommended to call it exclusively through the 'run:beautifyTask' event.
 */

new Plugin({
  name: 'beautify',
  associations: '{html,css}',
  ignore: globalThis.config.output.assets + '**',
  workingDirectory: globalThis.config.output.root,
  logColor: '#99005C',
  runOnEvents: {
    names: [
      'run:beautifyTask',
    ],
    function: process,
  },
})

const FORMAT_OPTIONS = {
  html: {
    indent_size: 2,
    max_preserve_newlines: 1,
  },
  css: {
    indent_size: 2,
    max_preserve_newlines: 1,
  },
}

function process(paths) {
  for (let pathToFile of paths) {
    let data = Plugin.fs.readFileSync(pathToFile, Plugin.ENCODING)

    switch (Plugin.path.parse(pathToFile).ext) {
      case '.html':
        var result = beautify.html(data, FORMAT_OPTIONS.html)
        break
      case '.css':
        var result = beautify.css(data, FORMAT_OPTIONS.css)
        break
    }

    Plugin.fs.writeFileSync(pathToFile, result, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
    })
  }
}