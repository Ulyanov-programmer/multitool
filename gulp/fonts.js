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
      let isVariable = fileNameNoExt.toLocaleLowerCase().includes('variablefont') ? true : false


      if (isVariable == false) {
        writeFontFaceInFile(fontName, 'woff2', fileNameNoExt, weight, style)
      }
      else {
        weight = '100 1000'
        writeFontFaceInFile(fontName, 'woff2-variations', fileNameNoExt, weight, style)
      }
      previousFontName = fileNameNoExt
    }
  })
}
function writeFontFaceInFile(fontName, type, fileNameNoExt, weight, style) {
  let fontFaceRule =
    [
      `@font-face {`,
      `  font-style: ${style};`,
      `  font-weight: ${weight};`,
      `  src: url("../../fonts/${fileNameNoExt}.woff2") format("${type}");`,
      `  font-family: "${fontName}";`,
      `  font-display: swap;`,
      `}`,
    ]

  fs.appendFileSync(fontsFIlePath, fontFaceRule.join('\r\n') + '\r\n')
}