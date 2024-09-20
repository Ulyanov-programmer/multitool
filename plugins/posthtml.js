import { Plugin } from './other/_plugin.js'
import posthtml from 'posthtml'
import component from 'posthtml-component'
import imgAutosize from 'posthtml-img-autosize'

/**
 * This plugin converts .html files by applying plugins based on the posthtml library to them.
 * It also works when files are changed.
 * 
 * Upon completion of processing, the beatify plugin is called for all processed files.
 */

new Plugin({
  name: 'posthtml',
  associations: 'html',
  ignore: [
    globalThis.paths.sources.assets + '**',
    globalThis.paths.sources.htmlComponents + '**'
  ],
  watchEvents: ['change'],
  thirdPartyFiles: [
    globalThis.paths.sources.htmlComponents + '*.html',
  ],
  logColor: '#e54d26',
  runOnEvents: {
    names: [
      'pluginsAreReady',
    ],
    function: process
  },
  outputExtname: 'html',
})

const plugins = [
  component({
    root: globalThis.paths.sources.root,
    folders: ['components'],
  }),
  imgAutosize({
    root: globalThis.paths.output.root,
    processEmptySize: true,
  }),
]

async function process(paths) {
  for (let pathToFile of paths) {
    let distPathToFile = Plugin.getDistPathForFile(pathToFile)

    let result = await posthtml(plugins)
      .process(Plugin.fs.readFileSync(pathToFile, Plugin.ENCODING))

    Plugin.fs.outputFileSync(distPathToFile, result.html, Plugin.ENCODING)

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
    })
  }

  Plugin.globalEmitter.emit('run:beautifyTask', this.processedBuffer)
}