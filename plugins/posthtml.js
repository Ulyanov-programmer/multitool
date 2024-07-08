import posthtml from 'posthtml'
import component from 'posthtml-component'
import imgAutosize from 'posthtml-img-autosize'
import { paths } from '../paths.js'
import { Plugin } from './other/_plugin.js'

export default class PostHtml extends Plugin {
  #plugins = [
    component({
      root: paths.sources.root,
      folders: ['components'],
    }),
    imgAutosize({
      root: paths.output.root,
      processEmptySize: true,
    }),
  ]

  constructor() {
    super({
      associations: 'html',
      ignore: [paths.sources.assets + '**', paths.sources.htmlComponents + '**'],
      watchEvents: ['change'],
      thirdPartyFiles: [
        paths.sources.htmlComponents + '*.html',
      ],
      logColor: '#e54d26',

      runTaskCallback: paths => { return this.#process(paths) },
    })

    this.emitter.emit('runTask')
  }

  async #process(paths) {
    for (let pathToFile of paths) {
      let distPathToFile = Plugin.getDistPathForFile(pathToFile)

      let result = await posthtml(this.#plugins)
        .process(this.fs.readFileSync(pathToFile, Plugin.ENCODING))

      this.fs.outputFileSync(distPathToFile, result.html, Plugin.ENCODING)

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }

    globalThis?.emitter.emit('beautifyTaskRun', this.returnAndCleanProcessedBuffer())
  }
}
