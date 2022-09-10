import squoosh from 'gulp-libsquoosh'
import path from 'path'
import svgmin from 'gulp-svgmin'

export default function imagesOther() {
	return gulp.src(paths.scr.imagesOther)
		.pipe(
			// ? minify images into same format
			global.if(global.isProd, squoosh())
		)

		.pipe(gulp.dest(paths.build.images))
		.pipe(browsersync.stream())
}

export function imagesJpg() {
	return gulp.src(paths.scr.imagesJpg)
		.pipe(
			global.if(global.isProd, squoosh({
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
			global.if(global.isProd, squoosh({
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
			global.if(global.isProd, svgmin())
		)

		.pipe(gulp.dest(paths.build.images))
		.pipe(browsersync.stream())
}