import paths from '../other/paths.js'

export let cssmin = {
  main: {
    options: {
      format: 'beautify',
      level: 0,
    },
    files: [{
      expand: true,

      cwd: paths.dest.styles,
      src: '*.css',
      dest: paths.dest.styles,
      ext: '.css',
    }]
  },
  scripts: {
    options: {
      format: 'beautify',
      level: 0,
    },
    files: [{
      expand: true,

      cwd: paths.dest.scripts,
      src: '**/*.css',
      dest: paths.dest.scripts,
      ext: '.css',
    }]
  }
}

