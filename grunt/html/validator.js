import paths from '../other/paths.js'

export default {
  all: {
    src: paths.dest.root + '*.html',
  },
  options: {
    force: true,
  }
}