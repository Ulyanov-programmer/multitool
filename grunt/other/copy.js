import paths from './paths.js'

export default {
  main: {
    expand: true,

    cwd: paths.src.assets,
    src: '**/*',
    dest: paths.dest.assets,
  },
}
