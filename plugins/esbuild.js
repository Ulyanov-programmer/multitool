import esbuild from 'esbuild'
import { Plugin } from './_plugin.js'

export class Esbuild extends Plugin {
  #DEFAULT_OPTIONS = {
    bundle: false,
    write: true,
  }
  #watchMode
  #options

  constructor({ paths, options }) {
    super({ srcPath: paths.src, })

    this.#watchMode = options.watchMode ?? false
    delete options.watchMode

    this.#options = options
  }

  async runProcess(paths = this.srcPath) {
    let normalizedPaths = this.normalizeInputPaths(paths)
    if (!normalizedPaths) return []


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
    }
    else {
      let buildContext = await esbuild.context(this.#options)
      buildContext.watch()

      console.log(this.chalk.bgGreen('Watch mode is active!'))
    }


    this.emitter.emit('processedFile', {})

    return paths
  }
}