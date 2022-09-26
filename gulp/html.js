import {
	plumber, imgToPicture, versionNumber, gulpIf, isProd, paths, gulp, browsersync, gulpChanged,
} from './importSources.js'

export default function html() {
	return gulp.src(paths.scr.html)
		// .pipe(gulpChanged(paths.build.html, { extension: '.html' }))
		.pipe(plumber({
			errorHandler: function (err) {
				notify.onError({
					title: 'HTML img to picture Error',
					message: '<%= error.message %>',
				})(err)
			}
		}))
		.pipe(
			gulpIf(isProd, imgToPicture({
				sortBySize: false,
				sourceExtensions: [
					{ extension: 'webp', mimetype: 'image/webp', },
					{ extension: 'avif', mimetype: 'image/avif', },
				],
			})
			)
		)
		.pipe(
			gulpIf(isProd, versionNumber({
				'value': '%DT%',
				'append': {
					'key': '_v',
					'cover': 0,
					'to': ['css', 'js']
				}
			})
			)
		)
		.pipe(gulp.dest(paths.build.html))
		.pipe(browsersync.stream())
}