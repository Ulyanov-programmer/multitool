import posthtml from 'posthtml'
import { Plugin } from './_plugin.js'

export class PostHtml extends Plugin {
  #pluginsArray
  cache

  constructor(options) {
    super({
      associations: options.associations,
      workingDirectory: options.workingDirectory,
      ignore: options.ignore,
      logColor: '#e54d26',
      thirdPartyFiles: options.thirdPartyFiles,
      runTaskCallback: paths => { return this.#process(paths) },
    })

    this.#pluginsArray = options.plugins

    this.startWatching(options.reLaunchOn)

    this.emitter.emit('runTask')
  }

  async #process(paths) {
    for (let pathToFile of paths) {
      let distPathToFile = this.getDistPathForFile(pathToFile)

      let result = await posthtml(this.#pluginsArray)
        .process(this.fs.readFileSync(pathToFile, Plugin.ENCODING))

      this.fs.outputFileSync(distPathToFile, result.html, Plugin.ENCODING)

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
      })
    }
  }
}