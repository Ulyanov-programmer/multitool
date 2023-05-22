import gulp from 'gulp'
import browsersync from 'browser-sync'
import imgToPicture from 'gulp-html-img-to-picture'
import versionNumber from 'gulp-version-number'
import posthtml from 'gulp-posthtml'
import easyBem from 'posthtml-easy-bem'
import component from 'posthtml-component'
import imgAutosize from 'posthtml-img-autosize'
import gulpIf from 'gulp-if'
import formatHTML from 'gulp-format-html'
import { htmlValidator } from 'gulp-w3c-html-validator'
import { paths } from './paths.js'
const isProd = process.argv.includes('--prod')

export default function html() {
  return gulp.src(paths.scr.html)
    .pipe(posthtml([
      // posthtml-component must be first!
      component({
        root: './src',
        folders: ['components'],
      }),
      easyBem(),
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

    .pipe(formatHTML())

    .pipe(gulpIf(isProd, htmlValidator.analyzer()))
    .pipe(gulpIf(isProd, htmlValidator.reporter()))

    .pipe(gulp.dest(paths.build.html))
    .pipe(browsersync.stream())
}