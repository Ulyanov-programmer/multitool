import paths from '../other/paths.js'
import { isProductionMode } from '../other/environment.js'

export let esbuild = {
  api: {
    files: {
      src: [
        paths.src.scripts + '**/*.{js,ts}',
        '!' + paths.src.scripts + '**/*.src.{js,ts}',
      ],
    },
    options: {
      target: 'es2021',
      bundle: false,
      outdir: paths.dest.scripts,
      //? Necessary if the task works with only one file.
      outbase: paths.src.scripts,
      watchMode: true,
    }
  },
  sources: {
    files: {
      src: paths.src.scripts + '**/*.src.{js,ts}',
    },
    options: {
      target: 'es2021',
      bundle: false,
      outdir: paths.dest.scripts,
      //? Necessary if the task works with only one file.
      outbase: paths.src.scripts,
      minify: isProductionMode ? true : false,
      watchMode: true,
    }
  }
}
