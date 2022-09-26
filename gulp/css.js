import {
	sass, cleanCss, autoprefixer, rename, gulpIf, isProd, paths, gulp, browsersync, gulpChanged,
} from './importSources.js'

export default function css() {
	return gulp.src(paths.scr.css)
		.pipe(gulpChanged(paths.build.css, { extension: '.min.css' }))
		.pipe(sass())

		.pipe(
			gulpIf(isProd,
				autoprefixer({
					overrideBrowserslist: ['last 5 versions'],
					cascade: true,
				})
			)
		)
		.pipe(gulpIf(isProd, gulp.dest(paths.build.css)))

		//save cleaning and renaming new css files
		.pipe(gulpIf(isProd, cleanCss()))
		.pipe(rename({ extname: '.min.css' }))

		.pipe(gulp.dest(paths.build.css))
		.pipe(browsersync.stream())
}