import fs from 'fs-extra'
import { kebabCase } from 'case-anything'
import chalk from 'chalk'
import { parseNumericWeightFromName, parseStyleFromName } from 'parse-font-name'
import paths from './paths.js'


export function fontsWriting() {
  // Checking the fonts style file is full.
  if (fs.readFileSync(paths.src.fontsFilePath).toString().replace(/\s/g, '').length > 0)
    return

  if (!filesIsCorrect(fs.readdirSync(paths.src.fontsFolder))) {
    console.log(chalk.green('No one font was found!'))
    return
  }


  console.log(chalk.green.bold(
    `Hey, i see that you have fonts, but i haven't connected them yet. Let me help you!`
  ))

  let fonts = []
  let currentFontName

  for (let fileName of fs.readdirSync(paths.src.fontsFolder)) {
    if (fileName == '.gitkeep') continue

    let
      fileNameNoExt = fileName.split('.')[0],
      fontName = fileName.split('-')[0],
      weight = parseNumericWeightFromName(fileName),
      style = parseStyleFromName(fileName),
      type

    if (fileNameNoExt.toLocaleLowerCase().includes('variablefont')) {
      type = 'woff2-variations'
      weight = '100 1000'
    } else {
      type = 'woff2'
    }

    setupFontFaceRule({
      type: type,
      fileNameNoExt: fileNameNoExt,
      weight: weight,
      style: style,
    })

    if (currentFontName != fileNameNoExt) {
      currentFontName = fileNameNoExt

      fonts.push({
        fontName: fileNameNoExt,
        weights: [weight],
        styles: [style],
      })
    }
    else {
      let indexOfCurrentFont = fonts.findIndex(item => item.fontName == fontName)
      fonts[indexOfCurrentFont].weights.push(weight)
      fonts[indexOfCurrentFont].styles.push(style)
    }
  }


  declareFontVariablesAndModifiers(fonts)

  console.log(chalk.green('Fonts have been successfully written, i continue...'))
}

function setupFontFaceRule({ type, fileNameNoExt, weight, style }) {
  let fontFaceRule = `@font-face {
  font-style: ${style};
  font-weight: ${weight};
  src: url("../fonts/${fileNameNoExt}.woff2") format("${type}");
  font-family: "${fileNameNoExt}";
  font-display: swap;
}
`

  fs.appendFileSync(paths.src.fontsFilePath, fontFaceRule)
}

function declareFontVariablesAndModifiers(fonts) {
  if (fonts.length <= 0) return

  let vars = [], modifiers = []

  for (let font of fonts) {
    // Transform from FontName to css-property (--font-name: 'FontName';)
    vars.push(`--${kebabCase(font.fontName)}: '${font.fontName}';\n\t`)

    for (let i = 0; i < font.weights.length; i++) {
      let modifierName = font.fontName
        + '-' + font.weights[i]
        + '-' + font.styles[i]

      if (font.weights[i] == '100 1000')
        modifierName = modifierName.replace('-' + font.weights[i], '')

      if (font.styles[i] == 'normal')
        modifierName = modifierName.replace('-' + font.styles[i], '')


      modifiers.push(`.${modifierName} {
\tfont-family: var(--${kebabCase(font.fontName)});
\tfont-weight: ${font.weights[i]};
\tfont-style: ${font.styles[i]};
}\n`)
    }
  }

  vars[vars.length - 1] = vars.at(-1).replace('\n\t', '')

  let variablesInRoot = `:root {
\t${vars.toString().replaceAll(',', '')}
}\n`


  fs.appendFileSync(paths.src.fontsFilePath, variablesInRoot)
  fs.appendFileSync(paths.src.fontsFilePath, modifiers.toString().replaceAll(',', ''))
}

function filesIsCorrect(fileNames) {
  if (!fileNames) return false

  if (fileNames.includes('.gitkeep')) {
    // ? removing the .gitkeep from fileNames.
    fileNames.splice(fileNames.indexOf('.gitkeep'), 1)
  }

  if (fileNames.length <= 0) return false

  return true
}