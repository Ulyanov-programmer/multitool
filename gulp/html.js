import {
	imgToPicture, versionNumber, gulpIf, isProd, paths, gulp, browsersync, ejs,
} from './exportSources.js'

export default function html() {
	return gulp.src(paths.scr.html)
		.pipe(ejs({}))

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