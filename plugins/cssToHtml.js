import path from 'path'
import { Plugin } from './other/_plugin.js'
import { CssToHtml } from './other/cssToHtml/cssToHtml.js'

export default class CssToHtmlPlugin extends Plugin {
  static styleLayoutsPath = path.normalize(globalThis.paths.sources.styleLayouts)

  constructor() {
    super({
      associations: 'pcss',
      ignore: globalThis.paths.sources.styles + 'layouts/**/_*.pcss',
      workingDirectory: globalThis.paths.sources.styles + 'layouts/',
      logColor: '#ee9086',
      watchEvents: ['change'],
      runOnEvents: {
        names: [
          'tasksAreReady'
        ],
        function: paths => { return this.#process(paths) }
      },
    })
  }

  #process(paths) {
    for (let pathToFile of paths) {
      let isLayoutFile = this.#isLayoutFile(pathToFile)

      let pathToHTML = pathToFile
        .replace(
          CssToHtmlPlugin.styleLayoutsPath,
          globalThis.paths.sources.root,
        )
        .replace('.pcss', '.html')

      new CssToHtml({
        pathToCSS: pathToFile,
        pathToHTML: pathToHTML,
        writeAfter: isLayoutFile ? '</push>' : null,
        writeBefore: isLayoutFile ? '</x-layout>' : null,
        formatterOptions: {
          indent_size: 2,
        },
      })

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }
  }

  #isLayoutFile(pathToFile) {
    let fileDir = path.dirname(pathToFile) + '\\'

    return fileDir == CssToHtmlPlugin.styleLayoutsPath
  }
}