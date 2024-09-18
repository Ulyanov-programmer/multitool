import { Plugin } from './other/_plugin.js'
import postcss from 'postcss'
import { plugins } from './other/postcssConfig.js'


new Plugin({
  name: 'postcss',
  associations: 'pcss',
  ignore: globalThis.paths.sources.assets + '**',
  watchEvents: ['change'],
  logColor: '#2277ff',
  runOnEvents: {
    names: [
      'tasksAreReady',
    ],
    function: process,
  },
  outputExtname: 'css',
})

const postcssItem = postcss(plugins)

async function process(paths) {
  for (let pathToFile of paths) {
    let destFilePath = Plugin.getDistPathForFile(pathToFile, 'css')

    let css = Plugin.fs.readFileSync(pathToFile)

    let result = await postcssItem.process(css,
      { from: pathToFile, to: destFilePath, }
    )

    Plugin.fs.outputFileSync(destFilePath, result.css, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
      extension: 'css',
    })
  }

  Plugin.globalEmitter.emit('run:beautifyTask', this.processedBuffer)
}