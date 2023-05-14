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
import header from 'gulp-header'
import { paths } from './paths.js'
import nodePath from 'path'

const pathToEnvironmentStyleFile = getEnvironmentStyleFilePath()

export default function css() {
  return gulp.src(paths.scr.css)
    .pipe(header(`@import "${pathToEnvironmentStyleFile}";`))

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
            bgImageMultiType: (url) => {
              let webpUrl = url.replace('.jpg', '.webp')
              webpUrl = webpUrl.replace('.png', '.webp')
              let avifUrl = url.replace('.jpg', '.avif')
              avifUrl = avifUrl.replace('.png', '.avif')

              let newParams = `image-set(url(${url}) 1x, url(${webpUrl}) 1x, url(${avifUrl}) 1x)`

              return `${newParams}`
            },
          }
        }),
        mixins(),
        customMedia(),
        pxRem(),
      ],
      {
        parser: false,
      }
    ))

    .pipe(rename({
      extname: '.css',
    }))

    .pipe(beautify())

    .pipe(gulp.dest(paths.build.css))
    .pipe(browsersync.stream())
}

function getEnvironmentStyleFilePath() {
  let path = nodePath.resolve('./src/styles/_environment.pcss')

  return path
}