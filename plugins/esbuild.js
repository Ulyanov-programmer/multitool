import esbuild from 'esbuild'
import { Plugin } from './other/_plugin.js'

export default class Esbuild extends Plugin {
  #DEFAULT_OPTIONS = {
    bundle: false,
    write: true,
  }
  #watchMode = true
  #options = {
    target: 'es2022',
    bundle: false,
    outdir: globalThis.paths.output.scripts,
    //? Necessary if the task works with only one file.
    outbase: globalThis.paths.sources.scripts,
    minify: globalThis.isProductionMode,
  }
  outputExtname = 'js'

  constructor() {
    super({
      associations: '{js,ts}',
      ignore: globalThis.paths.sources.assets + '**',
      logColor: '#f3cb36',
      runOnEvents: {
        function: paths => { return this.#process(paths) }
      },
    })

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

      console.log(Plugin.chalk.green.bold('Watch mode is active'))

      for (let entry of paths) {
        this.emitter.emit('processedFile', {
          pathToFile: entry,
        })
      }
    }
  }
}