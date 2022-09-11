import { paths, gulp, browsersyncFunc, } from './gulp/importSources.js'

import html from './gulp/html.js'
import php from './gulp/php.js'
import css from './gulp/css.js'
import scripts from './gulp/scriptTask.js'
import scriptModules from './gulp/moduleTask.js'
import fonts, { fontsStyle } from './gulp/fonts.js'
import imagesOther, { imagesSvg, imagesPng, imagesJpg } from './gulp/images.js'
import recreate from './gulp/recreate.js'
import {
	setupSwiperCss, setupSwiperJs,
	setupValidateJs,
	setupInputMaskJs,
	setupTypedJs,
	setupAirDatePickerJs, setupAirDatePickerCss,
	setupPhotoSwipeJs, setupPhotoSwipeCss,
} from './gulp/importModules.js'

function watchFIles() {
	gulp.watch(paths.watch.html, { usePolling: true }, html)
	gulp.watch(paths.watch.php, php)
	gulp.watch([paths.watch.css, paths.watch.demoCss], { usePolling: true }, css)
	gulp.watch(paths.watch.scripts, scripts)
	gulp.watch(paths.watch.scriptModules, scriptModules)
	gulp.watch(paths.watch.imagesOther, imagesOther)
	gulp.watch(paths.watch.imagesPng, imagesPng)
	gulp.watch(paths.watch.imagesJpg, imagesJpg)
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
	html, css, fonts, scriptModules, scripts, php,
	imagesPng, imagesJpg, imagesSvg, imagesOther,
]


let build = gulp.series(recreate, importModuleTasks, gulp.parallel(mainTasks), fontsStyle)

let watch = gulp.parallel(build, watchFIles, browsersyncFunc)

gulp.task('build', build)
gulp.task('watch', watch)
gulp.task('default', watch)