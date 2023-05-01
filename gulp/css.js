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
import simpleVariables from 'postcss-simple-vars'
import customMedia from 'postcss-custom-media'
import browsersync from 'browser-sync'
import rename from 'gulp-rename'
import beautify from 'gulp-cssbeautify'
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
        nested(),
        simpleVariables(),
        mediaRangeSyntax(),
        functions({
          functions: {
            pxToVw: (px, layoutWidth) => {
              let pxNumber = px.replace('px', '')
              let layoutNumber = layoutWidth.replace('px', '')

              return `${pxNumber} * 100vw / ${layoutNumber}`
            },
          }
        }),
        mixins(),
        customMedia(),
        pxRem(),
      ],
      {
        parser: false,
        map: false,
      }
    ))
    .pipe(rename({
      extname: '.css',
    }))
    .pipe(beautify())

    .pipe(gulp.dest(paths.build.css))
    .pipe(browsersync.stream())
}