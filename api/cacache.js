import { Cacache } from '../plugins/cacache.js'
import paths from '../grunt/other/paths.js'

export const cacacheHtmlConfig = new Cacache({
  paths: {
    src: paths.src.root + '*.html',
  },
  keyPrefix: 'html',
  cacheFolderPath: paths.cache + 'html/'
})
export const cacacheCssConfig = new Cacache({
  paths: {
    src: paths.src.styles + '*.pcss',
  },
  keyPrefix: 'css',
  cacheFolderPath: paths.cache + 'css/'
})
export const cacacheCssForScriptsConfig = new Cacache({
  paths: {
    src: paths.src.scripts + '**/*.pcss',
  },
  keyPrefix: 'css-scripts',
  cacheFolderPath: paths.cache + 'css-scripts/'
})
export const cacacheFontsConfig = new Cacache({
  paths: {
    src: paths.src.fontsFolder + '*.{otf,ttf}',
  },
  keyPrefix: 'font',
  cacheFolderPath: paths.cache + 'fonts/'
})
export const cacacheImagesConfig = new Cacache({
  paths: {
    src: paths.src.images + '**/*.{gif,webp,avif,png,jpg,jpeg,svg}',
  },
  keyPrefix: 'image',
  cacheFolderPath: paths.cache + 'images/'
})