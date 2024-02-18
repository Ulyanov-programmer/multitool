import paths from './paths.js'

export let ttf2woff2 = {
  main: {
    src: paths.src.fontsFolder + '*.{otf,ttf}',
    dest: paths.dest.fonts,
  },
}
