import paths from './paths.js'
import { isProductionMode } from './environment.js'

export let watch = {
  html: {
    files: paths.src.root + '*.html',
    tasks: isProductionMode
      ? ['newer:posthtml', 'newer:prettify']
      : ['newer:posthtml'],
    options: {
      spawn: false,
    },
  },
  htmlComponents: {
    files: paths.src.root + 'components/*.html',
    tasks: isProductionMode
      ? ['posthtml', 'prettify']
      : ['posthtml'],
    options: {
      spawn: false,
    },
  },
  css: {
    files: paths.src.styles + '*.pcss',
    tasks: ['newer:postcss:base', 'newer:cssmin:main'],
    options: {
      spawn: false,
    },
  },
  cssForScripts: {
    files: paths.src.scripts + '**/*.pcss',
    tasks: ['newer:postcss:modules', 'newer:cssmin:scripts'],
    options: {
      spawn: false,
    },
  },
  cssEnvFile: {
    files: paths.src.styles + '_environment.pcss',
    tasks: 'postcss',
    options: {
      spawn: false,
    },
  },
  assets: {
    files: paths.src.assets + '**/*',
    tasks: 'newer:copy',
    options: {
      spawn: false,
    },
  },
  images: {
    files: [
      //! DO NOT SET AN ANOTHER REGEX VALUE, only **/** works. ¯\_(ツ)_/¯
      paths.src.images + '**/**',
    ],
    tasks: 'sharp',
    options: {
      spawn: false,
      event: ['changed', 'added']
    },
  },
}