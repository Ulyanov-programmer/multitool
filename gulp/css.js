import {
	sass, cleanCss, autoprefixer, rename, gulpIf, isProd, paths, gulp, browsersync, cache,
} from './exportSources.js'

export default function css() {
	return gulp.src(paths.scr.css)
		.pipe(cache(sass()), {
			name: 'css'
		}).on('error', (err) => {
			console.log(err.toString())
			this.emit('end')
		})

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