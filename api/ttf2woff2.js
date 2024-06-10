import paths from '../grunt/other/paths.js'
import { Ttf2Woff2 } from '../plugins/ttf2woff2.js'

export const ttf2Woff2Config = new Ttf2Woff2({
  paths: {
    src: paths.src.fontsFolder + '*.{otf,ttf}',
    dest: paths.dest.fonts,
  },
})