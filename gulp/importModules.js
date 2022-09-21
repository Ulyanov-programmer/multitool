import { fs, paths, gulp, } from './importSources.js'
import { log } from 'console'

class ModuleObject {
	javaScriptFilePaths
	cssFilePaths

	constructor(javaScriptPaths, cssPaths) {
		this.javaScriptFilePaths = javaScriptPaths
		this.cssFilePaths = cssPaths
	}

	setupJs() {
		if (this.javaScriptFilePaths == undefined || fs.existsSync(this.javaScriptFilePaths[0]) == false) {
			return scriptLoadErrorFallback(this)
		}

		return scriptLoadReturnGulpStream(this.javaScriptFilePaths)
	}
	setupCss() {
		if (this.cssFilePaths == undefined || fs.existsSync(this.cssFilePaths[0]) == false) {
			return styleLoadErrorFallback(this)
		}

		return styleLoadReturnGulpStream(this.cssFilePaths)
	}
}

export let swiper = new ModuleObject(
	['node_modules/swiper/swiper-bundle.min.js'],
	['node_modules/swiper/swiper-bundle.min.css'],
)
export let justValidate = new ModuleObject(
	['node_modules/just-validate/dist/just-validate.production.min.js'],
)
export let inputMask = new ModuleObject(
	['node_modules/inputmask/dist/inputmask.min.js'],
)
export let typed = new ModuleObject(
	['node_modules/typed.js/lib/typed.min.js']
)
export let airDatePicker = new ModuleObject(
	['node_modules/air-datepicker/air-datepicker.js'],
	['node_modules/air-datepicker/air-datepicker.css'],
)
export let photoSwipe = new ModuleObject(
	[
		'node_modules/photoswipe/dist/photoswipe-lightbox.esm.min.js',
		'node_modules/photoswipe/dist/photoswipe.esm.min.js'
	],
	['node_modules/photoswipe/dist/photoswipe.css'],
)
export let sidebar = new ModuleObject(
	['node_modules/air-datepicker/air-datepicker.js'],
	['node_modules/air-datepicker/air-datepicker.css'],
)

function scriptLoadErrorFallback(fileName) {
	log(`Failed to download the file: ${fileName}`)

	return gulp.src(paths.scr.scripts)
}
function styleLoadErrorFallback(fileName) {
	log(`Failed to download the file: ${fileName}`)

	return gulp.src(paths.scr.css)
}
function scriptLoadReturnGulpStream(streamPaths) {
	return gulp.src(streamPaths)
		.pipe(gulp.dest(paths.build.scripts))
}
function styleLoadReturnGulpStream(streamPaths) {
	return gulp.src(streamPaths)
		.pipe(gulp.dest(paths.build.css))
}