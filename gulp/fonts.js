import { fs, parseNumericWeightFromName, parseStyleFromName, ttf2woff2, fontsFIlePath, paths, gulp, } from './importSources.js'

export default function fonts() {
	return gulp.src(paths.scr.fonts)
		.pipe(ttf2woff2({
			ignoreExt: true,
		}))
		.pipe(gulp.dest(paths.build.fonts))
}

export function fontsStyle() {
	let fontsFileContent = fs.readFileSync(fontsFIlePath).toString().replace(/\s/g, '')

	if (fontsFileContent.length > 0)
		return

	fs.readdir(paths.build.fonts, (err, fileNames) => {
		let previousFontName

		if (fileNames == undefined)
			return

		for (let fileName of fileNames) {
			let fileNameNoExt = fileName.split('.')[0]

			if (previousFontName == fileNameNoExt)
				return

			let fontName = fileName.split('-')[0]
			let weight = parseNumericWeightFromName(fileName)
			let style = parseStyleFromName(fileName)
			let type = fileName.includes('variablefont') ? 'woff2-variations' : 'woff2'


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