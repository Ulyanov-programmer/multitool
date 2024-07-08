import esbuild from 'esbuild'
import { paths } from '../paths.js'
import { Plugin } from './other/_plugin.js'
import { isProductionMode } from './other/environment.js'

export default class Esbuild extends Plugin {
  #DEFAULT_OPTIONS = {
    bundle: false,
    write: true,
  }
  #watchMode = true
  #options = {
    target: 'es2022',
    bundle: false,
    outdir: paths.output.scripts,
    //? Necessary if the task works with only one file.
    outbase: paths.sources.scripts,
    minify: isProductionMode,
  }

  constructor() {
    super({
      associations: '{js,ts}',
      ignore: paths.sources.assets + '**',
      logColor: '#f3cb36',

      runTaskCallback: paths => { return this.#process(paths) },
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

      console.log(this.chalk.bgGreen('Watch mode is active'))

      for (let entry of paths) {
        this.emitter.emit('processedFile', {
          pathToFile: entry,
        })
      }
    }
  }
}