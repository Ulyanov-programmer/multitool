import {
	gulpStylus, paths, gulp, browsersync, postcss,
} from './exportSources.js'

export default function css() {
	return gulp.src(paths.scr.css)
		.pipe(gulpStylus())
		.pipe(postcss())

		.pipe(gulp.dest(paths.build.css))
		.pipe(browsersync.stream())
}