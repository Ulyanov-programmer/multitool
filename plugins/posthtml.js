import posthtml from 'posthtml'
import component from 'posthtml-component'
import imgAutosize from 'posthtml-img-autosize'
import { Plugin } from './other/_plugin.js'

export default class PostHtml extends Plugin {
  #plugins = [
    component({
      root: globalThis.paths.sources.root,
      folders: ['components'],
    }),
    imgAutosize({
      root: globalThis.paths.output.root,
      processEmptySize: true,
    }),
  ]
  outputExtname = 'html'

  constructor() {
    super({
      associations: 'html',
      ignore: [globalThis.paths.sources.assets + '**', globalThis.paths.sources.htmlComponents + '**'],
      watchEvents: ['change'],
      thirdPartyFiles: [
        globalThis.paths.sources.htmlComponents + '*.html',
      ],
      logColor: '#e54d26',
      runOnEvents: {
        names: [
          'tasksAreReady',
        ],
        function: paths => { return this.#process(paths) }
      },
    })
  }

  async #process(paths) {
    for (let pathToFile of paths) {
      let distPathToFile = Plugin.getDistPathForFile(pathToFile)

      let result = await posthtml(this.#plugins)
        .process(Plugin.fs.readFileSync(pathToFile, Plugin.ENCODING))

      Plugin.fs.outputFileSync(distPathToFile, result.html, Plugin.ENCODING)

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }

    Plugin.globalEmitter.emit('run:beautifyTask', this.processedBuffer)
  }
}
