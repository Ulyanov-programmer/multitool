import { $ } from '../gulpfile.js'

import gulp from 'gulp'
import fs from 'fs-extra'
import enquirer from 'enquirer'
import { kebabCase } from 'change-case'
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

export async function fontsStyle() {
  // Checking the fonts style file is full.
  if (fs.readFileSync(fontsFilePath).toString().replace(/\s/g, '').length > 0)
    return

  if (filesIsCorrect(fs.readdirSync(paths.src.fontsFolder)) == false) {
    console.log(chalk.green.bold('No one font was found!'))
    return
  }


  console.log(chalk.green.bold(
    `Hey, i see that you have fonts, but i haven't connected them yet. Let me help you!`
  ))

  let fonts = []
  let currentFontName

  for (let fileName of fs.readdirSync(paths.src.fontsFolder)) {
    if (fileName == '.gitkeep')
      continue

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

    if (currentFontName != userFontName) {
      currentFontName = userFontName

      fonts.push({
        userFontName: userFontName,
        weights: [weight],
        styles: [style],
      })
    } else {
      let indexOfCurrentFont = fonts.findIndex(item => item.userFontName == userFontName)
      fonts[indexOfCurrentFont].weights.push(weight)
      fonts[indexOfCurrentFont].styles.push(style)
    }
  }


  declareFontVariablesAndModifiers(fonts)
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
  src: url("../fonts/${fileNameNoExt}.woff2") format("${type}");
  font-family: "\${fontName}";
  font-display: swap;
}
`,

    footer: chalk.gray.italic(`Use tab to move, when you're done, press enter`)
  })

  fs.appendFileSync(fontsFilePath, enquirerResult.result)

  return enquirerResult.values.fontName
}

function declareFontVariablesAndModifiers(fonts) {
  if (fonts.length <= 0) return

  let vars = []
  let modifiers = []

  for (let font of fonts) {
    // Transform from FontName to css-property (--font-name: 'FontName';)
    vars.push(`--${kebabCase(font.userFontName)}: '${font.userFontName}';\n\t`)

    for (let i = 0; i < font.weights.length; i++) {
      let modifierName = font.userFontName + '-' + font.weights[i] + '-' + font.styles[i]

      if (font.weights[i] == '100 1000') {
        modifierName = modifierName.replace(`-${font.weights[i]}`, '')
      }
      if (font.styles[i] == 'normal') {
        modifierName = modifierName.replace(`-${font.styles[i]}`, '')
      }

      modifiers.push(`.${modifierName} {
\tfont-family: var(--${kebabCase(font.userFontName)});
\tfont-weight: ${font.weights[i]};
\tfont-style: ${font.styles[i]};
}\n`)

    }
  }

  vars[vars.length - 1] = vars.at(-1).replace('\n\t', '')

  let variablesInRoot = `:root {
\t${vars.toString().replaceAll(',', '')}
}\n`


  fs.appendFileSync(fontsFilePath, variablesInRoot)
  fs.appendFileSync(fontsFilePath, modifiers.toString().replaceAll(',', ''))
}

function filesIsCorrect(fileNames) {
  if (fileNames == undefined) {
    return false
  }

  if (fileNames.includes('.gitkeep')) {
    // ? removing the .gitkeep from fileNames.
    fileNames.splice(fileNames.indexOf('.gitkeep'), 1)
  }

  if (fileNames.length == 0) {
    return false
  }
}