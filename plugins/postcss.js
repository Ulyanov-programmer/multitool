import postcss from 'postcss'
import { plugins } from './other/postcssConfig.js'
import { paths } from '../paths.js'
import { Plugin } from './other/_plugin.js'


export default class PostCss extends Plugin {
  #postcssItem = postcss(plugins)
  #outputExtname = 'css'

  constructor() {
    super({
      associations: 'pcss',
      ignore: paths.sources.assets + '**',
      outputExtname: 'css',
      watchEvents: ['change'],
      logColor: '#2277ff',

      runTaskCallback: paths => { return this.#process(paths) },
    })

    this.emitter.emit('runTask')
  }

  async #process(paths) {
    for (let pathToFile of paths) {
      let destFilePath = Plugin.getDistPathForFile(pathToFile, this.#outputExtname)

      let css = this.fs.readFileSync(pathToFile)

      let result = await this.#postcssItem.process(css,
        {
          from: pathToFile,
          to: destFilePath,
        }
      )

      this.fs.outputFileSync(destFilePath, result.css, Plugin.ENCODING)

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
        extension: 'css',
      })
    }

    globalThis?.emitter.emit('beautifyTaskRun', this.returnAndCleanProcessedBuffer())
  }
}