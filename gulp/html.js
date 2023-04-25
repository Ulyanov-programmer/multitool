import gulp from 'gulp'
import browsersync from 'browser-sync'
import imgToPicture from 'gulp-html-img-to-picture'
import versionNumber from 'gulp-version-number'
import posthtml from 'gulp-posthtml'
import easyBem from 'posthtml-easy-bem'
import component from 'posthtml-component'
import beautify from 'posthtml-beautify'
import imgAutosize from 'posthtml-img-autosize'
import gulpIf from 'gulp-if'
import { paths } from './paths.js'
const isProd = process.argv.includes('--prod')

export default function html() {
  return gulp.src(paths.scr.html)
    .pipe(posthtml([
      easyBem(),
      component({
        root: './src',
        folders: ['components'],
      }),
      beautify({
        rules: {
          blankLines: false,
          sortAttr: true,
        }
      }),
      imgAutosize({
        processEmptySize: true,
      })
    ], {}))

    .pipe(
      gulpIf(isProd, imgToPicture({
        sortBySize: false,
        sourceExtensions: [
          { extension: 'webp', mimetype: 'image/webp', },
          { extension: 'avif', mimetype: 'image/avif', },
        ],
      })
      )
    )
    .pipe(
      gulpIf(isProd, versionNumber({
        'value': '%DT%',
        'append': {
          'key': '_v',
          'cover': 0,
          'to': ['css', 'js']
        }
      })
      )
    )

    .pipe(gulp.dest(paths.build.html))
    .pipe(browsersync.stream())
}