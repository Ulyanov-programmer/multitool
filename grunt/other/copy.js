import paths from './paths.js'

export let copy = {
  main: {
    expand: true,

    cwd: paths.src.assets,
    src: '**/*',
    dest: paths.dest.assets,
  },
}
