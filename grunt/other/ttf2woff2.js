import paths from './paths.js'

export default {
  main: {
    src: paths.src.fontsFolder + '*.{otf,ttf}',
    dest: paths.dest.fonts,
  },
}
