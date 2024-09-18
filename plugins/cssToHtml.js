import { Plugin } from './other/_plugin.js'
import path from 'path'
import { CssToHtml } from './other/cssToHtml/cssToHtml.js'

new Plugin({
  name: 'cssToHtml',
  associations: 'pcss',
  ignore: globalThis.paths.sources.styleLayouts + '**/_*.pcss',
  workingDirectory: globalThis.paths.sources.styleLayouts,
  logColor: '#ee9086',
  watchEvents: ['change'],
  runOnEvents: {
    names: [
      'tasksAreReady'
    ],
    function: process,
  },
})

const styleLayoutsPath = path.normalize(globalThis.paths.sources.styleLayouts)

function process(paths) {
  for (let pathToFile of paths) {
    let isLayout = isLayoutFile(pathToFile)

    let pathToHTML = pathToFile
      .replace(
        styleLayoutsPath,
        globalThis.paths.sources.root,
      )
      .replace('.pcss', '.html')

    new CssToHtml({
      pathToCSS: pathToFile,
      pathToHTML: pathToHTML,
      writeAfter: isLayout ? '</push>' : null,
      writeBefore: isLayout ? '</x-layout>' : null,
      formatterOptions: {
        indent_size: 2,
      },
    })

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
    })
  }
}

function isLayoutFile(pathToFile) {
  let fileDir = path.dirname(pathToFile) + '\\'

  return fileDir == styleLayoutsPath
}