import fs from 'fs-extra'
import { kebabCase } from 'case-anything'
import chalk from 'chalk'
import path from 'path'
import { parseNumericWeightFromName, parseStyleFromName } from 'parse-font-name'


export default function () {
  if (isFontsStyleFileFull()) {
    console.log(chalk.green('The font styles file is already filled in.'))
    return
  }

  if (!filesIsCorrect()) {
    console.log(chalk.green('No one font was found!'))
    return
  }

  writeWelcomePhrase()



  let fonts = []
  let currentFontName

  for (let fileName of fs.readdirSync(globalThis.paths.sources.fontsFolder)) {
    if (fileName == '.gitkeep') continue

    let
      fileNameNoExt = path.parse(fileName).name,
      fontName = fileName.split('-').at(0),
      weight = parseNumericWeightFromName(fileName),
      style = parseStyleFromName(fileName),
      type

    if (
      fileNameNoExt.toLocaleLowerCase().includes('variablefont') ||
      fileNameNoExt.toLocaleLowerCase().includes('wght')
    ) {
      type = 'woff2-variations'
      weight = '100 1000'
    }
    else {
      type = 'woff2'
    }

    setupFontFaceRule(type, fontName, fileNameNoExt, weight, style)


    if (currentFontName != fontName) {
      currentFontName = fontName

      fonts.push({
        fontName: fontName,
        weights: [weight],
        styles: [style],
      })
    }
    else {
      let indexOfCurrentFont = fonts.findIndex(item => item.fontName == fontName)

      if (indexOfCurrentFont != -1) {
        fonts[indexOfCurrentFont].weights.push(weight)
        fonts[indexOfCurrentFont].styles.push(style)
      }
    }
  }


  declareFontVariablesAndModifiers(fonts)

  writeEndingPhrase()
}



function setupFontFaceRule(type, fontName, fileNameNoExt, weight, style) {
  fs.appendFileSync(
    globalThis.paths.sources.fontsFilePath,

    `@font-face {
  font-style: ${style};
  font-weight: ${weight};
  src: url("../fonts/${fileNameNoExt}.woff2") format("${type}");
  font-family: "${fontName}";
  font-display: swap;
}
`)
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
  vars = vars.toString().replaceAll(',', '')
  modifiers = modifiers.toString().replaceAll(',', '')

  let variablesInRoot = `:root {
\t${vars}
}\n`


  fs.appendFileSync(globalThis.paths.sources.fontsFilePath,
    variablesInRoot + modifiers
  )
}

function filesIsCorrect() {
  let fileNames = fs.readdirSync(globalThis.paths.sources.fontsFolder)
    ?.filter(name => name != '.gitkeep')

  if (fileNames?.length <= 0)
    return false
  else
    return true
}

function isFontsStyleFileFull() {
  try {
    let fontsStyleFile = fs.readFileSync(globalThis.paths.sources.fontsFilePath, 'utf8')
    return fontsStyleFile.replace(/\s/g, '').length > 0
  }
  catch (error) {
    return true
  }
}

function writeWelcomePhrase() {
  console.log(chalk.green.bold(
    `Hey, i see that you have fonts, but i haven't connected them yet. Let me help you!`
  ))
}
function writeEndingPhrase() {
  console.log(chalk.green(
    'Fonts have been successfully written, i continue...'
  ))
}
