import paths from '../grunt/other/paths.js'
import { Beautify } from '../plugins/beautify.js'

export const beautifyHtmlConfig = new Beautify({
  paths: {
    src: paths.dest.root + '*.html',
    dest: paths.dest.root,
  },
  options: {
    indent_size: 2,
  },
  beautifyPlugin: 'html',
})

export const beautifyCssConfig = new Beautify({
  paths: {
    src: paths.dest.styles + '*.css',
    dest: paths.dest.styles,
  },
  options: {
    indent_size: 2,
  },
  beautifyPlugin: 'css',
})