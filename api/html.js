import component from 'posthtml-component'
import imgAutosize from 'posthtml-img-autosize'
import htmlProcess from '../tasks/html.js'
import paths from '../grunt/other/paths.js'

export default async function htmlTask(path) {
  return await htmlProcess({
    paths: {
      src: path ? path : paths.src.root + '*.html',
      dest: paths.dest.root,
    },
    plugins: [
      component({
        root: paths.src.root,
        folders: ['components'],
      }),
      imgAutosize({
        root: paths.dest.root,
        processEmptySize: true,
      }),
    ],
  })
}