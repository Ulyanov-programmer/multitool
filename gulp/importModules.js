import gulp from 'gulp'
import browsersync from 'browser-sync'
import { paths } from './paths.js'

export default function libs() {
  return gulp.src(paths.scr.libs)
    .pipe(gulp.dest(paths.build.libs))
    .pipe(browsersync.stream())
}