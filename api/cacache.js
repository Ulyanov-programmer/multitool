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
export const cacacheFontsConfig = new Cacache({
  paths: {
    src: paths.src.fontsFolder + '*.{otf,ttf}',
  },
  keyPrefix: 'font',
  cacheFolderPath: paths.cache + 'fonts/'
})