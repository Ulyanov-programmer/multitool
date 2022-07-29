import { log } from "console"
import fs from "fs"

const swiperMainJsFilePath = 'node_modules/swiper/swiper-bundle.min.js'
const swiperMainCssFilePath = 'node_modules/swiper/swiper-bundle.min.css'
const validateMainJsFilePath = 'node_modules/just-validate/dist/just-validate.production.min.js'
const inputMaskMainJsFilePath = 'node_modules/inputmask/dist/inputmask.min.js'
const typedMainJsFilePath = 'node_modules/typed.js/lib/typed.min.js'
const airDatePickerMainJsFilePath = 'node_modules/air-datepicker/air-datepicker.js'
const airDatePickerMainCssFilePath = 'node_modules/air-datepicker/air-datepicker.css'



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


export function setupSwiperJs() {
	if (fs.existsSync(swiperMainJsFilePath) == false) {
		return scriptLoadErrorFallback(swiperMainJsFilePath)
	}

	let scripts = [swiperMainJsFilePath]

	return scriptLoadReturnGulpStream(scripts)
}
export function setupSwiperCss() {
	if (fs.existsSync(swiperMainCssFilePath) == false) {
		return styleLoadErrorFallback(swiperMainCssFilePath)
	}

	let css = [swiperMainCssFilePath]

	return styleLoadReturnGulpStream(css)
}


export function setupValidateJs() {
	if (fs.existsSync(validateMainJsFilePath) == false) {
		return scriptLoadErrorFallback(validateMainJsFilePath)
	}

	let scripts = [validateMainJsFilePath]

	return scriptLoadReturnGulpStream(scripts)
}


export function setupInputMaskJs() {
	if (fs.existsSync(inputMaskMainJsFilePath) == false) {
		return scriptLoadErrorFallback(inputMaskMainJsFilePath)
	}

	let scripts = [inputMaskMainJsFilePath]

	return scriptLoadReturnGulpStream(scripts)
}


export function setupTypedJs() {
	if (fs.existsSync(typedMainJsFilePath) == false) {
		return scriptLoadErrorFallback(typedMainJsFilePath)
	}

	let scripts = [typedMainJsFilePath]

	return scriptLoadReturnGulpStream(scripts)
}

export function setupAirDatePickerJs() {
	if (fs.existsSync(airDatePickerMainJsFilePath) == false) {
		return scriptLoadErrorFallback(airDatePickerMainJsFilePath)
	}

	let scripts = [airDatePickerMainJsFilePath]

	return scriptLoadReturnGulpStream(scripts)
}
export function setupAirDatePickerCss() {
	if (fs.existsSync(airDatePickerMainCssFilePath) == false) {
		return styleLoadErrorFallback(airDatePickerMainCssFilePath)
	}

	let css = [airDatePickerMainCssFilePath]

	return styleLoadReturnGulpStream(css)
}