import { $ } from '../gulpfile.js'

import gulp from 'gulp'
import autoprefixer from 'autoprefixer'
import browsersync from 'browser-sync'
import { paths, pathToEnvironmentStyleFile } from './paths.js'

let isEnvironmentFileChanged = false

export default function css() {
  return gulp.src(paths.src.css)
    .pipe(
      $.if(isEnvironmentFileChanged == false,
        $.changed(paths.build.css, { extension: '.css' })
      )
    )

    .pipe($.header(`@import "${pathToEnvironmentStyleFile}";`))

    .pipe($.postcss(
      [
        $.postcssImport(),
        $.postcssDiscardComments({
          remove: comment => {
            // ? Deletes all comments that contain @removeInDist.
            return comment.includes('@removeInDist')
          }
        }),
        autoprefixer(),
        $.postcssPresetEnv({
          stage: 4,
        }),
        $.postcssNested(),
        $.postcssSimpleVars(),
        $.postcssMediaMinmax(),
        $.postcssFunctions({
          functions: {
            pxToVw: (px, layoutWidth) => pxToVw(px, layoutWidth),
            bgImageMultiType: (url) => bgImageMultiType(url),
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

    .pipe($.rename({ extname: '.css', }))

    .pipe($.cssbeautify({
      // ? Two spaces.
      indent: '  ',
    }))

    .pipe(gulp.dest(paths.build.css))
    .pipe(browsersync.stream())
}

/** 
  Performs the function of processing .css files, 
  provided that the environment.pcss file has been changed.
  Guarantees the possibility of optimizing the processing of css files, excluding the environment file from getting into dist.
*/
export function environmentCss() {
  isEnvironmentFileChanged = true
  css()
  isEnvironmentFileChanged = false

  return gulp.src(paths.src.css)
}


function pxToVw(px, layoutWidth) {
  let pxNumber = px.replace('px', '')
  let layoutNumber = layoutWidth.replace('px', '')

  return `calc(${pxNumber} * 100vw / ${layoutNumber})`
}

function bgImageMultiType(url) {
  let webpUrl = url.replace('.jpg', '.webp')
  webpUrl = webpUrl.replace('.png', '.webp')
  let avifUrl = url.replace('.jpg', '.avif')
  avifUrl = avifUrl.replace('.png', '.avif')

  let newParams = `image-set(url(${url}) 1x, url(${webpUrl}) 1x, url(${avifUrl}) 1x)`

  return `${newParams}`
}