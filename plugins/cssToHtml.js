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
        pathToHTML: globalThis.paths.output.root + fileName.replace('.css', '.html'),
        writeAfter: '<main>',
        writeBefore: '<footer>'
      })

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }
  }
}