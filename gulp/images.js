import { squoosh, svgmin, gulpIf, isProd, paths, gulp, browsersync, } from './importSources.js'

export default function imagesOther() {
	return gulp.src(paths.scr.imagesOther)
		.pipe(
			// ? minify images into same format
			gulpIf(isProd, squoosh())
		)

		.pipe(gulp.dest(paths.build.images))
		.pipe(browsersync.stream())
}

export function imagesJpg() {
	return gulp.src(paths.scr.imagesJpg)
		.pipe(
			gulpIf(isProd, squoosh({
				mozjpeg: {},
				webp: {},
				avif: {},
			}))
		)

		.pipe(gulp.dest(paths.build.images))
		.pipe(browsersync.stream())
}

export function imagesPng() {
	return gulp.src(paths.scr.imagesPng)
		.pipe(
			gulpIf(isProd, squoosh({
				oxipng: {},
				webp: {},
				avif: {},
			}))
		)

		.pipe(gulp.dest(paths.build.images))
		.pipe(browsersync.stream())
}

export function imagesSvg() {
	return gulp.src(paths.scr.imagesSvg)
		.pipe(
			gulpIf(isProd, svgmin())
		)

		.pipe(gulp.dest(paths.build.images))
		.pipe(browsersync.stream())
}