import fs from "fs"

const swiperMainJsFilePath = 'node_modules/swiper/swiper-bundle.min.js'
const swiperMainCssFilePath = 'node_modules/swiper/swiper-bundle.min.css'
const validateMainJsFilePath = 'node_modules/just-validate/dist/just-validate.production.min.js'

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


export function setupSwiperJs() {
	if (fs.existsSync(swiperMainJsFilePath) == false) {
		return scriptLoadErrorFallback()
	}

	let scripts = [swiperMainJsFilePath]

	return scriptLoadReturnGulpStream(scripts)
}
export function setupSwiperCss() {
	if (fs.existsSync(swiperMainCssFilePath) == false) {
		return styleLoadErrorFallback()
	}

	let css = [swiperMainCssFilePath]

	return styleLoadReturnGulpStream(css)
}


export function setupValidateJs() {
	if (fs.existsSync(validateMainJsFilePath) == false) {
		return scriptLoadErrorFallback()
	}

	let scripts = [validateMainJsFilePath]

	return scriptLoadReturnGulpStream(scripts)
}