import fs from 'fs-extra'
import ttf2woff2 from 'gulp-ttf2woff2'
import gulp from 'gulp'
import { fontsFIlePath } from './paths.js'
import { paths } from './paths.js'
import { parseNumericWeightFromName, parseStyleFromName } from 'parse-font-name'

export default function fonts() {
  gulp.src(paths.scr.fontsWoff)
    .pipe(gulp.dest(paths.build.fonts))

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

  fs.readdir(paths.scr.fontsFolder, (err, fileNames) => {
    let previousFontName

    if (fileNames == undefined) {
      console.log('No font was found!')
      return
    }

    for (let fileName of fileNames) {
      let fileNameNoExt = fileName.split('.')[0]

      if (previousFontName == fileNameNoExt || fileName == '.gitkeep') {
        continue
      }

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