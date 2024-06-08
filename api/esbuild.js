import { Esbuild } from '../plugins/esbuild.js'
import paths from '../grunt/other/paths.js'
import { isProductionMode } from '../grunt/other/environment.js'

export const esbuildConfig = new Esbuild({
  paths: {
    src: paths.src.scripts + '**/*.{js,ts}',
  },
  options: {
    target: 'es2022',
    bundle: false,
    outdir: paths.dest.scripts,
    //? Necessary if the task works with only one file.
    outbase: paths.src.scripts,
    watchMode: true,
    minify: isProductionMode,
  },
})
