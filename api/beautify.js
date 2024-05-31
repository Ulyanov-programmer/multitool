import paths from '../grunt/other/paths.js'
import beautifyProcess from '../tasks/beautifyHtml.js'

export default function beautifyHtmlTask(path) {
  return beautifyProcess({
    paths: {
      src: path ? path : paths.dest.root + '*.html',
      dest: paths.dest.root,
    },
    options: {
      indent_size: 2,
    },
  })
}