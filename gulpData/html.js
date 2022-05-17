import fileInclude from 'gulp-file-include';
import plumber from "gulp-plumber"
import imgToPicture from "gulp-html-img-to-picture"

export function html() {
	return gulp.src(paths.scr.html)
		.pipe(fileInclude())
		.pipe(plumber({
			errorHandler: function (err) {
				notify.onError({
					title: "HTML img to picture Error",
					message: "<%= error.message %>"
				})(err)
			}
		}))
		.pipe(
			global.if(global.isProd,
				(imgToPicture({
					sortBySize: false,
					sourceExtensions: [
						{ extension: 'webp', mimetype: 'image/webp', },
						{ extension: 'avif', mimetype: 'image/avif', },
					],
				}))
			)
		)
		.pipe(gulp.dest(paths.build.html))
		.pipe(browsersync.stream());
}