import { Sharp } from '../plugins/sharp.js'
import paths from '../grunt/other/paths.js'

export const sharpConfig = new Sharp({
  paths: {
    src: paths.src.images + '**/*.{gif,webp,avif,png,jpg,jpeg,svg}',
    dest: paths.dest.images,
  },
  options: {
    sharpOptions: {},
    logLevel: 'small',

    png: {
      quality: 90,

      webp: {},
      avif: {},
    },
    jpg: {
      mozjpeg: true,

      webp: {},
      avif: {},
    },
    gif: {
      webp: {},
    },
    webp: {},
    avif: {},
  },
})