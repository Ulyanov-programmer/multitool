import fs from 'fs-extra'
import path from 'path'
import replace from 'replace-in-file'
import * as readline from "readline-sync"
import { log } from 'console'


const pathToProject = path.resolve('./')
const demoProjectFolderName = `${pathToProject}/gulp_multitool`
const snippetsFolderName = `${pathToProject}/snippets`
const readmeFolder = `${pathToProject}/readmeFiles`
const src = '/src'
const scriptModules = `${pathToProject}${src}/scripts/modules/`
const scriptGeneral = `${pathToProject}${src}/scripts/`
const stylesModules = `${pathToProject}${src}/styles/modules/`
const componentsFolder = `${pathToProject}${src}/components/`
const phpFolder = `${pathToProject}${src}/php/`
const sassEnvFilePath = `${pathToProject}${src}/styles/_sassEnv.sass`
const generalStyleFilePath = `${pathToProject}${src}/styles/general/general.sass`

const fontsGitkeep = `${src}/fonts/.gitkeep`
const mainStyleFile = `${pathToProject}${src}/styles/index.sass`
const modulesStyleFolder = `${pathToProject}${src}/styles/modules`
const mainHtmlFile = `${pathToProject}${src}/index.html`
const gulpImportModulesFile = `${pathToProject}/gulp/importModules.js`
const gulpFile = `${pathToProject}/gulpfile.js`
const readmeFilePath = `${pathToProject}/README.md`

const srcDemoFoldersAndFIles = [
	`${pathToProject}${src}/docs`, `${pathToProject}${src}/img/demo`,
]
const phpMailerFiles = [
	`${phpFolder}Exception.php`, `${phpFolder}mail.php`, `${phpFolder}PHPMailer.php`, `${phpFolder}SMTP.php`,
]
// The extension of typescript source files.
const srcExt = '.src.ts'


deleteDemoContent()
cleanReadmeFilesAndFolders()
deleteSnippets()
deleteDemoProject()
deleteGitKeep()

setImportModules()
setModules()
setPhp()
deleteUnusedFolders()

log(`The configuration of files and folders is complete.
Now, i suggest you change the values of the main variables.`)

setGeneralVariables()

log(`The setup is completely complete! I wish You a successful job. 
🎆🎆🎆`)


function setImportModules() {
	setImportModule(
		`Just-validate`,
		'justValidate',
		'justValidate: false,',
		`${pathToProject}${src}/scripts/justValidate.js`)

	setImportModule(
		`Slider Swiper`,
		'swiper',
		'swiper: false,',
		`${pathToProject}${src}/scripts/sliders.js`)

	setImportModule(
		`Typed`,
		'typed',
		'typed: false,',
		`${pathToProject}${src}/scripts/typed.js`)

	setImportModule(
		`Input Mask`,
		'inputMask', '')

	setImportModule(
		`Air Date Picker`,
		'airDatePicker', '')

	setImportModule(
		`Photo Swipe`,
		'photoSwipe',
		'photoSwipe: false,',
		`${pathToProject}${src}/scripts/photoSwipe.js`)
}
function setModules() {
	includeModuleByQuestion({
		moduleName: 'Burger-menu',
		scriptPaths: [
			`${scriptModules}burgerMenu${srcExt}`,
			`${scriptGeneral}burgerMenu.ts`,
		],
		styleFilePath: `${stylesModules}burgerMenu.sass`,
		htmlPaths: [
			`${componentsFolder}_burgerMenu.htm`,
			`${componentsFolder}_navmenuBtnItem.htm`,
			`${componentsFolder}_navmenuRefItem.htm`,
		],
		htmlConnectStrings: [
			{
				path: `${pathToProject}${src}/_header.htm`,
				strings: "<%- include('components/_burgerMenu.htm') %>",
			},
			{
				strings: 'burgerMenu: false,',
			},
		],
	})
	includeModuleByQuestion({
		moduleName: 'Sidebar',
		scriptPaths: [
			`${scriptModules}sidebar${srcExt}`,
			`${scriptGeneral}sidebar.ts`,
		],
		styleFilePath: `${stylesModules}sidebar.sass`,
		htmlPath: null,
		htmlConnectStrings: [{ strings: 'sidebar: false,' }],
	})
	includeModuleByQuestion({
		moduleName: 'Modal-Window',
		scriptPaths: [
			`${scriptModules}modalWindow${srcExt}`,
			`${scriptGeneral}modalWindow.ts`,
		],
		styleFilePath: null,
		htmlPaths: [
			`${componentsFolder}_modals.htm`,
		],
		htmlConnectStrings: [
			{
				strings: "<%- include('components/_modals.htm', {}) %>",
			},
			{
				strings: "modalWindow: false,"
			},
		],
	})
	includeModuleByQuestion({
		moduleName: 'Spoilers',
		scriptPaths: [
			`${scriptModules}spoiler${srcExt}`,
			`${scriptGeneral}spoiler.ts`,
		],
		styleFilePath: `${stylesModules}spoiler.sass`,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'spoiler: false,' }],
	})
	includeModuleByQuestion({
		moduleName: 'Filter',
		scriptPaths: [
			`${scriptModules}filter${srcExt}`,
			`${scriptGeneral}filter.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: null,
	})
	includeModuleByQuestion({
		moduleName: 'Submenu',
		scriptPaths: [
			`${scriptModules}submenu${srcExt}`,
			`${scriptGeneral}submenu.ts`,
		],
		styleFilePath: `${stylesModules}submenu.sass`,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'submenu: false,' }],
	})
	includeModuleByQuestion({
		moduleName: 'Tabs',
		scriptPaths: [
			`${scriptModules}tab${srcExt}`,
			`${scriptGeneral}tab.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'tabs: false,' }],
	})
	includeModuleByQuestion({
		moduleName: 'Element-modal',
		scriptPaths: [
			`${scriptModules}elementModal${srcExt}`,
			`${scriptGeneral}elementModal.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'elementModal: false,' }],
	})
	includeModuleByQuestion({
		moduleName: 'Parallax',
		scriptPaths: [
			`${scriptModules}parallax${srcExt}`,
			`${scriptGeneral}parallax.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'parallax: false,' }],
	})
	includeModuleByQuestion({
		moduleName: 'ScrollToElement',
		scriptPaths: [
			`${scriptModules}scrollToElement${srcExt}`,
			`${scriptGeneral}scrollToElement.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'scrollToElement: false,' }],
	})
	includeModuleByQuestion({
		moduleName: 'Animations by scroll',
		scriptPaths: [
			`${scriptModules}animateByScroll${srcExt}`,
			`${scriptGeneral}animateByScroll.ts`,
			`${scriptGeneral}scroll-timeline.js`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'animateByScroll: false,' }],
	})
	includeModuleByQuestion({
		moduleName: 'Horizontal scroll',
		scriptPaths: [
			`${scriptGeneral}horizontalScroll.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'horizontalScroll: false,' }],
	})
	includeModuleByQuestion({
		moduleName: 'Swipe module (required to switch a sidebar by swipe)',
		scriptPaths: [
			`${scriptModules}swipe${srcExt}`,
			`${scriptGeneral}swipe.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'swipe: false,' }],
	})
	includeModuleByQuestion({
		moduleName: 'Form styles',
		scriptPaths: [],
		styleFilePath: `${stylesModules}form.sass`,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'formStyles: false,' }],
	})
}
function setPhp() {
	if (readline.keyInYNStrict(`Include PHP scripts?`) == false) {
		fs.removeSync(phpFolder)
		return
	}

	if (readline.keyInYNStrict(`Include PHP-mailer?`) == false) {
		for (let phpMailerFile of phpMailerFiles) {
			fs.removeSync(phpMailerFile)
		}
	}
}
function setGeneralVariables() {
	setVariable('--main-font-family', 'The main font on the pages. Be sure to check the value in the general.sass file after auto-connecting fonts after starting the build.', 'arial', generalStyleFilePath)
	setVariable('--text-c', 'Main text color.', 'black', generalStyleFilePath)
	setVariable('--bg', 'Background of pages.', 'white', generalStyleFilePath)

	setVariable('$layoutWidth', 'Layout width from design (just number).', '1440', sassEnvFilePath)
	setVariable('$mainFontSize', 'The main font size on the pages. By default, see the desktop version (just number).', '16', sassEnvFilePath)
	setVariable('$minFontSize', 'The minimum font size that will be achievable on mobile devices (just number).', '12', sassEnvFilePath)
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

	log('✅ Unused folders have been deleted.')
}

function setImportModule(importModuleName, importFileVariableName, htmlConnectString, fileToDelete) {
	if (readline.keyInYNStrict(`Import the ${importModuleName}?`)) {
		let newHtmlConnectString = htmlConnectString.replace('false', 'true')

		replace.sync({
			files: mainHtmlFile,
			from: htmlConnectString,
			to: newHtmlConnectString,
		})
	} else {
		replace.sync({
			files: mainHtmlFile,
			from: htmlConnectString,
			to: '',
		})
		replace.sync({
			files: gulpImportModulesFile,
			from: `export let ${importFileVariableName}`,
			to: `let ${importFileVariableName}`,
		})

		fs.removeSync(fileToDelete)
	}
}

function includeModuleByQuestion(
	{ moduleName, scriptPaths, styleFilePath, htmlPaths, htmlConnectStrings }) {

	if (readline.keyInYNStrict(`Include the ${moduleName}?`)) {
		replaceHtmlConnectionString(htmlConnectStrings, 'false', 'true')

		return
	}

	if (scriptPaths.length > 0) {
		for (let scriptPath of scriptPaths) {
			fs.removeSync(scriptPath)
		}
	}
	if (styleFilePath) {
		fs.removeSync(styleFilePath)
	}
	if (htmlPaths != undefined && htmlPaths.length > 0) {
		for (let htmlPath of htmlPaths) {
			fs.removeSync(htmlPath)
		}
	}
	replaceHtmlConnectionString(htmlConnectStrings)
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
	return fs.readdirSync(path).length == 0
}

function setVariable(variableName, message, defaultValue, variableFilePath) {
	let newVariableValue = readline.question(
		`${message} \n ${variableName}: `
	)

	replace.sync({
		files: variableFilePath,
		from: `${variableName}: ${defaultValue}`, 
		to: `${variableName}: ${newVariableValue}`
	})
}