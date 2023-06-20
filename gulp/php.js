import gulp from 'gulp'
import browsersync from 'browser-sync'
import { paths } from './paths.js'

export default function php() {
  return gulp.src(paths.src.php, { since: gulp.lastRun(php) })
    .pipe(gulp.dest(paths.build.php))
    .pipe(browsersync.stream())
}