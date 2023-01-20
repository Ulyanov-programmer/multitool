import gulp from 'gulp'
import browsersync from 'browser-sync'
import gulpChanged from 'gulp-changed'
import svgmin from 'gulp-svgmin'
import gulpIf from 'gulp-if'
import sharpOptimizeImages from 'gulp-sharp-optimize-images'
import { paths } from './paths.js'
const isProd = process.argv.includes('--prod')

export default function imagesOther() {
	return gulp.src(paths.scr.imagesOther)
		.pipe(
			// ? minify images into same format
			sharpOptimizeImages({
				webp: {
					quality: 100,
					lossless: false,
				},
				avif: {
					quality: 100,
				}
			})
		)

		.pipe(gulp.dest(paths.build.images))
		.pipe(browsersync.stream())
}

export function imagesJpg() {
	return gulp.src(paths.scr.imagesJpg)
		.pipe(gulpIf(isProd == false,
			gulpChanged(paths.build.images, { extension: '.jpg' }))
		)
		.pipe(gulpIf(isProd,
			gulpChanged(paths.build.images, { extension: '.webp' }))
		)
		.pipe(gulpIf(isProd,
			gulpChanged(paths.build.images, { extension: '.avif' }))
		)

		.pipe(
			sharpOptimizeImages({
				jpg: {
					quality: 100,
					lossless: false,
					mozjpeg: true,
				},
				webp: {
					quality: 100,
					lossless: false,
				},
				avif: {
					quality: 100,
					effort: 4,
				}
			})
		)

		.pipe(gulp.dest(paths.build.images))
		.pipe(browsersync.stream())
}

export function imagesPng() {
	return gulp.src(paths.scr.imagesPng)
		.pipe(gulpIf(isProd == false,
			gulpChanged(paths.build.images, { extension: '.png' }))
		)
		.pipe(gulpIf(isProd,
			gulpChanged(paths.build.images, { extension: '.webp' }))
		)
		.pipe(gulpIf(isProd,
			gulpChanged(paths.build.images, { extension: '.avif' }))
		)

		.pipe(
			sharpOptimizeImages({
				png: {
					quality: 100,
					lossless: false,
				},
				webp: {
					quality: 100,
					lossless: false,
				},
				avif: {
					quality: 100,
				}
			})
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