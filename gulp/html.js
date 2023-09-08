import { $, isProd } from '../gulpfile.js'

import gulp from 'gulp'
import browsersync from 'browser-sync'
import imgToPicture from 'gulp_img_transform_to_picture'
import { htmlValidator } from 'gulp-w3c-html-validator'
import { paths } from './paths.js'

export default function html() {
  return gulp.src(paths.src.html)
    .pipe($.posthtml([
      $.posthtmlComponent({
        root: './src',
        folders: ['components'],
      }),
      $.posthtmlImgAutosize({
        processEmptySize: true,
      }),
      $.posthtmlBeautify({
        rules: {
          indent: 2,
          blankLines: false,
          eof: '<!-- Made in Russia, with ❤, by Ivan Ulyanov. -->',
          sortAttr: true,
        }
      }),
    ], {}))

    .pipe(imgToPicture({}))

    .pipe(
      $.if(isProd, $.versionNumber({
        'value': '%DT%',
        'append': {
          'key': '_v',
          'cover': 0,
          'to': ['css', 'js']
        }
      })
      )
    )

    .pipe(
      $.changedInPlace({
        firstPass: true,
      })
    )

    .pipe($.if(isProd, htmlValidator.analyzer()))
    .pipe($.if(isProd, htmlValidator.reporter()))

    .pipe(gulp.dest(paths.build.html))
    .pipe(browsersync.stream())
}