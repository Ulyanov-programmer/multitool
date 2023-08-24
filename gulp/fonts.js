import { $ } from '../gulpfile.js'

import gulp from 'gulp'
import fs from 'fs-extra'
import enquirer from 'enquirer'
import chalk from 'chalk'
import { parseNumericWeightFromName, parseStyleFromName } from 'parse-font-name'
import { fontsFilePath, paths } from './paths.js'

export default function fonts() {
  // ? woff2 files will just be copied.
  gulp.src(paths.src.fontsWoff)
    .pipe(gulp.dest(paths.build.fonts))

  return gulp.src(paths.src.fonts)
    .pipe($.changed(paths.build.fonts, { extension: '.woff2' }))

    .pipe($.ttf2woff2({
      ignoreExt: true,
    }))

    .pipe(gulp.dest(paths.build.fonts))
}

export function fontsStyle() {
  let fontsFileContent = fs.readFileSync(fontsFilePath).toString().replace(/\s/g, '')

  if (fontsFileContent.length > 0)
    return

  let userFontNames = []

  fs.readdir(paths.src.fontsFolder, async (err, fileNames) => {
    if (filesIsCorrect(fileNames) == false) {
      console.log('No one font was found!')
      return
    }

    console.log(
      chalk.green.bold(`Hey, i see that you have fonts, but i haven't connected them yet. Let me help you!`)
    )


    for (let fileName of fileNames) {
      let fileNameNoExt = fileName.split('.')[0]

      let fontName = fileName.split('-')[0]
      let weight = parseNumericWeightFromName(fileName)
      let style = parseStyleFromName(fileName)
      let isVariable = fileNameNoExt.toLocaleLowerCase().includes('variablefont')
      let type

      if (isVariable) {
        type = 'woff2-variations'
        weight = '100 1000'
      } else {
        type = 'woff2'
      }

      let userFontName = await setupFontFaceRule({
        filename: fileName,
        fontName: fontName,
        type: type,
        fileNameNoExt: fileNameNoExt,
        weight: weight,
        style: style,
      })

      userFontNames.push(userFontName)
    }

    declareFontVariables(userFontNames)
  })
}

async function setupFontFaceRule({ filename, fontName, type, fileNameNoExt, weight, style }) {
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

  return enquirerResult.values.fontName
}

function declareFontVariables(fontNames) {
  //? Removing duplicates
  fontNames = [...new Set(fontNames)]

  for (let i = 0; i < fontNames.length; i++) {
    // ? Transform from FontName to css-property (--font-name: 'FontName';)
    fontNames[i] = `--${toKebabCase(fontNames[i])}: '${fontNames[i]}';\n\t`

    if (i == fontNames.length - 1) {
      fontNames[i] = fontNames[i].replace('\n\t', '')
    }
  }

  let variablesInRoot = `:root {
  ${fontNames.toString().replaceAll(',', '')}
}`

  fs.appendFileSync(fontsFilePath, variablesInRoot)
}

function toKebabCase(string) {
  let kebab = string.replace(/[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) =>
      (ofs ? "-" : "") + $.toLowerCase()
  )

  return kebab
}

function filesIsCorrect(fileNames) {
  // ? removing the .gitkeep from fileNames.
  if (fileNames && fileNames.includes('.gitkeep')) {
    fileNames.splice(fileNames.indexOf('.gitkeep'), 1)

    if (fileNames.length == 0) {
      return false
    }
  }
  else {
    return false
  }
}