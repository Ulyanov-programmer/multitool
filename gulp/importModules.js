import { paths, gulp, browsersync } from './exportSources.js'

export default function libs() {
	return gulp.src(paths.scr.libs)
		.pipe(gulp.dest(paths.build.libs))
		.pipe(browsersync.stream())
}