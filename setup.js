import fs from 'fs-extra'
import path from 'path'
import replace from 'replace-in-file'
import { log } from 'console'
import enquirer from 'enquirer'
import chalk from 'chalk'

class ImportModuleObject {
  moduleName
  htmlConnectSlug
  pathsToDelete

  constructor({ moduleName, htmlConnectSlug, pathsToDelete }) {
    this.moduleName = moduleName
    this.htmlConnectSlug = htmlConnectSlug
    this.pathsToDelete = pathsToDelete
  }
}
class ModuleObject {
  moduleName
  filesAndFolders
  htmlConnectStrings

  constructor({ moduleName, filesAndFolders, htmlConnectStrings }) {
    this.moduleName = moduleName
    this.filesAndFolders = filesAndFolders
    this.styleFilesPath = styleFilesPath
    this.htmlFilesPaths = htmlFilesPaths
    this.htmlConnectStrings = htmlConnectStrings
  }
}
class VariableTemplate {
  fields
  message
  template
  snippetName
  variableFilePath

  constructor({ fields, message, template, snippetName, variableFilePath }) {
    this.fields = fields
    this.message = message
    this.template = template
    this.snippetName = snippetName
    this.variableFilePath = variableFilePath
  }
}

const pathToProject = path.resolve('./'),
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
  baseStyleFile = stylesFolder + 'base.pcss',
  layoutHtmlFile = componentsFolder + 'layout.html',
  fontsGitkeep = sources + 'fonts/.gitkeep',
  indexPage = sources + 'index.html'



logSomeImportantInConsole(
  `Salute!
You will have to use some keys, such as: 
${chalk.greenBright('↑')} (focus up),
${chalk.greenBright('↓')} (focus down),
${chalk.greenBright('← →')} (choosing between elements on the same line),
${chalk.greenBright('space')} (to select an option),
${chalk.greenBright('⭾')} (tab, to move to a next element, for example, in templates)
`,
  chalk.green
)
await enquirer.toggle({
  message: chalk.italic('Any questions?'),
  enabled: chalk.magenta('Nope, i totally understand!'),
  disabled: chalk.magenta('Nope, i understand!'),
})


deleteDemoContent()
cleanReadmeFilesAndFolders()
deleteSnippets()
deleteDist()
deleteGitKeep()

await setImportModule(
  new ImportModuleObject({
    moduleName: `Just-validate`,
    htmlConnectSlug: `justValidate`,
    pathsToDelete: [
      assets + 'justValidate/',
    ],
  }),
  new ImportModuleObject({
    moduleName: `Slider Swiper`,
    htmlConnectSlug: `swiper`,
    pathsToDelete: [
      assets + 'swiper/',
    ],
  }),
  new ImportModuleObject({
    moduleName: `Typed`,
    htmlConnectSlug: `typed`,
    pathsToDelete: [
      assets + 'typed/',
    ],
  }),
  new ImportModuleObject({
    moduleName: `Input Mask`,
    htmlConnectSlug: '',
    pathsToDelete: [
      assets + 'inputmask.min.js',
    ],
  }),
  new ImportModuleObject({
    moduleName: `Air Date Picker`,
    htmlConnectSlug: '',
    pathsToDelete: [
      assets + 'air-datepicker/',
    ],
  }),
  new ImportModuleObject({
    moduleName: `Photo Swipe`,
    htmlConnectSlug: `photoSwipe`,
    pathsToDelete: [
      assets + 'photoswipe/',
    ],
  }),
  new ImportModuleObject({
    moduleName: `noUiSlider`,
    htmlConnectSlug: `noUiSlider`,
    pathsToDelete: [
      assets + 'nouislider/',
    ],
  })
)
await includeModuleByQuestion(
  new ModuleObject({
    moduleName: 'Burger-menu',
    filesAndFolders: [
      scriptsFolder + 'burgerMenu/',
      componentsFolder + 'burgerMenu.html',
    ],
    htmlConnectStrings: [
      {
        path: componentsFolder + 'header.html',
        strings: `<x-burgerMenu></x-burgerMenu>`,
      },
      {
        strings: `burgerMenu='false'`,
      },
    ],
  }),
  new ModuleObject({
    moduleName: 'Scripts for dialog',
    filesAndFolders: [
      scriptsFolder + 'dialogs/',
      componentsFolder + 'modals.html',
    ],
    htmlConnectStrings: [
      { strings: `<x-modals></x-modals>`, },
      { strings: `dialogs='false'` },
    ],
  }),
  new ModuleObject({
    moduleName: 'Spoilers',
    filesAndFolders: [
      scriptsFolder + 'spoiler/',
    ],
    htmlConnectStrings: [
      { strings: `spoiler='false'` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Submenu',
    filesAndFolders: [
      scriptsFolder + 'submenu/',
    ],
    htmlConnectStrings: [
      { strings: `submenu='false'` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Tabs',
    filesAndFolders: [
      scriptsFolder + 'tab/',
    ],
    htmlConnectStrings: [
      { strings: `tabs='false'` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Element-modal',
    filesAndFolders: [
      scriptsFolder + 'elementModal/',
    ],
    htmlConnectStrings: [
      { strings: `elementModal='false'` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Parallax',
    filesAndFolders: [
      scriptsFolder + 'parallax/',
    ],
    htmlConnectStrings: [
      { strings: `parallax='false'` }
    ],
  }),
  new ModuleObject({
    moduleName: 'AutoScrollPadding',
    filesAndFolders: [
      scriptsFolder + 'autoScrollPadding/',
    ],
    htmlConnectStrings: [
      { strings: `autoScrollPadding='false'` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Tools for observer',
    filesAndFolders: [
      scriptsFolder + 'observerTools/',
    ],
    htmlConnectStrings: [
      { strings: `observerTools='false'` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Horizontal scroll',
    filesAndFolders: [
      scriptsFolder + 'horizontalScroll.ts',
    ],
    htmlConnectStrings: [
      { strings: `horizontalScroll='false'` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Swipe module (required to switch a sidebar by swipe)',
    filesAndFolders: [
      scriptsFolder + 'swipe/',
    ],
    htmlConnectStrings: [
      { strings: `swipe='false'` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Form styles',
    filesAndFolders: [
      stylesFolder + 'form.pcss',
    ],
    htmlConnectStrings: [
      { strings: `formStyles='false'` }
    ],
  }),
  new ModuleObject({
    moduleName: 'Step By Step block',
    filesAndFolders: [
      scriptsFolder + 'stepByStepBlock/',
    ],
    htmlConnectStrings: [
      { strings: `stepByStep='false'` }
    ],
  }),
)

deleteUnusedFolders()


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
    message: chalk.magentaBright('Fill out the fields in the html-layout.'),
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
    message: chalk.magentaBright('Title of index page...'),
    variableFilePath: indexPage,
    fields: [
      { name: 'title', initial: 'UnnamedPage' },
    ],
    template:
      `<x-layout title='\${title}'`
  }),
  new VariableTemplate({
    snippetName: 'stylesheetVariables',
    message: chalk.magentaBright('Fill out the general stylesheet variables.'),
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
    snippetName: 'mediaContentWidthVariables',
    message: chalk.magentaBright('Fill out the content width variables.'),
    variableFilePath: baseStyleFile,
    fields: [
      { name: 'bigVpPaddings', initial: '15vw', },
      { name: 'pcPaddings', initial: '10vw', },
      { name: 'tabletPaddings', initial: '5vw', },
      { name: 'mobilePaddings', initial: '2.5vw', },
    ],
    template:
      `/* ? Paddings for site content assigned via the _centered-content class. */

/* Paddings for site content, in a large viewport. */
--big-viewport-content-inline-padding: \${bigVpPaddings};

/* Paddings for site content, in a PC viewport. */
--pc-content-inline-padding: \${pcPaddings};

/* Paddings for site content, in a tablet viewport. */
--tablet-content-inline-padding: \${tabletPaddings};

/* Paddings for site content, in a smartphone viewport. */
--mobile-content-inline-padding: \${mobilePaddings};`,
  }),
  new VariableTemplate({
    snippetName: 'stylesheetSassLikeVariables',
    message: chalk.magentaBright('Fill out the general... Sass-like stylesheet variables.'),
    variableFilePath: environmentFilePath,
    fields: [
      { name: 'widthOfYourDesignLayout', initial: '1440', },
      { name: 'minimalWidthOfYourDesign', initial: '320', },
      { name: 'mainSize', initial: '16', },
      { name: 'minSize', initial: '12', },
    ],
    template:
      `$layoutWidth: \${widthOfYourDesignLayout}px;
$minLayoutWidth: \${minimalWidthOfYourDesign}px;
$mainFontSize: \${mainSize}px;
$minFontSize: \${minSize}px;`
  }),
)


logSomeImportantInConsole(
  `
=====================================================
          The setup is completely complete! 
          I wish You a successful job. 
                       🎆🎆🎆             
=====================================================
`,
  chalk.greenBright
)



function deleteDemoContent() {
  for (let pathToDemo of sourcesDemoFoldersAndFIles) {
    deleteFolder(pathToDemo)
  }

  log(chalk.gray.italic('✅ The demo content have been deleted.'))
}
function cleanReadmeFilesAndFolders() {
  deleteFolder(readmeFolder, 'The readme folder have been deleted.')
  deleteFolder(readmeFilePath)
  fs.createFileSync('README.md')

  log(chalk.gray.italic('✅ The readme file are clean.'))
}
function deleteDist() {
  deleteFolder(distFolderName, 'Dist have been deleted.')
}
function deleteSnippets() {
  deleteFolder(snippetsFolderName, 'Snippets have been deleted.')
}
function deleteGitKeep() {
  deleteFolder(fontsGitkeep, 'Gitkeep have been deleted.')
}
function deleteUnusedFolders() {
  if (isFolderEmpty(assets)) {
    deleteFolder(assets)
  }

  log(chalk.gray.italic('✅ Unused folders have been deleted.'))
}


async function includeModuleByQuestion(...moduleObjects) {
  let answers = await enquirer.multiselect({
    name: 'value',
    message: chalk.magentaBright('Do you want to include the module...'),
    limit: 5,
    choices: moduleObjects.map(function (module) {
      return {
        name: module.moduleName, value: module.moduleName,
      }
    }),

    footer: () => chalk.gray.italic('use ↑ and ↓ to switch, you can "scroll" this list')
  })


  for (let module of moduleObjects) {
    let confirmedModuleName = answers.find(answer => answer == module.moduleName)

    if (confirmedModuleName) {
      replaceHtmlConnectionString(module.htmlConnectStrings, 'false', 'true')
    }
    else {
      if (module.filesAndFolders) {
        for (let fileOrFolder of module.filesAndFolders) {
          fs.removeSync(fileOrFolder)
        }
      }

      replaceHtmlConnectionString(module.htmlConnectStrings)
    }
  }
}
async function setImportModule(...importModuleObjects) {
  let answers = await enquirer.multiselect({
    name: 'value',
    message: chalk.magentaBright('Do you want to import the plugin...'),
    limit: 5,
    choices: importModuleObjects.map(function (module) {
      return {
        name: module.moduleName, value: module.moduleName,
      }
    }),

    footer: () => chalk.gray.italic('use ↑ and ↓ to switch, you can "scroll" this list')
  })


  for (let module of importModuleObjects) {
    let confirmedModuleName = answers.find(answer => answer == module.moduleName)

    if (confirmedModuleName) {
      if (module.htmlConnectSlug == false) continue

      replace.sync({
        files: indexPage,
        from: `${module.htmlConnectSlug}='false'`,
        to: `${module.htmlConnectSlug}='true'`,
      })
    }
    else {
      if (module.htmlConnectSlug) {
        replace.sync({
          files: indexPage,
          from: `${module.htmlConnectSlug}='false'`,
          to: '',
        })
      }

      for (let pathToDelete of module.pathsToDelete) {
        fs.removeSync(pathToDelete)
      }
    }
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


function replaceHtmlConnectionString(htmlConnectStrings, replacedValue, replacedNewValue) {
  if (htmlConnectStrings == undefined)
    return

  for (let htmlConnectStringData of htmlConnectStrings) {
    if (htmlConnectStringData.path == undefined)
      htmlConnectStringData.path = indexPage


    let newHtmlConnectString

    if (replacedValue == undefined || replacedNewValue == undefined) {
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

  } catch (error) {
    log(chalk.red('❌ ' + error))
  }
}
function isFolderEmpty(path) {
  try {
    return fs.readdirSync(path).length == 0
  } catch (error) {
    return false
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
  } else {
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