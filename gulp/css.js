import { $ } from '../gulpfile.js'

import gulp from 'gulp'
import autoprefixer from 'autoprefixer'
import browsersync from 'browser-sync'
import { paths, pathToEnvironmentStyleFile } from './paths.js'

export default function css() {
  return gulp.src(paths.scr.css)
    .pipe($.header(`@import "${pathToEnvironmentStyleFile}";`))

    .pipe($.postcss(
      [
        $.postcssImport(),
        autoprefixer(),
        $.postcssPresetEnv({
          stage: 4,
        }),
        $.postcssNested(),
        $.postcssSimpleVars(),
        $.postcssMediaMinmax(),
        $.postcssFunctions({
          functions: {
            pxToVw: (px, layoutWidth) => {
              let pxNumber = px.replace('px', '')
              let layoutNumber = layoutWidth.replace('px', '')

              return `calc(${pxNumber} * 100vw / ${layoutNumber})`
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
        $.postcssMixins(),
        $.postcssCustomMedia(),
        $.postcssPxremFunction(),
      ],
      {
        parser: false,
      }
    ))

    .pipe($.rename({
      extname: '.css',
    }))

    .pipe($.cssbeautify())

    .pipe(gulp.dest(paths.build.css))
    .pipe(browsersync.stream())
}