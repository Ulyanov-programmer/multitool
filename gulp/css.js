import {
	sass, cleanCss, autoprefixer, rename, header, gulpIf, isProd, paths, gulp, browsersync,
} from './importSources.js'

export default function css() {
	return gulp.src(paths.scr.css)
		.pipe(header(`$addPathsToConvertedBgImages: ${global.isProd}\n`))
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