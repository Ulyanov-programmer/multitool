import {
	sass, autoprefixer, gulpIf, isProd, paths, gulp, browsersync,
} from './exportSources.js'

export default function css() {
	return gulp.src(paths.scr.css)
		.pipe(sass())

		.pipe(
			gulpIf(isProd,
				autoprefixer({
					overrideBrowserslist: ['last 5 versions'],
					cascade: true,
				})
			)
		)

		.pipe(gulp.dest(paths.build.css))
		.pipe(browsersync.stream())
}