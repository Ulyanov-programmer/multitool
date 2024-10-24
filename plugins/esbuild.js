import { Plugin } from './other/_plugin.js'
import esbuild from 'esbuild'

/**
 * This plugin processes files .js/ts based on the esbuild library.
 * By default, it runs in watch mode (library features), so it is called only once.
 * 
 * It is also triggered when creating a new file.
 */

const
  WATCH_MODE = true,
  OPTIONS = {
    target: 'es2022',
    bundle: false,
    write: true,
    outdir: globalThis.config.output.scripts,
    //? Necessary if the task works with only one file.
    outbase: globalThis.config.sources.scripts,
    minify: globalThis.config.production,
  }

new Plugin({
  name: 'esbuild',
  associations: '{js,ts}',
  ignore: globalThis.config.sources.assets + '**',
  logColor: '#f3cb36',
  watchEvents: ['add'],

  runOnEvents: {
    function: process
  },
  outputExtname: 'js',
})
  .emitter.emit('run', {
    passAllFiles: true,
  })

async function process(paths) {
  let options = { ...OPTIONS, entryPoints: paths, }

  if (WATCH_MODE) {
    let buildContext = await esbuild.context(options)
    buildContext.watch()

    console.log(Plugin.chalk.green.bold('Files have been added to watch mode:'))
  }
  else {
    await esbuild.build(options)
  }

  for (let entry of paths) {
    this.emitter.emit('processedFile', {
      pathToFile: entry,
    })
  }
}