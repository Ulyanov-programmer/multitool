import gulp from 'gulp'
import browsersync from 'browser-sync'
import { paths } from './paths.js'

export default function other() {
  return gulp.src(paths.src.other, { since: gulp.lastRun(other) })
    .pipe(gulp.dest(paths.build.other))
    .pipe(browsersync.stream())
}