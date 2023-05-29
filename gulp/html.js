import { $, isProd } from '../gulpfile.js'

import gulp from 'gulp'
import browsersync from 'browser-sync'
import { htmlValidator } from 'gulp-w3c-html-validator'
import { paths } from './paths.js'

export default function html() {
  return gulp.src(paths.scr.html)
    .pipe($.posthtml([
      $.posthtmlComponent({
        root: './src',
        folders: ['components'],
      }),
      $.posthtmlEasyBem(),
      $.posthtmlImgAutosize({
        processEmptySize: true,
      })
    ], {}))

    .pipe(
      $.if(isProd, $.htmlImgToPicture({
        sortBySize: false,
        sourceExtensions: [
          { extension: 'webp', mimetype: 'image/webp', },
          { extension: 'avif', mimetype: 'image/avif', },
        ],
      })
      )
    )
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

    .pipe($.formatHtml())

    .pipe($.if(isProd, htmlValidator.analyzer()))
    .pipe($.if(isProd, htmlValidator.reporter()))

    .pipe(gulp.dest(paths.build.html))
    .pipe(browsersync.stream())
}