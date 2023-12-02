import paths from '../other/paths.js'

export default {
  options: {
    indent: 2,
    // 'preserve-newlines': false,
    'wrap-attributes': 'force-aligned',
  },
  all: {
    expand: true,

    cwd: paths.dest.root,
    src: '*.html',
    dest: paths.dest.root,
    ext: '.html',
  },
}
