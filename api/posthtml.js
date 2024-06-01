import component from 'posthtml-component'
import imgAutosize from 'posthtml-img-autosize'
import { PostHtml } from '../plugins/posthtml.js'
import paths from '../grunt/other/paths.js'

export const posthtmlConfig = new PostHtml({
  paths: {
    src: paths.src.root + '*.html',
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