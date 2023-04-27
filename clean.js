import fs from 'fs-extra'
import path from 'path'
import replace from 'replace-in-file'
import * as readline from 'readline-sync'
import { log } from 'console'

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
  scriptFilesPaths
  styleFilesPath
  htmlFilesPaths
  htmlConnectStrings

  constructor({ moduleName, scriptFilesPaths, styleFilesPath, htmlFilesPaths, htmlConnectStrings }) {
    this.moduleName = moduleName
    this.scriptFilesPaths = scriptFilesPaths
    this.styleFilesPath = styleFilesPath
    this.htmlFilesPaths = htmlFilesPaths
    this.htmlConnectStrings = htmlConnectStrings
  }
}

const
  pathToProject = path.resolve('./'),
  distFolderName = `${pathToProject}/dist`,
  snippetsFolderName = `${pathToProject}/snippets`,
  readmeFolder = `${pathToProject}/readmeFiles`,
  src = `${pathToProject}/src`,
  scriptModules = `${src}/scripts/modules/`,
  scriptGeneral = `${src}/scripts/`,
  stylesModules = `${src}/styles/modules/`,
  componentsFolder = `${src}/components/`,
  phpFolder = `${src}/php/`,
  libsFolder = `${src}/libs/`,
  stylEnvFilePath = `${src}/styles/_environment.styl`,
  generalStyleFilePath = `${src}/styles/general/general.styl`,
  layoutFilePath = `${componentsFolder}/layout.html`,

  fontsGitkeep = `${src}/fonts/.gitkeep`,
  mainStyleFile = `${src}/styles/index.styl`,
  modulesStyleFolder = `${src}/styles/modules`,
  mainHtmlFile = `${src}/index.html`,
  gulpImportModulesFile = `${pathToProject}/gulp/importModules.js`,
  gulpFile = `${pathToProject}/gulpfile.js`,
  readmeFilePath = `${pathToProject}/README.md`,

  srcDemoFoldersAndFIles = [
    `${src}/docs`, `${src}/img/demo`,
  ],
  phpMailerFiles = [
    `${phpFolder}Exception.php`, `${phpFolder}mail.php`, `${phpFolder}PHPMailer.php`, `${phpFolder}SMTP.php`,
  ],
  // The extension of typescript source files.
  srcExt = '.src.ts'

// When the setImportModule function is running, it indicates whether a hint should be specified.
let isFirstImportString = true

let greenTextColor = '\x1b[32m'
let resetTextColor = '\x1b[0m'
let brightTextColor = '\x1b[1m'
let grayTextColor = '\x1b[90m'

console.log(`${grayTextColor} `)
deleteDemoContent()
cleanReadmeFilesAndFolders()
deleteSnippets()
deleteDist()
deleteGitKeep()
console.log(`${resetTextColor} `)

setImportModules()
setModules()
setPhp()

console.log(`${resetTextColor} ${grayTextColor}`)
deleteUnusedFolders()
console.log(`${resetTextColor} `)

log(`${brightTextColor}${greenTextColor}The configuration of files and folders is complete.
Now, i suggest you change the values of the main variables.${resetTextColor}`)

setGeneralVariables()

log(`${brightTextColor}${greenTextColor}The setup is completely complete! I wish You a successful job. 
🎆🎆🎆${resetTextColor}`)


function setImportModules() {
  setImportModule(
    new ImportModuleObject({
      moduleName: `Just-validate`,
      htmlConnectSlug: `justValidate`,
      pathsToDelete: [
        `${src}/scripts/justValidate.js`,
        `${libsFolder}just-validate.production.min.js`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `Slider Swiper`,
      htmlConnectSlug: `swiper`,
      pathsToDelete: [
        `${src}/scripts/sliders.js`,
        `${libsFolder}swiper/`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `Typed`,
      htmlConnectSlug: `typed`,
      pathsToDelete: [
        `${src}/scripts/typed.js`,
        `${libsFolder}typed.min.js`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `Input Mask`,
      htmlConnectSlug: '',
      pathsToDelete: [
        `${libsFolder}inputmask.min.js`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `Air Date Picker`,
      htmlConnectSlug: '',
      pathsToDelete: [
        `${libsFolder}air-datepicker/`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `Photo Swipe`,
      htmlConnectSlug: `photoSwipe`,
      pathsToDelete: [
        `${src}/scripts/photoSwipe.js`,
        `${libsFolder}photoswipe/`,
      ],
    }),
    new ImportModuleObject({
      moduleName: `noUiSlider`,
      htmlConnectSlug: `noUiSlider`,
      pathsToDelete: [
        `${src}/scripts/nouislider.js`,
        `${libsFolder}nouislider/`,
      ],
    })
  )
}
function setModules() {
  includeModuleByQuestion(
    new ModuleObject({
      moduleName: 'Burger-menu',
      scriptFilesPaths: [
        `${scriptModules}burgerMenu${srcExt}`,
        `${scriptGeneral}burgerMenu.ts`,
      ],
      styleFilesPath: `${stylesModules}burgerMenu.styl`,
      htmlFilesPaths: [
        `${componentsFolder}burgerMenu.html`,
      ],
      htmlConnectStrings: [
        {
          path: `${componentsFolder}/header.html`,
          strings: `<x-burgerMenu></x-burgerMenu>`,
        },
        {
          strings: "burgerMenu='false'",
        },
      ],
    }),
    new ModuleObject({
      moduleName: 'Sidebar',
      scriptFilesPaths: [
        `${scriptModules}sidebar${srcExt}`,
        `${scriptGeneral}sidebar.ts`,
      ],
      styleFilesPath: `${stylesModules}sidebar.styl`,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "sidebar='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Modal-Window',
      scriptFilesPaths: [
        `${scriptModules}modalWindow${srcExt}`,
        `${scriptGeneral}modalWindow.ts`,
      ],
      styleFilesPath: `${stylesModules}modalWindows.styl`,
      htmlFilesPaths: [
        `${componentsFolder}modals.html`,
      ],
      htmlConnectStrings: [
        {
          strings: `<x-modals></x-modals>`,
        },
        {
          strings: "modalWindow='false'"
        },
      ],
    }),
    new ModuleObject({
      moduleName: 'Spoilers',
      scriptFilesPaths: [
        `${scriptModules}spoiler${srcExt}`,
        `${scriptGeneral}spoiler.ts`,
      ],
      styleFilesPath: `${stylesModules}spoiler.styl`,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "spoiler='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Submenu',
      scriptFilesPaths: [
        `${scriptModules}submenu${srcExt}`,
        `${scriptGeneral}submenu.ts`,
      ],
      styleFilesPath: `${stylesModules}submenu.styl`,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "submenu='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Tabs',
      scriptFilesPaths: [
        `${scriptModules}tab${srcExt}`,
        `${scriptGeneral}tab.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "tabs='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Element-modal',
      scriptFilesPaths: [
        `${scriptModules}elementModal${srcExt}`,
        `${scriptGeneral}elementModal.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "elementModal='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Parallax',
      scriptFilesPaths: [
        `${scriptModules}parallax${srcExt}`,
        `${scriptGeneral}parallax.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "parallax='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'ScrollToElement',
      scriptFilesPaths: [
        `${scriptModules}scrollToElement${srcExt}`,
        `${scriptGeneral}scrollToElement.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "scrollToElement='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Animations by scroll',
      scriptFilesPaths: [
        `${scriptModules}animateByScroll${srcExt}`,
        `${scriptGeneral}animateByScroll.ts`,
        `${scriptGeneral}scroll-timeline.js`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "animateByScroll='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Horizontal scroll',
      scriptFilesPaths: [
        `${scriptGeneral}horizontalScroll.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "horizontalScroll='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Swipe module (required to switch a sidebar by swipe)',
      scriptFilesPaths: [
        `${scriptModules}swipe${srcExt}`,
        `${scriptGeneral}swipe.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "swipe='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Form styles',
      scriptFilesPaths: [],
      styleFilesPath: `${stylesModules}form.styl`,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "formStyles='false'" }
      ],
    }),
    new ModuleObject({
      moduleName: 'Step By Step block',
      scriptFilesPaths: [
        `${scriptModules}stepByStepBlock${srcExt}`,
        `${scriptGeneral}stepByStepBlock.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: "stepByStep='false'" }
      ],
    }),
  )
}
function setPhp() {
  if (readline.keyInYNStrict(`Include ${brightTextColor}PHP scripts${resetTextColor}?`) == false) {
    fs.removeSync(phpFolder)
    return
  }

  if (readline.keyInYNStrict(`Include ${brightTextColor}PHP-mailer${resetTextColor}?`) == false) {
    for (let phpMailerFile of phpMailerFiles) {
      fs.removeSync(phpMailerFile)
    }
  }
}
function setGeneralVariables() {
  setVariable({
    variableNameWithOperator: 'lang:',
    message: 'The main language of the main page, (string!)',
    defaultValue: "'en'",
    variableFilePath: layoutFilePath,
  })
  setVariable({
    variableNameWithOperator: 'preloadedFontName:',
    message: 'The name of the font file that should be preloaded, (string!)',
    defaultValue: "''",
    variableFilePath: layoutFilePath,
  })

  setVariable({
    variableNameWithOperator: '--main-font-family',
    message: 'The main font on the pages. Be sure to check the value in the general.styl file after auto-connecting fonts after starting the build,',
    defaultValue: 'arial',
    variableFilePath: generalStyleFilePath,
  })
  setVariable({
    variableNameWithOperator: '--text-c',
    message: 'Main text color,',
    defaultValue: 'black',
    variableFilePath: generalStyleFilePath,
  })
  setVariable({
    variableNameWithOperator: '--bg',
    message: 'Background of pages,',
    defaultValue: 'white',
    variableFilePath: generalStyleFilePath,
  })


  setVariable({
    variableNameWithOperator: '$layoutWidth =',
    message: 'Layout width from design (just number),',
    defaultValue: '1440',
    variableFilePath: stylEnvFilePath,
  })
  setVariable({
    variableNameWithOperator: '--bigViewportContentWidth',
    message: 'The width of the content on the screens is greater than layoutWidth:',
    defaultValue: '70vw',
    variableFilePath: generalStyleFilePath,
  })
  setVariable({
    variableNameWithOperator: '--defaultViewportContentWidth',
    message: 'The default width of the content on the screens:',
    defaultValue: '80vw',
    variableFilePath: generalStyleFilePath,
  })
  setVariable({
    variableNameWithOperator: '--tabletsViewportContentWidth',
    message: 'Width of content on tablets:',
    defaultValue: '90vw',
    variableFilePath: generalStyleFilePath,
  })
  setVariable({
    variableNameWithOperator: '--mobileViewportContentWidth',
    message: 'Width of content on smartphones:',
    defaultValue: '95vw',
    variableFilePath: generalStyleFilePath,
  })
  setVariable({
    variableNameWithOperator: '$mainFontSize =',
    message: 'The main font size on the pages. By default, see the desktop version (just number),',
    defaultValue: '16',
    variableFilePath: stylEnvFilePath,
  })
  setVariable({
    variableNameWithOperator: '$minFontSize =',
    message: 'The minimum font size that will be achievable on mobile devices (just number),',
    defaultValue: '12',
    variableFilePath: stylEnvFilePath,
  })

  console.log(resetTextColor)
}

function deleteDemoContent() {
  for (let pathToDemo of srcDemoFoldersAndFIles) {
    deleteFolder(pathToDemo)
  }

  log('✅ The demo content have been deleted.')
}
function cleanReadmeFilesAndFolders() {
  deleteFolder(readmeFolder, 'The readme folder have been deleted.')
  deleteFolder(readmeFilePath)
  fs.createFileSync('README.md')

  log('✅ The readme file are clean.')
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
  if (folderIsEmpty(modulesStyleFolder)) {
    deleteFolder(modulesStyleFolder)
  }
  if (folderIsEmpty(phpFolder)) {
    deleteFolder(phpFolder)
  }
  if (folderIsEmpty(libsFolder)) {
    deleteFolder(libsFolder)
  }

  log('✅ Unused folders have been deleted.')
}

function setImportModule(...importModuleObjects) {
  if (isFirstImportString) {
    // First string, after by a column of modules.
    console.log(`${brightTextColor}Do you want to import the plugin... `)
    isFirstImportString = false
  }

  for (let importModule of importModuleObjects) {
    if (readline.keyInYNStrict(`${resetTextColor}  ${importModule.moduleName}? ${brightTextColor}`)) {
      if (importModule.htmlConnectSlug) {
        replace.sync({
          files: mainHtmlFile,
          from: `${importModule.htmlConnectSlug}='false'`,
          to: `${importModule.htmlConnectSlug}='true'`,
        })
      }
    }
    else {
      if (importModule.htmlConnectSlug) {
        replace.sync({
          files: mainHtmlFile,
          from: `${importModule.htmlConnectSlug}='false'`,
          to: '',
        })
      }

      for (let pathToDelete of importModule.pathsToDelete) {
        fs.removeSync(pathToDelete)
      }
    }
  }
}

function includeModuleByQuestion(...moduleObjects) {
  console.log(`${brightTextColor}Do you want to include the module... `)

  for (let module of moduleObjects) {
    if (readline.keyInYNStrict(`${resetTextColor}  ${module.moduleName}? ${brightTextColor}`)) {
      replaceHtmlConnectionString(module.htmlConnectStrings, 'false', 'true')

      continue
    }

    if (module.scriptFilesPaths.length > 0) {
      for (let scriptPath of module.scriptFilesPaths) {
        fs.removeSync(scriptPath)
      }
    }
    if (module.styleFilesPath) {
      fs.removeSync(module.styleFilesPath)
    }
    if (module.htmlFilesPaths != undefined && module.htmlFilesPaths.length > 0) {
      for (let htmlPath of module.htmlFilesPaths) {
        fs.removeSync(htmlPath)
      }
    }
    replaceHtmlConnectionString(module.htmlConnectStrings)
  }

  console.log(`${resetTextColor} `)
}

function replaceHtmlConnectionString(htmlConnectStrings, replacedValue, replacedNewValue) {
  if (htmlConnectStrings == undefined)
    return

  for (let htmlConnectStringData of htmlConnectStrings) {
    if (htmlConnectStringData.path == undefined)
      htmlConnectStringData.path = mainHtmlFile


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
      log(`✅ ${messageOnSuccessful}`)

  } catch (error) {
    log('❌' + error)
  }
}
function folderIsEmpty(path) {
  try {
    return fs.readdirSync(path).length == 0
  } catch (error) {
    return false
  }
}

function setVariable({ variableNameWithOperator, message, defaultValue, variableFilePath }) {
  let newVariableValue = readline.question(`${brightTextColor} ${message} ${variableNameWithOperator} ${resetTextColor}
    default is:${grayTextColor} ${defaultValue}${resetTextColor}
    new value is:${brightTextColor} `)

  replace.sync({
    files: variableFilePath,
    from: `${variableNameWithOperator} ${defaultValue}`,
    to: `${variableNameWithOperator} ${newVariableValue}`
  })
}
