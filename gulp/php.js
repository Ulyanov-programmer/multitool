import { paths, gulp, browsersync, } from './importSources.js'
export default function php() {
	return gulp.src(paths.scr.php)
		.pipe(gulp.dest(paths.build.php))
		.pipe(browsersync.stream())
}