import fs from 'fs-extra'
import { kebabCase } from 'case-anything'
import chalk from 'chalk'
import path from 'path'
import { parseNumericWeightFromName, parseStyleFromName } from 'parse-font-name'

/**
 * Creates `@font-face` rules based on the contents of the *fonts folder*.
 */
function init() {
  if (isFontsStyleFileFull()) {
    console.log(chalk.green('The font styles file is already filled in.'))
    return
  }
  if (!filesIsCorrect()) {
    console.log(chalk.green('No one font was found!'))
    return
  }

  fs.writeFileSync(globalThis.paths.sources.fontsFilePath, '')

  writeWelcomePhrase()


  let fonts = []
  let previousFontName

  for (let fileName of fs.readdirSync(globalThis.paths.sources.fontsFolder)) {
    if (fileName == '.gitkeep') continue

    let newFont = {
      fontName: fileName.split(/(-)|[.]/)[0],
      fileNamesNoExt: [path.parse(fileName).name],
      weights: [parseNumericWeightFromName(fileName)],
      styles: [parseStyleFromName(fileName)],
      type: null,
    }

    setFontType(newFont)

    if (previousFontName != newFont.fontName) {
      previousFontName = newFont.fontName

      fonts.push(newFont)
    }
    // If the current font is just another variation of the same
    else {
      let indexOfCurrentFont = fonts.findIndex(
        item => item.fontName == newFont.fontName
      )

      if (indexOfCurrentFont != -1) {
        fonts[indexOfCurrentFont].fileNamesNoExt =
          fonts[indexOfCurrentFont].fileNamesNoExt.concat(newFont.fileNamesNoExt)
        fonts[indexOfCurrentFont].weights =
          fonts[indexOfCurrentFont].weights.concat(newFont.weights)
        fonts[indexOfCurrentFont].styles =
          fonts[indexOfCurrentFont].styles.concat(newFont.styles)
      }
    }
  }

  for (let font of fonts) {
    writeFontFaceRule(font)
  }

  writeVariablesAndClasses(fonts)

  writeEndingPhrase()
}
init()

function writeFontFaceRule(font) {
  for (let i = 0; i < font.weights.length; i++) {
    fs.appendFileSync(
      globalThis.paths.sources.fontsFilePath,

      `@font-face {
  font-style: ${font.styles[i]};
  font-weight: ${font.weights[i]};
  src: url("../fonts/${font.fileNamesNoExt[i]}.woff2") format("${font.type}");
  font-family: "${font.fontName}";
  font-display: swap;
}
`)
  }
}

function writeVariablesAndClasses(fonts) {
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

  return fileNames?.length > 0
}

function isFontsStyleFileFull() {
  try {
    let sourceFontNames = fs
      .readdirSync(globalThis.paths.sources.fontsFolder)
      ?.map(font => path.parse(font).name)

    let fontsStyleFile = fs.readFileSync(globalThis.paths.sources.fontsFilePath, 'utf8')

    let filePathsFromFontFaces = fontsStyleFile
      .match(/url(.*.woff2)/g)
      ?.map(font => path.parse(font).name)

    return JSON.stringify(sourceFontNames) == JSON.stringify(filePathsFromFontFaces)
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

function setFontType(font) {
  let fontNameLowerCase = font.fileNamesNoExt[0].toLocaleLowerCase()

  if (fontNameLowerCase.includes('variablefont')) {
    font.type = 'woff2-variations'

    if (fontNameLowerCase.includes('wght')) {
      font.weights = ['100 1000']
    }
  }
  else {
    font.type = 'woff2'
  }
}
