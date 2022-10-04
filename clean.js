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
const phpFolder = `${pathToProject}${src}/php/`

const fontsGitkeep = `${src}/fonts/.gitkeep`
const mainStyleFile = `${pathToProject}${src}/styles/index.sass`
const mainHtmlFile = `${pathToProject}${src}/index.html`
const gulpImportModulesFile = `${pathToProject}/gulp/importModules.js`
const gulpFile = `${pathToProject}/gulpfile.js`

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

await setImportModules()
await setModules()
await setPhp()

console.log('I wish You a successful job! 🎆🎆🎆')


async function setImportModules() {
	await setImportModule(
		`Just-validate`,
		'justValidate',
		'justValidate: true,',
		`${pathToProject}${src}/scripts/justValidate.js`)

	await setImportModule(
		`Slider Swiper`,
		'swiper',
		'swiper: true,',
		`${pathToProject}${src}/scripts/sliders.js`)

	await setImportModule(
		`Typed`,
		'typed',
		'typed: true,',
		`${pathToProject}${src}/scripts/typed.js`)

	await setImportModule(
		`Input Mask`,
		'inputMask', '')

	await setImportModule(
		`Air Date Picker`,
		'airDatePicker', '')

	await setImportModule(
		`Photo Swipe`,
		'photoSwipe',
		'photoSwipe: true,',
		`${pathToProject}${src}/scripts/photoSwipe.js`)
}
async function setModules() {
	await includeModuleByQuestion({
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
				strings: 'burgerMenu: true,',
			},
		],
	})
	await includeModuleByQuestion({
		moduleName: 'Sidebar',
		scriptPaths: [
			`${scriptModules}sidebar${srcExt}`,
			`${scriptGeneral}sidebar.ts`,
		],
		styleFilePath: `${stylesModules}sidebar.sass`,
		htmlPath: null,
		htmlConnectStrings: [{ strings: 'sidebar: true,' }],
	})
	await includeModuleByQuestion({
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
				strings: ["<%- include('components/_modals.htm', {}) %>", "modalWindow: true,"]
			},
		],
	})
	await includeModuleByQuestion({
		moduleName: 'Spoilers',
		scriptPaths: [
			`${scriptModules}spoiler${srcExt}`,
			`${scriptGeneral}spoiler.ts`,
		],
		styleFilePath: `${stylesModules}spoiler.sass`,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'spoiler: true,' }],
	})
	await includeModuleByQuestion({
		moduleName: 'Filter',
		scriptPaths: [
			`${scriptModules}filter${srcExt}`,
			`${scriptGeneral}filter.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: null,
	})
	await includeModuleByQuestion({
		moduleName: 'Submenu',
		scriptPaths: [
			`${scriptModules}submenu${srcExt}`,
			`${scriptGeneral}submenu.ts`,
		],
		styleFilePath: `${stylesModules}submenu.sass`,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'submenu: true,' }],
	})
	await includeModuleByQuestion({
		moduleName: 'Tabs',
		scriptPaths: [
			`${scriptModules}tab${srcExt}`,
			`${scriptGeneral}tab.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'tabs: true,' }],
	})
	await includeModuleByQuestion({
		moduleName: 'Element-modal',
		scriptPaths: [
			`${scriptModules}elementModal${srcExt}`,
			`${scriptGeneral}elementModal.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'elementModal: true,' }],
	})
	await includeModuleByQuestion({
		moduleName: 'Parallax',
		scriptPaths: [
			`${scriptModules}parallax${srcExt}`,
			`${scriptGeneral}parallax.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'parallax: true,' }],
	})
	await includeModuleByQuestion({
		moduleName: 'ScrollToElement',
		scriptPaths: [
			`${scriptModules}scrollToElement${srcExt}`,
			`${scriptGeneral}scrollToElement.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'scrollToElement: true,' }],
	})
	await includeModuleByQuestion({
		moduleName: 'Animations by scroll',
		scriptPaths: [
			`${scriptModules}animateByScroll${srcExt}`,
			`${scriptGeneral}animateByScroll.ts`,
			`${scriptGeneral}scroll-timeline.js`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'animateByScroll: true,' }],
	})
	await includeModuleByQuestion({
		moduleName: 'Horizontal scroll',
		scriptPaths: [
			`${scriptGeneral}horizontalScroll.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'horizontalScroll: true,' }],
	})
	await includeModuleByQuestion({
		moduleName: 'Swipe module (required to switch a sidebar by swipe)',
		scriptPaths: [
			`${scriptModules}swipe${srcExt}`,
			`${scriptGeneral}swipe.ts`,
		],
		styleFilePath: null,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'swipe: false,' }],
	})
	await includeModuleByQuestion({
		moduleName: 'Form styles',
		scriptPaths: [],
		styleFilePath: `${stylesModules}form.sass`,
		htmlPaths: null,
		htmlConnectStrings: [{ strings: 'formStyles: true,' }],
	})
}
async function setPhp() {
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

async function setImportModule(importModuleName, importFileVariableName, htmlConnectString, fileToDelete) {
	if (readline.keyInYNStrict(`Import the ${importModuleName}?`) == false) {
		await replace({
			files: mainHtmlFile,
			from: htmlConnectString,
			to: '',
		})
		await replace({
			files: gulpImportModulesFile,
			from: `export let ${importFileVariableName}`,
			to: `let ${importFileVariableName}`,
		})

		fs.removeSync(fileToDelete)
	}
}

async function includeModuleByQuestion(
	{ moduleName, scriptPaths, styleFilePath, htmlPaths, htmlConnectStrings }) {

	if (readline.keyInYNStrict(`Include the ${moduleName}?`))
		return

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
	if (htmlConnectStrings) {
		for (let htmlConnectStringData of htmlConnectStrings) {
			if (htmlConnectStringData.path == undefined)
				htmlConnectStringData.path = mainHtmlFile

			await replace({
				files: htmlConnectStringData.path,
				from: htmlConnectStringData.strings, to: '',
			})
		}
	}
}