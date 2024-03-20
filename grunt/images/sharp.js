import paths from '../other/paths.js'

export let sharp = {
  files: {
    src: paths.src.images + '**/*.{gif,webp,avif,png,jpg,jpeg,svg}',
    dest: paths.dest.images,
  },
  options: {
    sharpOptions: {
    },
    logLevel: 'small',

    png_to_png: {
    },
    jpg_to_jpg: {
      mozjpeg: true,
    },
    png_to_webp: {
    },
    png_to_avif: {
    },
    jpg_to_webp: {
    },
    jpg_to_avif: {
    },
    gif_to_webp: {
    },
    webp_to_webp: {
    },
    avif_to_avif: {
    },
  }
}