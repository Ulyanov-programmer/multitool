import fs from 'fs-extra'
import replace from 'replace-in-file'
import { log } from 'console'
import enquirer from 'enquirer'
import chalk from 'chalk'

class ModuleObject {
  constructor(config = {}) {
    this.moduleName = null
    this.filesAndFolders = null
    this.htmlConnectStrings = null

    Object.assign(this, config)
  }
}
class VariableTemplate {
  constructor(config = {}) {
    this.fields = null
    this.message = null
    this.template = null
    this.snippetName = null
    this.variableFilePath = null

    Object.assign(this, config)
  }
}

const pathToProject = './',
  distFolderName = pathToProject + 'dist/',
  snippetsFolderName = pathToProject + 'snippets/',
  readmeFolder = pathToProject + 'readmeFiles/',
  sources = pathToProject + 'sources/',
  readmeFilePath = pathToProject + 'README.md',
  scriptsFolder = sources + 'scripts/',
  stylesFolder = sources + 'styles/',
  componentsFolder = sources + 'components/',
  assets = sources + 'assets/',
  environmentFilePath = stylesFolder + '_environment.pcss',
  baseStyleFile = stylesFolder + 'normalize.pcss',
  stateStyleFile = stylesFolder + 'thirdLevelRules.pcss',
  layoutHtmlFile = componentsFolder + 'layout.html',
  fontsGitkeep = sources + 'fonts/.gitkeep',
  indexPage = sources + 'index.html'


logSomeImportantInConsole(
  `Salute!
You will have to use some keys, such as: 
${chalk.greenBright('↑')} - focus up,
${chalk.greenBright('↓')} - focus down,
${chalk.greenBright('← →')} - choosing between elements on the same line,
${chalk.greenBright('space')} - to select an option,
${chalk.greenBright('⭾')} - tab, to move to a next element, for example, in templates.
`,
  chalk.green
)

await enquirer.toggle({
  message: chalk.italic('Any questions?'),
  enabled: chalk.magenta('Nope, i totally understand!'),
  disabled: chalk.magenta('Nope, i understand!'),
})


await includeModuleByQuestion(
  'Whether you want to save the plugin...',

  new ModuleObject({
    moduleName: 'Just Validate',
    filesAndFolders: assets + 'justValidate/',
    htmlConnectStrings: { strings: `justValidate=false` },
  }),
  new ModuleObject({
    moduleName: 'Slider Swiper',
    filesAndFolders: assets + 'swiper/',
    htmlConnectStrings: { strings: `swiper=false` },
  }),
  new ModuleObject({
    moduleName: 'Typed',
    filesAndFolders: assets + 'typed/',
    htmlConnectStrings: { strings: `typed=false` },
  }),
  new ModuleObject({
    moduleName: 'Input Mask',
    filesAndFolders: assets + 'inputmask.min.js',
  }),
  new ModuleObject({
    moduleName: 'Photo Swipe',
    filesAndFolders: assets + 'photoswipe/',
    htmlConnectStrings: { strings: `photoSwipe=false` },
  }),
  new ModuleObject({
    moduleName: 'No Ui Slider',
    filesAndFolders: assets + 'nouislider/',
    htmlConnectStrings: { strings: `noUiSlider=false` },
  })
)
await includeModuleByQuestion(
  'Whether you want to save the module...',

  new ModuleObject({
    moduleName: 'Scripts for dialog',
    filesAndFolders: [
      scriptsFolder + 'dialogs/',
      componentsFolder + 'modals.html',
    ],
    htmlConnectStrings: [
      { strings: `<x-modals></x-modals>`, },
      { strings: `dialogs=false` },
    ],
  }),
  new ModuleObject({
    moduleName: 'Tabs',
    filesAndFolders: scriptsFolder + 'tab/',
    htmlConnectStrings: [
      { strings: `tabs=false` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Parallax by mouse',
    filesAndFolders: scriptsFolder + 'mouseParallax/',
    htmlConnectStrings: [
      { strings: `mouseParallax=false` }
    ],
  }),
  new ModuleObject({
    moduleName: 'AutoScrollPadding',
    filesAndFolders: scriptsFolder + 'autoScrollPadding/',
    htmlConnectStrings: [
      { strings: `autoScrollPadding=false` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Tools for observer',
    filesAndFolders: scriptsFolder + 'observerTools/',
    htmlConnectStrings: [
      { strings: `observerTools=false` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Horizontal scroll by mouse wheel',
    filesAndFolders: scriptsFolder + 'horizontalMouseScroll.ts',
    htmlConnectStrings: [
      { strings: `horizontalMouseScroll=false` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Switching by swipe',
    filesAndFolders: scriptsFolder + 'toggleBySwipe/',
    htmlConnectStrings: [
      { strings: `toggleBySwipe=false` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Step By Step block',
    filesAndFolders: scriptsFolder + 'stepByStepBlock/',
    htmlConnectStrings: [
      { strings: `stepByStep=false` }
    ],
  }),
  new ModuleObject({
    moduleName: 'scroll-timeline polyfill',
    filesAndFolders: scriptsFolder + 'scroll-timeline.js',
    htmlConnectStrings: [
      { strings: `scrollTimeline=false` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Infinite auto-scroll',
    filesAndFolders: scriptsFolder + 'infiniteScroll/',
    htmlConnectStrings: [
      { strings: `infiniteScroll=false` }
    ],
  }),
)


logSomeImportantInConsole(
  `\nThe configuration of files and folders is complete.\n`,
  chalk.greenBright
)
logSomeImportantInConsole(
  `\nNow, i suggest you change the values of the main variables.\n`,
  chalk.magentaBright
)

await setVariables(
  new VariableTemplate({
    snippetName: 'htmlLayout',
    message: chalk.cyanBright('Fill in the fields in the html-layout.'),
    variableFilePath: layoutHtmlFile,
    fields: [
      { name: 'mainLangOfPages', initial: 'en' },
      { name: 'preloadedFontFilename', initial: 'none', },
    ],
    template:
      `// Set the main language of pages below.
  lang: '\${mainLangOfPages}',
  // Set a name for a preloaded font. Must be a file name without extension.
  preloadedFontName: '\${preloadedFontFilename}',`
  }),

  new VariableTemplate({
    snippetName: 'Title of index page',
    message: chalk.cyanBright('Title of index page...'),
    variableFilePath: indexPage,
    fields: [
      { name: 'title', initial: 'Unnamed Page' },
    ],
    template:
      `<x-layout title='\${title}'`
  }),

  new VariableTemplate({
    snippetName: 'stylesheetVariables',
    message: chalk.cyanBright(
      `Fill in some css variables (file - ${chalk.underline(baseStyleFile)}).`),
    variableFilePath: baseStyleFile,
    fields: [
      { name: 'mainFontName', initial: 'arial', },
      { name: 'mainTextColor', initial: 'black', },
      { name: 'backgroundColor', initial: 'white', },
    ],
    template:
      `--main-font-family: \${mainFontName};
--main-text-color: \${mainTextColor};
--background: \${backgroundColor};`
  }),

  new VariableTemplate({
    snippetName: 'stylesheetSassLikeVariables',
    message: chalk.cyanBright(
      'Fill in sass-like variables that are used in custom media. \n'
      + `(file - ${chalk.underline(environmentFilePath)})`),
    variableFilePath: environmentFilePath,
    fields: [
      { name: 'widthOfYourDesignLayout', initial: '1440', },
      { name: 'minimalWidthOfYourDesign', initial: '320', },
      { name: 'mainSize', initial: '16', },
      { name: 'minSize', initial: '12', },
    ],
    template:
      `@custom-media --is-large-layout (width > $layoutWidth);
@custom-media --is-layout-width (769px <= width <= $layoutWidth);
@custom-media --is-tablet (426px <= width <= 769px);
@custom-media --is-mobile (width <= 426px);

$layoutWidth: \${widthOfYourDesignLayout}px;
$minLayoutWidth: \${minimalWidthOfYourDesign}px;
$mainFontSize: \${mainSize}px;
$minFontSize: \${minSize}px;`
  }),

  new VariableTemplate({
    snippetName: 'some name',
    message: chalk.cyanBright(
      'Set the values of the paddings that are assigned using the .content_paddings class (used to center content in blocks)\n'
      + `(file - ${chalk.underline(stateStyleFile)}.`),
    variableFilePath: stateStyleFile,
    fields: [
      { name: 'largePaddings', initial: '15vw', },
    ],
    template:
      `
@media (--is-large-layout) {
  --content-inline-padding: \${largePaddings};
}`,
  }),

  new VariableTemplate({
    snippetName: 'some name 2',
    message: chalk.cyan('Layout width...'),
    variableFilePath: stateStyleFile,
    fields: [
      { name: 'defaultPaddings', initial: '10vw', },
    ],
    template:
      `
@media (--is-layout-width) {
  --content-inline-padding: \${defaultPaddings};
}`,
  }),

  new VariableTemplate({
    snippetName: 'some name 3',
    message: chalk.cyan('Tablets...'),
    variableFilePath: stateStyleFile,
    fields: [
      { name: 'tabletPaddings', initial: '5vw', },
    ],
    template:
      `
@media (--is-tablet) {
  --content-inline-padding: \${tabletPaddings};
}`,
  }),

  new VariableTemplate({
    snippetName: 'some name 4',
    message: chalk.cyan('Mobiles...'),
    variableFilePath: stateStyleFile,
    fields: [
      { name: 'mobilePaddings', initial: '2.5vw', },
    ],
    template:
      `
@media (--is-mobile) {
  --content-inline-padding: \${mobilePaddings};
}`,
  }),
)

deleteUnnecessaryFilesAndFolders()


writeCompletelyPhrase()


async function includeModuleByQuestion(title, ...moduleObjects) {
  let selectedModules = await enquirer.multiselect({
    name: 'value',
    message: chalk.magentaBright(title),
    limit: 5,
    choices: moduleObjects.map(module => {
      return {
        name: module.moduleName, value: module.moduleName,
      }
    }),

    footer: () => chalk.gray.italic('use ↑ and ↓ to switch, you can "scroll" this list')
  })


  for (let module of moduleObjects) {
    let confirmedModuleName = selectedModules.find(answer => answer == module.moduleName)

    if (confirmedModuleName) {
      replaceHtmlConnectionString(module.htmlConnectStrings, 'false', 'true')
      continue
    }

    if (!Array.isArray(module.filesAndFolders))
      module.filesAndFolders = new Array(module.filesAndFolders)

    for (let fileOrFolder of module.filesAndFolders) {
      fs.removeSync(fileOrFolder)
    }

    replaceHtmlConnectionString(module.htmlConnectStrings)
  }
}
async function setVariables(...variableTemplates) {
  for (let variableTemplate of variableTemplates) {
    let result = await enquirer.snippet({
      name: variableTemplate.snippetName,
      message: variableTemplate.message + '\n',
      required: true,
      fields: variableTemplate.fields,
      template: variableTemplate.template,

      footer: () => chalk.gray.italic("use tab to move, when you're done, press enter")
    })

    let formattedTemplate = replaceEnquirerTemplateValues(
      variableTemplate.template,
      variableTemplate.fields,
      result.values,
      true
    )
    let newTemplate = replaceEnquirerTemplateValues(
      variableTemplate.template,
      variableTemplate.fields,
      result.values
    )

    let templateStrings = formattedTemplate.split('\n')
    let newTemplateStrings = newTemplate.split('\n')

    for (let i = 0; i < templateStrings.length; i++) {
      await replace({
        files: variableTemplate.variableFilePath,
        from: templateStrings[i],
        to: newTemplateStrings[i],
      })
    }
  }
}

function deleteUnnecessaryFilesAndFolders() {
  deleteFolder(readmeFolder, 'The readme folder have been deleted.')
  deleteFolder(readmeFilePath)
  fs.createFileSync('README.md')

  log(chalk.gray.italic('✅ The readme file are clean.'))

  deleteFolder(distFolderName, 'Dist have been deleted.')
  deleteFolder(snippetsFolderName, 'Snippets have been deleted.')
  deleteFolder(fontsGitkeep, 'Gitkeep in fonts have been deleted.')
}

function replaceHtmlConnectionString(htmlConnectStrings, replacedValue, replacedNewValue) {
  if (!htmlConnectStrings) return

  if (!Array.isArray(htmlConnectStrings))
    htmlConnectStrings = new Array(htmlConnectStrings)

  for (let htmlConnectStringData of htmlConnectStrings) {
    if (!htmlConnectStringData.path)
      htmlConnectStringData.path = indexPage

    let newHtmlConnectString

    if (!replacedValue || !replacedNewValue) {
      newHtmlConnectString = ''
    } else {
      newHtmlConnectString = htmlConnectStringData.strings.replace(replacedValue, replacedNewValue)
    }

    replace.sync({
      files: htmlConnectStringData.path,
      from: htmlConnectStringData.strings, to: newHtmlConnectString,
    })
  }
}
function deleteFolder(folderPath, messageOnSuccessful) {
  try {
    fs.removeSync(folderPath)

    if (messageOnSuccessful)
      log(chalk.gray.italic('✅ ' + messageOnSuccessful))
  }
  catch (error) {
    log(chalk.red('❌ ' + error))
  }
}
function replaceEnquirerTemplateValues(template, fields, values, replaceNamesToDefaults) {
  let newTemplate = template

  if (replaceNamesToDefaults) {
    for (let field of fields) {
      newTemplate = newTemplate.replaceAll(
        '${' + field.name + '}',
        field.initial ?? ''
      )
    }
  }
  else {
    for (let field of fields) {
      newTemplate = newTemplate.replaceAll(
        '${' + field.name + '}',
        values[field.name] ?? field.initial
      )
    }
  }

  return newTemplate
}
function logSomeImportantInConsole(message, chalkColor) {
  log(chalkColor(message))
}

function writeCompletelyPhrase() {
  let
    topPhrase = 'The setup is completely complete!',
    middlePhrase = 'I wish You a successful job.',
    bottomPhrase = '🎆🎆🎆',

    positionOfTop = Math.round(process.stdout.columns / 2) - Math.round(topPhrase.length / 2),
    positionOfMiddle = Math.round(process.stdout.columns / 2) - Math.round(middlePhrase.length / 2),
    positionOfBottom = Math.round(process.stdout.columns / 2) - Math.round(bottomPhrase.length / 2)

  topPhrase = ' '.repeat(positionOfTop) + topPhrase
  middlePhrase = ' '.repeat(positionOfMiddle) + middlePhrase
  bottomPhrase = ' '.repeat(positionOfBottom) + bottomPhrase

  logSomeImportantInConsole(
    '\n'
    + topPhrase + '\n'
    + middlePhrase + '\n'
    + bottomPhrase + '\n'

    , chalk.greenBright
  )

  // An empty line to correct one error in the visualization
  console.log('')
}