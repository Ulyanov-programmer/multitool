import { fs, paths, gulp, } from './exportSources.js'

class ModuleObject {
	javaScriptFilePaths
	cssFilePaths

	constructor(javaScriptPaths, cssPaths) {
		if (javaScriptPaths) {
			for (let i = 0; i < javaScriptPaths.length; i++) {
				javaScriptPaths[i] = `node_modules/${javaScriptPaths[i]}`
			}
			this.javaScriptFilePaths = javaScriptPaths
		}

		if (cssPaths) {
			for (let i = 0; i < cssPaths.length; i++) {
				cssPaths[i] = `node_modules/${cssPaths[i]}`
			}
			this.cssFilePaths = cssPaths
		}
	}

	setupJs() {
		if (this.javaScriptFilePaths == undefined || fs.existsSync(this.javaScriptFilePaths[0]) == false) {
			return scriptLoadErrorFallback()
		}

		return scriptLoadReturnGulpStream(this.javaScriptFilePaths)
	}
	setupCss() {
		if (this.cssFilePaths == undefined || fs.existsSync(this.cssFilePaths[0]) == false) {
			return styleLoadErrorFallback()
		}

		return styleLoadReturnGulpStream(this.cssFilePaths)
	}
}

export let swiper = new ModuleObject(
	['swiper/swiper-bundle.min.js'],
	['swiper/swiper-bundle.min.css'],
)
export let justValidate = new ModuleObject(
	['just-validate/dist/just-validate.production.min.js'],
)
export let inputMask = new ModuleObject(
	['inputmask/dist/inputmask.min.js'],
)
export let typed = new ModuleObject(
	['typed.js/lib/typed.min.js']
)
export let airDatePicker = new ModuleObject(
	['air-datepicker/air-datepicker.js'],
	['air-datepicker/air-datepicker.css'],
)
export let photoSwipe = new ModuleObject(
	[
		'photoswipe/dist/photoswipe-lightbox.esm.min.js',
		'photoswipe/dist/photoswipe.esm.min.js'
	],
	['photoswipe/dist/photoswipe.css'],
)

function scriptLoadErrorFallback() {
	return gulp.src(paths.scr.scripts)
}
function styleLoadErrorFallback() {
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