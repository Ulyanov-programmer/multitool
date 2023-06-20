import { $, isProd } from '../gulpfile.js'

import gulp from 'gulp'
import browsersync from 'browser-sync'
import { paths } from './paths.js'

export default function scripts() {
  gulp.src(paths.src.scripts)
    .pipe(
      $.changed(paths.build.scripts, { extension: '.js' })
    )

    .pipe($.esbuild({
      target: 'es2018',
    }))

    .pipe(gulp.dest(paths.build.scripts))
    .pipe(browsersync.stream())

  return gulp.src(paths.src.scriptModules)
    .pipe(
      $.changed(paths.build.scriptModules, { extension: '.js' })
    )

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
    .pipe(gulp.dest(paths.build.scriptModules))
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