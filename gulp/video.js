import gulp from 'gulp'
import browsersync from 'browser-sync'
import { paths } from './paths.js'

export default function video() {
  return gulp.src(paths.src.video, { since: gulp.lastRun(video) })
    .pipe(gulp.dest(paths.build.video))
    .pipe(browsersync.stream())
}