import gulp from 'gulp'
import browsersync from 'browser-sync'
import ejs from 'gulp-ejs'
import imgToPicture from 'gulp-html-img-to-picture'
import versionNumber from 'gulp-version-number'
import gulpIf from 'gulp-if'
import { paths } from './paths.js'
const isProd = process.argv.includes('--prod')

export default function html() {
  return gulp.src(paths.scr.html)
    .pipe(ejs({}))

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