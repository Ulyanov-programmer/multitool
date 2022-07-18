import squoosh from 'gulp-libsquoosh';
import path from 'path';
import svgmin from 'gulp-svgmin';

export function images() {
	return gulp.src(paths.scr.images)
		.pipe(
			global.if(global.isProd,
				squoosh((src) => {
					let extname = path.extname(src.path)

					let options = { encodeOptions: squoosh.DefaultEncodeOptions[extname], }

					switch (extname) {
						case '.jpg':
							options = {
								encodeOptions: {
									mozjpeg: {},
									avif: {},
									webp: {},
								},
							}
							break
						case '.png':
							options = {
								encodeOptions: {
									oxipng: {},
									avif: {},
									webp: {},
								},
							}
							break
						default:
							break
					}

					return options
				}),
			)
		)

		.pipe(gulp.dest(paths.build.images))
		.pipe(browsersync.stream());
}

export function imagesSvg() {
	return gulp.src(paths.scr.imagesSvg)
		.pipe(
			global.if(global.isProd, svgmin())
		)

		.pipe(gulp.dest(paths.build.images))
		.pipe(browsersync.stream());
}