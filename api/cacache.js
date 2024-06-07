import { Cacache } from '../plugins/cacache.js'
import paths from '../grunt/other/paths.js'

export const cacacheConfig = new Cacache({
  paths: {
    src: paths.src.root + '*.html',
  },
  keyPrefix: 'html',
  cacheFolderPath: './tmp/html/'
})