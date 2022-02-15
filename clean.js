import fs from 'fs-extra'
import path from 'path';
import replace from 'replace-in-file';
import * as readline from "readline-sync";


const pathToProject = path.resolve('./');
const demoProjectFolderName = '/Gulp_Default_Project'
const snippetsFolderName = '/mySnippets'
const readmeFolder = '/readmeFiles'
const src = '/#src'
const scriptModules = `${pathToProject}${src}/scripts/modules/`
const stylesModules = `${pathToProject}${src}/stylus/modules/`


const fontsGitkeep = `${src}/fonts/.gitkeep`
const mainStyleFile = `${src}/stylus/style.styl`
const mainHtmlFile = `${src}/index.html`
const mainScriptFile = `${src}/scripts/script.ts`

const srcDemoFoldersAndFIles =
  [`${src}/img/demo`, `${src}/stylus/_demoStyles.styl`, `${src}/_demo.htm`,];

const demoStyles = {
  files: pathToProject + mainStyleFile,
  from: "@import '_demoStyles';", to: '',
};
const demoHtml = {
  files: pathToProject + mainHtmlFile,
  from: "@@include('_demo.htm')", to: '',
};

deleteFontsGitkeep()
deleteDemoContent()
cleanReadmeFilesAndFolders()
deleteSnippets()
deleteDemoProject()
let answer = readline.question('Set script&style modules? (enter [y], if you not, enter [another])')
answer.toLowerCase() == 'y' ? setModules() : false


async function setModules() {
  const hint = '(enter [y], if you not, enter [enter or another])';

  await includeModuleByQuestion(`Include Burger Menu? ${hint}`,
    `${scriptModules}fsNavmenu.ts`, `${stylesModules}_fsNavmenu.styl`)

  await includeModuleByQuestion(`Include Filter? ${hint}`,
    `${scriptModules}filter.ts`)

  await includeModuleByQuestion(`Include Modal-Window? ${hint}`,
    `${scriptModules}modalWindow.ts`)

  await includeModuleByQuestion(`Include Spoilers? ${hint}`,
    `${scriptModules}spoiler.ts`, `${stylesModules}_spoiler.styl`)

  await includeModuleByQuestion(`Include Sidebar? ${hint}`,
    `${scriptModules}sidebar.ts`, `${stylesModules}_sidebar.styl`)

  await includeModuleByQuestion(`Include Submenu? ${hint}`,
    `${scriptModules}submenu.ts`, `${stylesModules}_submenu.styl`)

  await includeModuleByQuestion(`Include Accordion? ${hint}`,
    `${scriptModules}accord.ts`)

  await includeModuleByQuestion(`Include Element-modal? ${hint}`,
    `${scriptModules}elementMenu.ts`)

  await includeModuleByQuestion(`Include Parallax? ${hint}`,
    `${scriptModules}parallax.ts`)

  await includeModuleByQuestion(`Include ScrollToElement? ${hint}`,
    `${scriptModules}scrollToElement.ts`)

  await includeModuleByQuestion(`Include Searchbar styles? ${hint}`,
    ``, `${stylesModules}_searchbar.styl`)
}
function deleteFontsGitkeep() {
  try {
    fs.remove(pathToProject + fontsGitkeep)

    console.log('.gitkeep успешно удален');
  } catch (error) {
    console.log('АШИБКА');
  }
}
function deleteDemoContent() {
  try {
    for (const pathToDemo of srcDemoFoldersAndFIles) {
      fs.remove(pathToProject + pathToDemo)
    }
    replace(demoStyles)
    replace(demoHtml)

    console.log('Demo успешно удален');
  } catch (error) {
    console.log('АШИБКА');
  }
}
function cleanReadmeFilesAndFolders() {
  try {
    fs.emptyDir(pathToProject + readmeFolder)
    fs.removeSync('./README.md')
    fs.createFileSync('README.md')

    console.log('Readme успешно удален');
  } catch (error) {
    console.log('АШИБКА');
  }
}
function deleteDemoProject() {
  try {
    fs.remove(pathToProject + demoProjectFolderName)

    console.log('Demo Project успешно удален');
  } catch (error) {
    console.log('АШИБКА');
  }
}
function deleteSnippets() {
  try {
    fs.remove(pathToProject + snippetsFolderName)

    console.log('Snippets успешно удален');
  } catch (error) {
    console.log('АШИБКА');
  }
}

async function includeModuleByQuestion(questionString, scriptPath, stylePath) {
  let answer = readline.question(questionString).toLowerCase()

  if (answer !== 'y') {
    fs.removeSync(scriptPath)

    if (stylePath) {
      fs.removeSync(stylePath)

      let styleModuleName = path.basename(stylePath, '.styl')

      await replace({
        files: pathToProject + mainStyleFile,
        from: `@import 'modules/${styleModuleName}';`, to: '',
      })
    }
  }
}