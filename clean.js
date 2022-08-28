import fs from 'fs-extra'
import path from 'path'
import replace from 'replace-in-file'
import * as readline from "readline-sync"


const pathToProject = path.resolve('./')
const demoProjectFolderName = `${pathToProject}/gulp_multitool`
const snippetsFolderName = `${pathToProject}/snippets`
const readmeFolder = `${pathToProject}/readmeFiles`
const src = '/#src'
const scriptModules = `${pathToProject}${src}/scripts/modules/`
const scriptGeneral = `${pathToProject}${src}/scripts/`
const stylesModules = `${pathToProject}${src}/styles/modules/`
const componentsFolder = `${pathToProject}${src}/components/`

const fontsGitkeep = `${src}/fonts/.gitkeep`
const mainStyleFile = `${pathToProject}${src}/styles/style.sass`
const mainHtmlFile = `${pathToProject}${src}/index.html`
const gulpFile = `${pathToProject}/gulpfile.js`
const slidersFile = `${pathToProject}${src}/scripts/sliders.js`
const justValidateFile = `${pathToProject}${src}/scripts/justValidate.js`

const srcDemoFoldersAndFIles =
	[`${pathToProject}${src}/docs`, `${pathToProject}${src}/img/demo`,]

const hint = '(enter [y], if you not, enter [enter] or another key and [enter])'
// The extension of the source files.
const srcExt = '.src.ts'

deleteDemoContent()
cleanReadmeFilesAndFolders()
deleteSnippets()
deleteDemoProject()

await setImportModules()
await setModules()

console.log('I wish You a successful job! 🎆🎆🎆')


async function setImportModules() {
	await setImportModule(
		`Just-validate`,
		'// setupValidateJs,',
		'justValidate: true,',
		justValidateFile)

	await setImportModule(
		`Swiper-slider`,
		'// setupSwiperCss, setupSwiperJs,',
		'swiper: true,',
		slidersFile)

	await setImportModule(
		`Typed`,
		'// setupTypedJs,', '')

	await setImportModule(
		`Input Mask`,
		'// setupInputMaskJs,', '')

	await setImportModule(
		`Air Date Picker`,
		'// setupAirDatePickerJs, setupAirDatePickerCss,', '')
	await setImportModule(
		`Photo Swipe`,
		'// setupAirDatePickerJs, setupAirDatePickerCss,', '')
}
async function setModules() {
	await includeModuleByQuestion({
		moduleName: 'Sidebar',
		scriptPath: `${scriptModules}sidebar${srcExt}`,
		styleFilePath: `${stylesModules}sidebar.sass`,
		htmlPath: null,
		htmlConnectStrings: ["sidebar: true,"],
	})
	await includeModuleByQuestion({
		moduleName: 'Modal-Window',
		scriptPath: `${scriptModules}modalWindow${srcExt}`,
		styleFilePath: null,
		htmlPath: `${componentsFolder}_modals.htm`,
		htmlConnectStrings: ["@@include('components/_modals.htm', {})", "modalWindow: true,"],
	})
	await includeModuleByQuestion({
		moduleName: 'Burger-menu',
		scriptPath: `${scriptModules}burgerMenu${srcExt}`,
		styleFilePath: `${stylesModules}burgerMenu.sass`,
		htmlPath: null,
		htmlConnectStrings: ["burgerMenu: true,"],
	})
	await includeModuleByQuestion({
		moduleName: 'Spoilers',
		scriptPath: `${scriptModules}spoiler${srcExt}`,
		styleFilePath: `${stylesModules}spoiler.sass`,
		htmlPath: null,
		htmlConnectStrings: ["spoilers: true,"],
	})
	await includeModuleByQuestion({
		moduleName: 'Filter',
		scriptPath: `${scriptModules}filter${srcExt}`,
		styleFilePath: null,
		htmlPath: null,
		htmlConnectStrings: null,
	})
	await includeModuleByQuestion({
		moduleName: 'Submenu',
		scriptPath: `${scriptModules}submenu${srcExt}`,
		styleFilePath: `${stylesModules}submenu.sass`,
		htmlPath: null,
		htmlConnectStrings: ["submenu: true,"]
	})
	await includeModuleByQuestion({
		moduleName: 'Tabs',
		scriptPath: `${scriptModules}tab${srcExt}`,
		styleFilePath: null,
		htmlPath: null,
		htmlConnectStrings: ["tabs: true,"]
	})
	await includeModuleByQuestion({
		moduleName: 'Element-modal',
		scriptPath: `${scriptModules}elementModal${srcExt}`,
		styleFilePath: null,
		htmlPath: null,
		htmlConnectStrings: ["elementModal: true,"]
	})
	await includeModuleByQuestion({
		moduleName: 'Parallax',
		scriptPath: `${scriptModules}parallax${srcExt}`,
		styleFilePath: null,
		htmlPath: null,
		htmlConnectStrings: ["parallax: true,"]
	})
	await includeModuleByQuestion({
		moduleName: 'ScrollToElement',
		scriptPath: `${scriptModules}scrollToElement${srcExt}`,
		styleFilePath: null,
		htmlPath: null,
		htmlConnectStrings: ["scrollToElement: true,"]
	})
	await includeModuleByQuestion({
		moduleName: 'Animations by scroll',
		scriptPath: `${scriptModules}animateByScroll${srcExt}`,
		styleFilePath: null,
		htmlPath: null,
		htmlConnectStrings: ["animateByScroll: true,"]
	})
	await includeModuleByQuestion({
		moduleName: 'Horizontal scroll',
		scriptPath: `${scriptGeneral}horizontalScroll.ts`,
		styleFilePath: null,
		htmlPath: null,
		htmlConnectStrings: ["horizontalScroll: true,"]
	})
	await includeModuleByQuestion({
		moduleName: 'Swipe module',
		scriptPath: `${scriptModules}swipe${srcExt}`,
		styleFilePath: null,
		htmlPath: null,
		htmlConnectStrings: ["swipe: true,"]
	})
	await includeModuleByQuestion({
		moduleName: 'Form styles',
		scriptPath: '',
		styleFilePath: `${stylesModules}form.sass`,
		htmlPath: null,
		htmlConnectStrings: ["formStyles: true,"]
	})
}
function deleteDemoContent() {
	try {
		for (let pathToDemo of srcDemoFoldersAndFIles) {
			fs.removeSync(pathToDemo)
		}

		console.log('✅ The demo content have been deleted.')
	} catch (error) {
		console.log('❌' + error)
	}
}
function cleanReadmeFilesAndFolders() {
	try {
		fs.emptyDirSync(readmeFolder)
		fs.removeSync(`${pathToProject}/README.md`)
		fs.createFileSync('README.md')

		console.log('✅ The readme folder and file are clean.')
	} catch (error) {
		console.log('❌' + error)
	}
}
function deleteDemoProject() {
	try {
		fs.removeSync(demoProjectFolderName)

		console.log('✅ Demo Project have been deleted.')
	} catch (error) {
		console.log('❌' + error)
	}
}
function deleteSnippets() {
	try {
		fs.removeSync(snippetsFolderName)

		console.log('✅ Snippets have been deleted.')
	} catch (error) {
		console.log('❌' + error)
	}
}

async function setImportModule(importModuleName, importModuleGulpTasksString, htmlConnectString, fileToDelete) {
	let answer = readline.question(`Import the ${importModuleName}? ${hint}`).toLowerCase()

	if (answer !== 'y') {
		await replace({
			files: mainHtmlFile,
			from: htmlConnectString,
			to: '',
		})

		fs.removeSync(fileToDelete)
	} else {
		let connectScring = importModuleGulpTasksString.replace('// ', '')

		await replace({
			files: gulpFile,
			from: importModuleGulpTasksString,
			to: connectScring,
		})
	}
}

async function includeModuleByQuestion(
	{ moduleName, scriptPath, styleFilePath, htmlPath, htmlConnectStrings }) {
	let questionString = `Include the ${moduleName}? ${hint}`
	let answer = readline.question(questionString).toLowerCase()

	if (answer === 'y')
		return

	if (scriptPath) {
		fs.removeSync(scriptPath)

		let scriptNameWithoutExp = path.basename(scriptPath, srcExt)
		let scriptConnFileName = `${scriptNameWithoutExp}.ts`

		fs.removeSync(scriptGeneral + scriptConnFileName)
	}
	if (styleFilePath) {
		fs.removeSync(styleFilePath)
	}
	if (htmlPath) {
		fs.removeSync(htmlPath)
	}
	if (htmlConnectStrings) {
		await replace({
			files: mainHtmlFile,
			from: htmlConnectStrings, to: '',
		})
	}
}