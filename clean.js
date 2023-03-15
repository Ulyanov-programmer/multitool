import fs from 'fs-extra'
import path from 'path'
import replace from 'replace-in-file'
import * as readline from 'readline-sync'
import { log } from 'console'

class ImportModuleObject {
  moduleName
  htmlConnectString
  pathsToDelete

  constructor(moduleName, htmlConnectString, pathsToDelete) {
    this.moduleName = moduleName
    this.htmlConnectString = htmlConnectString
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
  demoProjectFolderName = `${pathToProject}/gulp_multitool`,
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
  headFilePath = `${componentsFolder}/headContent.htm`,

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
// When the setModules function is running, it indicates whether a hint should be specified.
let isFirstModuleString = true

let greenTextColor = '\x1b[32m'
let resetTextColor = '\x1b[0m'
let brightTextColor = '\x1b[1m'
let grayTextColor = '\x1b[90m'

console.log(`${grayTextColor} `)
deleteDemoContent()
cleanReadmeFilesAndFolders()
deleteSnippets()
deleteDemoProject()
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
    new ImportModuleObject(
      `Just-validate`,
      'justValidate: false,',
      [
        `${src}/scripts/justValidate.js`,
        `${libsFolder}just-validate.production.min.js`,
      ],
    ),
    new ImportModuleObject(
      `Slider Swiper`,
      'swiper: false,',
      [
        `${src}/scripts/sliders.js`,
        `${libsFolder}swiper/`,
      ],
    ),
    new ImportModuleObject(
      `Typed`,
      'typed: false,',
      [
        `${src}/scripts/typed.js`,
        `${libsFolder}typed.min.js`,
      ],
    ),
    new ImportModuleObject(
      `Input Mask`,
      '',
      [
        `${libsFolder}inputmask.min.js`,
      ],
    ),
    new ImportModuleObject(
      `Air Date Picker`,
      '',
      [
        `${libsFolder}air-datepicker/`,
      ],
    ),
    new ImportModuleObject(
      `Photo Swipe`,
      'photoSwipe: false,',
      [
        `${src}/scripts/photoSwipe.js`,
        `${libsFolder}photoswipe/`,
      ],
    ),
    new ImportModuleObject(
      `noUiSlider`,
      'noUiSlider: false,',
      [
        `${src}/scripts/nouislider.js`,
        `${libsFolder}nouislider/`,
      ],
    ),
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
        `${componentsFolder}burgerMenu.htm`,
      ],
      htmlConnectStrings: [
        {
          path: `${componentsFolder}/header.htm`,
          strings: "<%- include('burgerMenu.htm') %>",
        },
        {
          strings: 'burgerMenu: false,',
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
        { strings: 'sidebar: false,' }
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
        `${componentsFolder}modals.htm`,
      ],
      htmlConnectStrings: [
        {
          strings: "<%- include('components/modals.htm', {}) %>",
        },
        {
          strings: 'modalWindow: false,'
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
        { strings: 'spoiler: false,' }
      ],
    }),
    new ModuleObject({
      moduleName: 'Filter',
      scriptFilesPaths: [
        `${scriptModules}filter${srcExt}`,
        `${scriptGeneral}filter.ts`,
      ],
      styleFilesPath: null,
      htmlFilesPaths: null,
      htmlConnectStrings: null,
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
        { strings: 'submenu: false,' }
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
        { strings: 'tabs: false,' }
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
        { strings: 'elementModal: false,' }
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
        { strings: 'parallax: false,' }
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
        { strings: 'scrollToElement: false,' }
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
        { strings: 'animateByScroll: false,' }
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
        { strings: 'horizontalScroll: false,' }
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
        { strings: 'swipe: false,' }
      ],
    }),
    new ModuleObject({
      moduleName: 'Form styles',
      scriptFilesPaths: [],
      styleFilesPath: `${stylesModules}form.styl`,
      htmlFilesPaths: null,
      htmlConnectStrings: [
        { strings: 'formStyles: false,' }
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
  setVariable(
    'lang:',
    'The main language of the main page, (string!)',
    "'en'",
    mainHtmlFile,
  )
  setVariable(
    'title:',
    'The title of the main page, (string!)',
    "'MainPage'",
    mainHtmlFile,
  )
  setVariable(
    'preloadedFontName =',
    'The name of the font file that should be preloaded, (string!)',
    "''",
    headFilePath,
  )

  setVariable(
    '--main-font-family',
    'The main font on the pages. Be sure to check the value in the general.styl file after auto-connecting fonts after starting the build,',
    'arial',
    generalStyleFilePath,
  )
  setVariable(
    '--text-c',
    'Main text color,',
    'black', generalStyleFilePath,
  )
  setVariable(
    '--bg',
    'Background of pages,',
    'white',
    generalStyleFilePath,
  )


  setVariable(
    '$layoutWidth =',
    'Layout width from design (just number),',
    '1440',
    stylEnvFilePath,
  )
  setVariable(
    '--bigViewportContentWidth',
    'The width of the content on the screens is greater than layoutWidth:',
    '70vw',
    generalStyleFilePath,
  )
  setVariable(
    '--defaultViewportContentWidth',
    'The default width of the content on the screens:',
    '80vw',
    generalStyleFilePath,
  )
  setVariable(
    '--tabletsViewportContentWidth',
    'Width of content on tablets:',
    '90vw',
    generalStyleFilePath,
  )
  setVariable(
    '--mobileViewportContentWidth',
    'Width of content on smartphones:',
    '95vw',
    generalStyleFilePath,
  )
  setVariable(
    '$mainFontSize =',
    'The main font size on the pages. By default, see the desktop version (just number),', '16',
    stylEnvFilePath,
  )
  setVariable(
    '$minFontSize =',
    'The minimum font size that will be achievable on mobile devices (just number),', '12',
    stylEnvFilePath,
  )
  console.log('\x1b[0m')
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
function deleteDemoProject() {
  deleteFolder(demoProjectFolderName, 'Demo Project have been deleted.')
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
    console.log(`${brightTextColor}Import the `)
  }

  for (let importModule of importModuleObjects) {
    if (readline.keyInYNStrict(`${resetTextColor}  ${importModule.moduleName}? ${brightTextColor}`)) {
      let newHtmlConnectString = importModule.htmlConnectString.replace('false', 'true')

      replace.sync({
        files: mainHtmlFile,
        from: importModule.htmlConnectString,
        to: newHtmlConnectString,
      })
    } else {
      replace.sync({
        files: mainHtmlFile,
        from: importModule.htmlConnectString,
        to: '',
      })

      for (let pathToDelete of importModule.pathsToDelete) {
        fs.removeSync(pathToDelete)
      }
    }
  }
}

function includeModuleByQuestion(...moduleObjects) {
  if (isFirstModuleString) {
    // First string, after by a column of modules.
    console.log(`${brightTextColor}Include the `)
  }

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

function setVariable(variableNameWithOperator, message, defaultValue, variableFilePath) {
  let newVariableValue = readline.question(
    `${brightTextColor}
    ${message} ${variableNameWithOperator} ${resetTextColor}
    default is:${grayTextColor} ${defaultValue}${resetTextColor}
    new value is:${brightTextColor} `)

  replace.sync({
    files: variableFilePath,
    from: `${variableNameWithOperator} ${defaultValue}`,
    to: `${variableNameWithOperator} ${newVariableValue}`
  })
}
