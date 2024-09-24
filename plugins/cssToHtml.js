import { Plugin } from './other/_plugin.js'
import path from 'path'
import { CssToHtml } from 'css2html'
import postcss from 'postcss'
import nested from 'postcss-nested'

/**
 * This plugin uses the cssToHtml library to convert the contents of PCSS files into HTML.
 * It works exclusively within the styles/layouts folder.
 * 
 * It is triggered every time the file is changed.
 */

new Plugin({
  name: 'cssToHtml',
  associations: 'pcss',
  ignore: globalThis.paths.sources.styleLayouts + '**/_*.pcss',
  workingDirectory: globalThis.paths.sources.styleLayouts,
  logColor: '#ee9086',
  watchEvents: ['change'],
  runOnEvents: {
    names: [
      'pluginsAreReady'
    ],
    function: process,
  },
})

const
  styleLayoutsPath = path.normalize(globalThis.paths.sources.styleLayouts),
  postcssEntity = postcss([
    nested({
      preserveEmpty: true,
    }),
  ])

function process(paths) {
  for (let pathToFile of paths) {
    let isLayout = isLayoutFile(pathToFile)

    let pathToHTML = pathToFile
      .replace(
        styleLayoutsPath,
        globalThis.paths.sources.root,
      )
      .replace('.pcss', '.html')

    let postcss = Plugin.fs.readFileSync(pathToFile, 'utf-8')
    let css = postcssEntity.process(postcss).css

    new CssToHtml({
      css: css,
      write: {
        in: pathToHTML,
        after: isLayout ? '</push>' : null,
        before: isLayout ? '</x-layout>' : null,
      },
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