import fs from 'fs-extra'
import replace from 'replace-in-file'
import { log } from 'console'
import enquirer from 'enquirer'
import chalk from 'chalk'
import { paths } from './paths.js'



class ModuleObject {
  constructor(config) {
    this.moduleName = config.moduleName

    this.filesAndFolders = config.filesAndFolders instanceof Array
      ? config.filesAndFolders
      : [config.filesAndFolders]

    this.htmlConnectStrings = config.htmlConnectStrings
  }

  deleteFilesAndFolders() {
    for (let fileOrFolder of this.filesAndFolders) {
      fs.removeSync(fileOrFolder)
    }
  }
}
class VariableTemplate {
  constructor(config) {
    this.fields = config.fields
    this.message = config.message
    this.template = config.template
    this.snippetName = config.snippetName
    this.variableFilePath = config.variableFilePath
  }
}


const
  postcssFunctionsFile = paths.root + 'plugins/other/postcssFunctions.js',
  styles = {
    normalize: paths.sources.styles + 'normalize.pcss',
  },
  html = {
    layout: paths.sources.htmlComponents + 'layout.html',
    index: paths.sources.root + 'index.html',
  }


logSomeImportantInConsole(
  `Salute!
You will have to use some keys, such as: 
${chalk.yellowBright('↑')} - focus up,
${chalk.yellowBright('↓')} - focus down,
${chalk.yellowBright('← →')} - choosing between elements on the same line,
${chalk.yellowBright('space')} - to select an option,
${chalk.yellowBright('⭾ (tab)')} - to move to a next element, for example, in templates.
`,
  chalk.green
)

await enquirer.toggle({
  message: chalk.italic('Any questions?'),
  enabled: chalk.greenBright('Nope, i totally understand!'),
  disabled: chalk.greenBright('Nope, i understand!'),
})


await includeModuleByQuestion(
  'Whether you want to save the plugin...',

  new ModuleObject({
    moduleName: 'Just Validate',
    filesAndFolders: paths.sources.assets + 'justValidate/',
  }),
  new ModuleObject({
    moduleName: 'scroll-timeline polyfill',
    filesAndFolders: paths.sources.assets + 'scroll-timeline.js',
  }),
  new ModuleObject({
    moduleName: `Slider Swiper ${chalk.magenta(`[MANDATORY FOR MODULE 'STEP BY STEP BLOCK']`)
      }`,
    filesAndFolders: paths.sources.assets + 'swiper/',
  }),
  new ModuleObject({
    moduleName: 'Typed',
    filesAndFolders: paths.sources.assets + 'typed/',
  }),
  new ModuleObject({
    moduleName: 'Input Mask',
    filesAndFolders: paths.sources.assets + 'inputmask/',
  }),
  new ModuleObject({
    moduleName: 'Photo Swipe',
    filesAndFolders: paths.sources.assets + 'photoswipe/',
  }),
  new ModuleObject({
    moduleName: 'No Ui Slider',
    filesAndFolders: paths.sources.assets + 'nouislider/',
  })
)
await includeModuleByQuestion(
  'Whether you want to save the module...',

  new ModuleObject({
    moduleName: 'Scripts for dialog',
    filesAndFolders: [
      paths.sources.scripts + 'dialogs/',
      paths.sources.htmlComponents + 'modals.html',
    ],
  }),
  new ModuleObject({
    moduleName: 'Tabs',
    filesAndFolders: paths.sources.scripts + 'tab/',
  }),
  new ModuleObject({
    moduleName: 'Parallax by mouse',
    filesAndFolders: paths.sources.scripts + 'mouseParallax/',
  }),
  new ModuleObject({
    moduleName: 'AutoScrollPadding',
    filesAndFolders: paths.sources.scripts + 'autoScrollPadding/',
  }),
  new ModuleObject({
    moduleName: 'Tools for observer',
    filesAndFolders: paths.sources.scripts + 'observerTools/',
  }),
  new ModuleObject({
    moduleName: 'Horizontal scroll by mouse wheel',
    filesAndFolders: paths.sources.scripts + 'horizontalMouseScroll.ts',
  }),
  new ModuleObject({
    moduleName: 'Switching by swipe',
    filesAndFolders: paths.sources.scripts + 'toggleBySwipe/',
  }),
  new ModuleObject({
    moduleName: 'Step By Step block',
    filesAndFolders: paths.sources.scripts + 'stepByStepBlock/',
  }),
  new ModuleObject({
    moduleName: 'Infinite auto-scroll',
    filesAndFolders: paths.sources.scripts + 'infiniteScroll/',
  }),
  new ModuleObject({
    moduleName: 'Horizontal scrolling with a mouse wheel',
    filesAndFolders: paths.sources.scripts + 'horizontalMouseScroll/',
  }),
)

await setMainFont()

logSomeImportantInConsole(
  `\nNow, i suggest you change the values of the main variables.\n`,
  chalk.greenBright
)

await setVariables(
  new VariableTemplate({
    snippetName: 'html layout',
    message: chalk.cyanBright(`Fill in the fields in the html-layout. \nSet the main language of pages. (${chalk.yellow.underline(html.layout)})`),
    variableFilePath: html.layout,
    fields: [
      { name: 'mainLangOfPages', initial: 'en' },
    ],
    template: `<html lang="\${mainLangOfPages}">`
  }),

  new VariableTemplate({
    snippetName: 'title of index page',
    message: chalk.cyanBright('Title of index page...'),
    variableFilePath: html.index,
    fields: [
      { name: 'title', initial: '' },
    ],
    template: `page_title="\${title}"`
  }),

  new VariableTemplate({
    snippetName: 'stylesheetVariables',
    message: chalk.cyanBright(
      `Fill in some css variables ${chalk.yellow.underline(styles.normalize)}`),
    variableFilePath: styles.normalize,
    fields: [
      { name: 'mainTextColor', initial: 'black', },
      { name: 'backgroundColor', initial: 'white', },
    ],
    template: `--main-text-color: \${mainTextColor};
--background: \${backgroundColor};`
  }),

  new VariableTemplate({
    snippetName: 'another name',
    message: chalk.cyanBright('Enter the width of the largest design layout.'
      + `\n${chalk.yellow.underline(postcssFunctionsFile)}`),
    variableFilePath: postcssFunctionsFile,
    fields: [
      { name: 'maxDesignLayoutWidth', initial: '1440', },
    ],
    template: `const LAYOUT_WIDTH = \${maxDesignLayoutWidth}`,
  }),

  new VariableTemplate({
    snippetName: 'some name',
    message: chalk.cyanBright(
      `Set the values for the ${chalk.red('content-inline-padding')} variable, which is intended to center the content.`
      + `\n${chalk.yellow.underline(styles.normalize)}`),
    variableFilePath: styles.normalize,
    fields: [
      { name: 'largePaddings', initial: '15vw', },
    ],
    template:
      `
@media (width > 1440px) {
  --content-inline-padding: \${largePaddings};
}`,
  }),

  new VariableTemplate({
    snippetName: 'some name 2',
    message: chalk.cyan('PC screen...'),
    variableFilePath: styles.normalize,
    fields: [
      { name: 'defaultPaddings', initial: '13vw', },
    ],
    template:
      `
@media (1024px <= width <= 1440px) {
  --content-inline-padding: \${defaultPaddings};
}`,
  }),

  new VariableTemplate({
    snippetName: 'some name 2.1',
    message: chalk.cyan('Small PC screens...'),
    variableFilePath: styles.normalize,
    fields: [
      { name: 'smallPcPaddings', initial: '10vw', },
    ],
    template:
      `
@media (769px <= width <= 1024px) {
  --content-inline-padding: \${smallPcPaddings};
}`,
  }),

  new VariableTemplate({
    snippetName: 'some name 3',
    message: chalk.cyan('Tablets...'),
    variableFilePath: styles.normalize,
    fields: [
      { name: 'tabletPaddings', initial: '5vw', },
    ],
    template:
      `
@media (426px <= width <= 769px) {
  --content-inline-padding: \${tabletPaddings};
}`,
  }),

  new VariableTemplate({
    snippetName: 'some name 4',
    message: chalk.cyan('Mobiles...'),
    variableFilePath: styles.normalize,
    fields: [
      { name: 'mobilePaddings', initial: '3vw', },
    ],
    template:
      `
@media (width <= 426px) {
  --content-inline-padding: \${mobilePaddings};
}`,
  }),
)


deleteUnnecessaryFilesAndFolders()

writeCompletelyPhrase()



async function includeModuleByQuestion(title, ...moduleObjects) {
  let selectedModules = await enquirer.multiselect({
    name: 'value',
    message: chalk.greenBright(title),
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

    if (!confirmedModuleName) module.deleteFilesAndFolders()
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

async function setMainFont() {
  await enquirer.toggle({
    message: chalk.italic(`Now i will analyze your folder ${chalk.underline.yellow(paths.sources.fontsFolder)}, make sure that you have added font files there.\n`),
    enabled: chalk.greenBright(
      `I added the font files to this folder.`
    ),
    disabled: chalk.greenBright(
      `I added the font files to this folder.`
    ),
  })

  let filesSources = fs.readdirSync(paths.sources.fontsFolder)

  if (filesSources.indexOf('.gitkeep') != -1) {
    filesSources.splice(filesSources.indexOf('.gitkeep'), 1)
  }

  for (let i = 0; i < filesSources.length; i++) {
    filesSources[i] +=
      chalk.magenta(` (as ${filesSources[i].split('-')[0]})`)
  }


  if (filesSources?.length <= 0) return


  let selectedFont = await enquirer.select({
    name: 'set font',
    message: 'Select the font that will be preloaded, and it will also be in the --main-font-family variable.' + '\n',
    required: true,
    choices: filesSources,

    footer: () => chalk.gray.italic("use ↑↓ to move, when you're done, press enter")
  })

  replace.sync({
    files: styles.normalize,
    from: `--main-font-family: arial;`,
    to: `--main-font-family: '${selectedFont.split('-')[0]}'; `,
  })
  replace.sync({
    files: html.layout,
    from: `href="./fonts/your_preloadedFontName.woff2"`,
    to: `href="./fonts/${selectedFont.split('.')[0]}.woff2"`,
  })
}

function deleteUnnecessaryFilesAndFolders() {
  deleteFolder(paths.root + 'README.md')
  fs.createFileSync('README.md')

  log(chalk.gray.italic('✅ The readme file are clean.'))

  deleteFolder(paths.output.root, 'Dist have been deleted.')
  deleteFolder(paths.root + 'snippets/', 'Snippets have been deleted.')
  deleteFolder(paths.sources.fontsFolder + '.gitkeep', 'Gitkeep in fonts have been deleted.')

  if (fs.readdirSync(paths.sources.assets).length == 0)
    deleteFolder(paths.sources.assets, 'paths.sources.assets have been deleted.')
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