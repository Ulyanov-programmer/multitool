import paths from './paths.js'

export default {
  main: {
    expand: true,

    src: paths.src.assets + '**/*',
    dest: paths.dest.assets,
  },
}
