export default function php() {
	return gulp.src(paths.scr.php)
		.pipe(gulp.dest(paths.build.php))
		.pipe(browsersync.stream())
}