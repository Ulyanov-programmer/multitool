import gulp from 'gulp'
import gulpStylus from 'gulp-stylus'
import postcss from 'gulp-postcss'
import browsersync from 'browser-sync'
import { paths } from './paths.js'

export default function css() {
  return gulp.src(paths.scr.css)
    .pipe(gulpStylus())
    .pipe(postcss())

    .pipe(gulp.dest(paths.build.css))
    .pipe(browsersync.stream())
}