import esbuild from 'esbuild'
import { Plugin } from './_plugin.js'
import { FlatCache } from './flatCache.js'

export class Esbuild extends Plugin {
  #DEFAULT_OPTIONS = {
    bundle: false,
    write: true,
  }
  #watchMode
  #options
  cache

  constructor(options) {
    super({
      associations: options.associations,
      workingDirectory: options.workingDirectory,
      ignore: options.ignore,
    })

    this.#watchMode = options.params.watchMode ?? false
    delete options.params.watchMode

    this.#options = options.params

    this.cache = new FlatCache({
      id: this.constructor.name,
    })

    this.runProcess()
  }

  async runProcess(paths = this.files()) {
    paths = this.cache.getChangedFiles(paths)

    let normalizedPaths = this.normalizeInputPaths(paths)
    if (!normalizedPaths) return


    this.emitter.emit('processStart')

    try {
      this.processedBuffer.push(await this.#process(normalizedPaths))
    }
    catch (error) {
      this.errorLog(error)
      return this.returnAndCleanProcessedBuffer()
    }


    this.emitter.emit('processEnd')

    return this.returnAndCleanProcessedBuffer()
  }

  async #process(paths) {
    this.#options = Object.assign(
      {
        entryPoints: paths,
      },
      this.#DEFAULT_OPTIONS,
      this.#options,
    )

    if (!this.#watchMode) {
      await esbuild.build(this.#options)

      this.emitter.emit('processedFile', {})
    }
    else {
      let buildContext = await esbuild.context(this.#options)
      buildContext.watch()

      console.log(this.chalk.bgGreen('Watch mode is active!'))
    }

    return paths
  }
}