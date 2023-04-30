import gulp from 'gulp'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import presetEnv from 'postcss-preset-env'
import pxRem from 'postcss-pxrem-function'
import mediaRangeSyntax from 'postcss-media-minmax'
import nested from 'postcss-nested'
import mixins from 'postcss-mixins'
import importPcss from 'postcss-import'
import functions from 'postcss-functions'
import browsersync from 'browser-sync'
import rename from 'gulp-rename'
import { paths } from './paths.js'

export default function css() {
  return gulp.src(paths.scr.css)
    .pipe(postcss(
      [
        importPcss(),
        autoprefixer({}),
        presetEnv({
          stage: 4,
        }),
        pxRem(),
        nested(),
        mediaRangeSyntax(),
        mixins(),
        functions({
          functions: {
            pxToVw: (px) => {
              const layoutWidthVariable = 'var(--layoutWidth)'

              return `${px} * 100vw / ${layoutWidthVariable}`
            },
          }
        }),
      ],
      {
        parser: false,
        map: false,
      }
    ))
    .pipe(rename({
      extname: '.css',
    }))

    .pipe(gulp.dest(paths.build.css))
    .pipe(browsersync.stream())
}