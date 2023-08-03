import gulp from 'gulp'
import ttf2woff2 from 'gulp-ttf2woff2'
import changed from 'gulp-changed'
import fs from 'fs-extra'
import enquirer from 'enquirer'
import chalk from 'chalk'
import { parseNumericWeightFromName, parseStyleFromName } from 'parse-font-name'
import { fontsFilePath, paths } from './paths.js'

export default function fonts() {
  // woff2 files will just be copied.
  gulp.src(paths.src.fontsWoff)
    .pipe(gulp.dest(paths.build.fonts))

  return gulp.src(paths.src.fonts)
    .pipe(changed(paths.build.fonts, { extension: '.woff2' }))

    .pipe(ttf2woff2({
      ignoreExt: true,
    }))

    .pipe(gulp.dest(paths.build.fonts))
}

export function fontsStyle() {
  let fontsFileContent = fs.readFileSync(fontsFilePath).toString().replace(/\s/g, '')

  if (fontsFileContent.length > 0)
    return

  fs.readdir(paths.src.fontsFolder, async (err, fileNames) => {
    if (fileNames == undefined) {
      console.log('No one font was found!')
      return
    }

    let previousFontName
    // removing the .gitkeep from fileNames.
    if (fileNames.includes('.gitkeep')) {
      fileNames.splice(fileNames.indexOf('.gitkeep'), 1)
    }

    if (fileNames.length == 0) {
      console.log('No one font was found!')
      return
    } else {
      console.log(
        chalk.green.bold(`Hey, i see that you have fonts, but i haven't connected them yet. Let me help you!`)
      )
    }


    for (let fileName of fileNames) {
      let fileNameNoExt = fileName.split('.')[0]

      if (previousFontName == fileNameNoExt) {
        continue
      }

      let fontName = fileName.split('-')[0]
      let weight = parseNumericWeightFromName(fileName)
      let style = parseStyleFromName(fileName)
      let isVariable = fileNameNoExt.toLocaleLowerCase().includes('variablefont')


      if (isVariable == false) {
        await setupFontFaceRule(fileName, fontName, 'woff2', fileNameNoExt, weight, style)
      }
      else {
        weight = '100 1000'
        await setupFontFaceRule(fileName, fontName, 'woff2-variations', fileNameNoExt, weight, style)
      }
      previousFontName = fileNameNoExt
    }
  })
}
async function setupFontFaceRule(filename, fontName, type, fileNameNoExt, weight, style) {
  let enquirerResult = await enquirer.snippet({
    name: `${fontName}-snippet`,
    message: `Set-up for ${filename}...`,
    required: true,
    fields: [
      { name: 'style', initial: style },
      { name: 'fontWeight', initial: weight.toString() },
      { name: 'fontName', initial: fontName },
    ],
    template: `/* ${filename} */
@font-face {
  font-style: \${style};
  font-weight: \${fontWeight};
  src: url("../../fonts/${fileNameNoExt}.woff2") format("${type}");
  font-family: "\${fontName}";
  font-display: swap;
}
`,

    footer: () => chalk.gray.italic(`Use tab to move, when you're done, press enter`)
  })

  fs.appendFileSync(fontsFilePath, enquirerResult.result)
}