import { paths, gulp, browsersync, } from './exportSources.js'

export default function php() {
	return gulp.src(paths.scr.php, { since: gulp.lastRun(php) })
		.pipe(gulp.dest(paths.build.php))
		.pipe(browsersync.stream())
}