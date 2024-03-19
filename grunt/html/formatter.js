import paths from '../other/paths.js'

export let prettify = {
  options: {
    progress: true,
  },
  all: {
    expand: true,
    cwd: paths.dest.root,
    ext: '.html',
    src: ['*.html'],
    dest: paths.dest.root
  },
}
