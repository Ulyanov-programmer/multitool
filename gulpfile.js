await import('gulp').then(val =>
	global.gulp = val.default)
await import('gulp-if').then(val =>
	global.if = val.default)
let paths = await import('./gulp/paths.js').then(val =>
	global.paths = val.paths)

global.browsersync = await import('browser-sync')
global.isProd = process.argv.includes('--prod')


import html from './gulp/html.js'
import php from './gulp/php.js'
import css from './gulp/css.js'
import scripts from './gulp/scriptTask.js'
import scriptModules from './gulp/moduleTask.js'
import fonts, { fontsStyle } from './gulp/fonts.js'
import images, { imagesSvg } from './gulp/images.js'
import {
	setupSwiperCss, setupSwiperJs,
	setupValidateJs,
	setupInputMaskJs,
	setupTypedJs,
	setupAirDatePickerJs, setupAirDatePickerCss,
	setupPhotoSwipeJs, setupPhotoSwipeCss,
} from './gulp/importModules.js'
import recreate from './gulp/recreate.js'
import browserSyncFunc from './gulp/browserSync.js'


function watchFIles() {
	gulp.watch(paths.watch.html, html)
	gulp.watch(paths.watch.php, php)
	gulp.watch([paths.watch.css, paths.watch.demoCss], css)
	gulp.watch(paths.watch.scripts, scripts)
	gulp.watch(paths.watch.scriptModules, scriptModules)
	gulp.watch(paths.watch.images, images)
	gulp.watch(paths.watch.imagesSvg, imagesSvg)
}


let importModuleTasks = [
	// setupSwiperCss, setupSwiperJs,
	// setupValidateJs,
	// setupInputMaskJs,
	// setupTypedJs,
	// setupAirDatePickerJs, setupAirDatePickerCss,
	// setupPhotoSwipeJs, setupPhotoSwipeCss,
]
const mainTasks = [
	html, css, fonts, scriptModules, scripts, php, images, imagesSvg,
]


let build = gulp.series(recreate, importModuleTasks, gulp.parallel(mainTasks), fontsStyle)

let watch = gulp.parallel(build, watchFIles, browserSyncFunc)

gulp.task('build', build)
gulp.task('watch', watch)
gulp.task('default', watch)