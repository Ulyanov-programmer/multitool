import { Plugin } from './other/_plugin.js'
import path from 'path'
import { CssToHtml } from 'css2html'
import postcss from 'postcss'
import nested from 'postcss-nested'
import simpleVars from 'postcss-simple-vars'

/**
 * This plugin uses the cssToHtml library to convert the contents of PCSS files into HTML.
 * It works exclusively within the styles/layouts folder.
 * 
 * It is triggered every time the file is changed.
 */

new Plugin({
  name: 'cssToHtml',
  associations: 'pcss',
  ignore: globalThis.config.sources.stylesLayouts + '**/_*.pcss',
  workingDirectory: globalThis.config.sources.stylesLayouts,
  logColor: '#ee9086',
  runOnEvents: {
    names: [
      'fs:change',
      'pluginsAreReady'
    ],
    function: process,
  },
})

const
  styleLayoutsPath = path.normalize(globalThis.config.sources.stylesLayouts),
  postcssEntity = postcss([
    simpleVars(),
    nested({
      preserveEmpty: true,
    }),
  ])

function process(paths) {
  for (let pathToFile of paths) {
    let isComponent = isHTMLComponent(pathToFile)

    let pathToHTML = createPathToHTML(pathToFile)

    let postcss = Plugin.fs.readFileSync(pathToFile, 'utf-8')
    let css = postcssEntity.process(postcss).css

    new CssToHtml({
      css: css,
      write: {
        in: pathToHTML,
        after: isComponent ? null : '</push>',
        before: isComponent ? null : '</',
      },
      format: true,
    })

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
    })
  }
}

function isHTMLComponent(pathToFile) {
  let fileDir = path.dirname(pathToFile) + '\\'

  return fileDir.includes(styleLayoutsPath + 'components\\')
}
function createPathToHTML(originalPath) {
  let pathToHTML = originalPath
    .replace(styleLayoutsPath, globalThis.config.sources.root)
    .replace('.pcss', '.html')

  return pathToHTML
}