import gulp from 'gulp'
import browsersync from 'browser-sync'
import gulpChanged from 'gulp-changed'
import svgmin from 'gulp-svgmin'
import gulpIf from 'gulp-if'
import sharpOptimizeImages from 'gulp-sharp-optimize-images'
import { paths } from './paths.js'
const isProd = process.argv.includes('--prod')

export default function images() {
  return gulp.src(paths.scr.images)

    .pipe(gulpIf(isProd == false,
      gulpChanged(paths.build.images, { extension: '.png' }))
    )
    .pipe(gulpIf(isProd == false,
      gulpChanged(paths.build.images, { extension: '.jpg' }))
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
      gulpIf(isProd, svgmin())
    )

    .pipe(gulp.dest(paths.build.images))
    .pipe(browsersync.stream())
}