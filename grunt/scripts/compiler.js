import paths from '../other/paths.js'
import { isProductionMode } from '../other/environment.js'

export default {
  api: {
    files: {
      src: [
        paths.src.scripts + '**/*.{js,ts}',
        '!' + paths.src.scripts + '**/*.src.{js,ts}',
      ],
    },
    options: {
      target: 'es2018',
      bundle: false,
      outdir: paths.dest.scripts,
    }
  },
  sources: {
    files: {
      src: paths.src.scripts + '**/*.src.{js,ts}',
    },
    options: {
      target: 'es2018',
      bundle: false,
      outdir: paths.dest.scripts,
      minify: isProductionMode ? true : false
    }
  }
}
