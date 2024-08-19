import path from 'path'
import { Plugin } from './other/_plugin.js'
import { CssToHtml } from './other/cssToHtml/cssToHtml.js'

export default class CssToHtmlPlugin extends Plugin {
  constructor() {
    super({
      associations: 'css',
      ignore: globalThis.paths.output.assets + '**',
      workingDirectory: globalThis.paths.output.styleLayouts,
      logColor: '#ee9086',
      runOnEvents: {
        names: [
          'run:cssToHtmlTask',
        ],
        function: paths => { return this.#process(paths) }
      },
    })
  }

  #process(paths) {
    for (let pathToFile of paths) {
      let fileName = path.basename(pathToFile)

      new CssToHtml({
        pathToCSS: pathToFile,
        pathToHTML: globalThis.paths.sources.root + fileName.replace('.css', '.html'),
        writeAfter: 'name="additional_code_in_head"></push>',
        writeBefore: '</x-layout>',
        formatterOptions: {
          indent_size: 1,
        },
      })

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }
  }
}