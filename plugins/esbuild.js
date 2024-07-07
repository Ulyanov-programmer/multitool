import esbuild from 'esbuild'
import { Plugin } from './_plugin.js'

export class Esbuild extends Plugin {
  #DEFAULT_OPTIONS = {
    bundle: false,
    write: true,
  }
  #watchMode
  #options

  constructor(options) {
    super({
      ...options,
      logColor: '#f3cb36',

      runTaskCallback: paths => { return this.#process(paths) },
    })

    this.#watchMode = options.params.watchMode ?? false
    delete options.params.watchMode

    this.#options = options.params

    this.emitter.emit('runTask', {
      passAllFiles: true,
    })
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

      for (let entry of paths) {
        this.emitter.emit('processedFile', {
          pathToFile: entry,
        })
      }
    }
    else {
      let buildContext = await esbuild.context(this.#options)
      buildContext.watch()

      console.log(this.chalk.bgGreen('Watch mode is active'))

      for (let entry of paths) {
        this.emitter.emit('processedFile', {
          pathToFile: entry,
        })
      }
    }
  }
}