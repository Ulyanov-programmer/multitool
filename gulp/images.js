import { $, isProd } from '../gulpfile.js'

import gulp from 'gulp'
import browsersync from 'browser-sync'
import { paths } from './paths.js'
import sharpOptimizeImages from 'gulp-sharp-optimize-images'

export default function images() {
  return gulp.src(paths.scr.images)
    .pipe(
      $.if(isProd == false,
        $.changed(paths.build.images, { extension: '.png' })
      )
    )
    .pipe(
      $.if(isProd == false,
        $.changed(paths.build.images, { extension: '.jpg' })
      )
    )

    .pipe(
      sharpOptimizeImages({
        png_to_webp: {
          quality: 80,
        },
        png_to_avif: {
          quality: 80,
        },
        png_to_png: {
          quality: 80,
          compressionLevel: 9,
        },
        jpg_to_webp: {
          quality: 80,
        },
        jpg_to_avif: {
          quality: 80,
        },
        jpg_to_jpg: {
          quality: 80,
          mozjpeg: true,
        },
      })
    )

    .pipe(gulp.dest(paths.build.images))
    .pipe(browsersync.stream())
}


export function imagesSvg() {
  return gulp.src(paths.scr.imagesSvg)
    .pipe(
      $.if(isProd, $.svgmin())
    )

    .pipe(gulp.dest(paths.build.images))
    .pipe(browsersync.stream())
}