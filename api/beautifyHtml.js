import paths from '../grunt/other/paths.js'
import { BeautifyHtml } from '../plugins/beautifyHtml.js'

export const beautifyHtmlConfig = new BeautifyHtml({
  paths: {
    src: paths.dest.root + '*.html',
    dest: paths.dest.root,
  },
  options: {
    indent_size: 2,
  },
})