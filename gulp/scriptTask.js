import gulp from 'gulp'
import browsersync from 'browser-sync'
import esbuild from 'gulp-esbuild'
import { paths } from './paths.js'

export default function scripts() {
  return gulp.src(paths.scr.scripts, { since: gulp.lastRun(scripts) })
    .pipe(esbuild({
      target: 'es2018',
    }))

    .pipe(gulp.dest(paths.build.scripts))
    .pipe(browsersync.stream())
}