import fs from 'fs-extra'
import ttf2woff2 from 'gulp-ttf2woff2'
import { fontsFIlePath } from './paths.js'

export default function fonts() {
	return gulp.src(paths.scr.fonts)
		.pipe(ttf2woff2({
			ignoreExt: true,
		}))
		.pipe(gulp.dest(paths.build.fonts))
}

export function fontsStyle() {
	let file_content = fs.readFileSync(fontsFIlePath).toString().replace(/\s/g, '')

	if (file_content.length > 0)
		return

	fs.readdir(paths.build.fonts, (err, items) => {
		let previousFontName

		for (let item of items) {
			let fileNameNoExt = item.split('.')[0]

			if (previousFontName == fileNameNoExt) 
				return
			
			let fileNameLC = fileNameNoExt.toLowerCase()
			let fontWeightName = fileNameLC.replace('italic', '').split('-')[1]

			let fontName = fileNameNoExt.split('-')[0] ? fileNameNoExt.split('-')[0] : fileNameNoExt
			let weight = fontWeightName ? fontWeightName : fileNameNoExt
			let style = fileNameLC.includes('italic') ? 'italic' : 'normal'
			let type = fileNameLC.includes('variablefont') ? 'woff2-variations' : 'woff2'

			weight = parseFontWeight(weight)


			if (type !== 'woff2-variations') {
				writeFontFaceInFile(fontName, type, fileNameNoExt, weight, style)
			} else {
				for (let weight = 100; weight <= 900; weight += 100) {
					writeFontFaceInFile(fontName, type, fileNameNoExt, weight, style)
				}
			}
			previousFontName = fileNameNoExt
		}
	})
}
function parseFontWeight(filename) {
	switch (filename) {
		case 'thin':
			return 100
		case 'extralight':
			return 200
		case 'light':
			return 300
		case 'medium':
			return 500
		case 'semibold':
			return 600
		case 'bold':
			return 700
		case 'extrabold':
		case 'ultrabold':
			return 800
		case 'black':
		case 'heavy':
			return 900

		default:
			return 400
	}
}
function writeFontFaceInFile(fontName, type, fileNameNoExt, weight, style) {
	let fontFaceConnectString =
		[`@font-face`,
			`\tfont-family: '${fontName}'`,
			`\tfont-display: swap`,
			`\tsrc: url('../../fonts/${fileNameNoExt}.woff2') format('${type}')`,
			`\tfont-weight: ${weight}`,
			`\tfont-style: ${style}`]

	fs.appendFileSync(fontsFIlePath, fontFaceConnectString.join('\r\n') + '\r\n')
}