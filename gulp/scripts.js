import { $, isProd } from '../gulpfile.js'

import gulp from 'gulp'
import browsersync from 'browser-sync'
import { paths } from './paths.js'

export function apiScripts() {
  return gulp.src(paths.src.apiScripts)
    .pipe($.esbuild({
      target: 'es2018',
    }))

    .pipe(
      $.changedInPlace({
        firstPass: true,
      })
    )

    .pipe(gulp.dest(paths.build.scripts))
    .pipe(browsersync.stream())
}
export function sourcesScripts() {
  return gulp.src(paths.src.sourcesScripts)
    .pipe(
      $.if(isProd,
        // If run with the --prod flag.
        $.esbuild({
          target: 'es2018',
          minify: true,
        }),
        // If run without the --prod flag.
        $.esbuild({
          target: 'es2018',
        })
      )
    )

    .pipe(
      $.changedInPlace({
        firstPass: true,
      })
    )

    .pipe(gulp.dest(paths.build.scripts))
    .pipe(browsersync.stream())
}

export function libs() {
  return gulp.src(paths.src.libs)
    .pipe(
      $.changed(paths.build.libs, { extension: '.css' })
    )

    .pipe(gulp.dest(paths.build.libs))
    .pipe(browsersync.stream())
}