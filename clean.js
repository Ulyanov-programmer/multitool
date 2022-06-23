import fs from 'fs-extra'
import path from 'path';
import replace from 'replace-in-file';
import * as readline from "readline-sync";


const pathToProject = path.resolve('./');
const demoProjectFolderName = `${pathToProject}/gulp_multitool`
const snippetsFolderName = `${pathToProject}/snippets`
const readmeFolder = `${pathToProject}/readmeFiles`
const src = '/#src'
const scriptModules = `${pathToProject}${src}/scripts/modules/`
const scriptGeneral = `${pathToProject}${src}/scripts/`
const stylesModules = `${pathToProject}${src}/styles/modules/`
const componentsFolder = `${pathToProject}${src}/components/`


const fontsGitkeep = `${src}/fonts/.gitkeep`
const mainStyleFile = `${pathToProject}${src}/styles/style.styl`
const mainHtmlFile = `${pathToProject}${src}/index.html`
const mainScriptFile = `${src}/scripts/script.ts`
const gulpSliderConnectionFile = `${pathToProject}/gulpfile.js`
const slidersFile = `${pathToProject}${src}/scripts/sliders.js`

const srcDemoFoldersAndFIles =
	[`${pathToProject}${src}/docs`, `${pathToProject}${src}/img/demo`,]

const hint = '(enter [y], if you not, enter [enter] or another key and [enter])';

deleteDemoContent()
cleanReadmeFilesAndFolders()
deleteSnippets()
deleteDemoProject()
console.log('Initialize the swiper-slider? ' + hint)
await setSlider()
await setModules()

console.log('🎆🎆🎆 I wish You a successful job!');

async function setModules() {
	await includeModuleByQuestion(
		'Modal-Window',
		`${scriptModules}modalWindow.ts`,
		null,
		`${componentsFolder}_modals.htm`,
		async () => {
			await replace({
				files: mainHtmlFile,
				from: `@@include('components/_modals.htm', {})`, to: '',
			})
		})
	await includeModuleByQuestion('Burger-menu', `${scriptModules}burgerMenu.ts`, `${stylesModules}_burgerMenu.styl`)
	await includeModuleByQuestion('Filter', `${scriptModules}filter.ts`)

	await includeModuleByQuestion('Spoilers', `${scriptModules}spoiler.ts`, `${stylesModules}_spoiler.styl`)
	await includeModuleByQuestion('Sidebar', `${scriptModules}sidebar.ts`, `${stylesModules}_sidebar.styl`)
	await includeModuleByQuestion('Submenu', `${scriptModules}submenu.ts`, `${stylesModules}_submenu.styl`)
	await includeModuleByQuestion('Tabs', `${scriptModules}tab.ts`)
	await includeModuleByQuestion('Element-modal', `${scriptModules}elementModal.ts`)
	await includeModuleByQuestion('Parallax', `${scriptModules}parallax.ts`)
	await includeModuleByQuestion('ScrollToElement', `${scriptModules}scrollToElement.ts`)
	await includeModuleByQuestion('Animations by scroll', `${scriptModules}animateByScroll.ts`)
	await includeModuleByQuestion('Swipe module', `${scriptModules}swipe.ts`)
	await includeModuleByQuestion('Searchbar styles', ``, `${stylesModules}_searchbar.styl`)
	await includeModuleByQuestion('Form styles', ``, `${stylesModules}_form.styl`)

}
function deleteDemoContent() {
	try {
		for (let pathToDemo of srcDemoFoldersAndFIles) {
			fs.removeSync(pathToDemo)
		}

		console.log('✅ The demo content have been deleted.');
	} catch (error) {
		console.log('❌' + error)
	}
}
function cleanReadmeFilesAndFolders() {
	try {
		fs.emptyDirSync(readmeFolder)
		fs.removeSync(`${pathToProject}/README.md`)
		fs.createFileSync('README.md')

		console.log('✅ The readme folder and file are clean.');
	} catch (error) {
		console.log('❌' + error);
	}
}
function deleteDemoProject() {
	try {
		fs.removeSync(demoProjectFolderName)

		console.log('✅ Demo Project have been deleted.');
	} catch (error) {
		console.log('❌' + error);
	}
}
function deleteSnippets() {
	try {
		fs.removeSync(snippetsFolderName)

		console.log('✅ Snippets have been deleted.');
	} catch (error) {
		console.log('❌' + error);
	}
}

async function setSlider(questionString) {
	let answer = readline.question(questionString).toLowerCase()

	if (answer !== 'y') {
		await replace({
			files: gulpSliderConnectionFile,
			from: `let build = gulp.series(recreate, setupSwiperCss, setupSwiperJs,`,
			to: 'let build = gulp.series(recreate,',
		})
		await replace({
			files: mainHtmlFile,
			from: ['<!-- Swiper -->',
				'<link rel="stylesheet" href="css/swiper-bundle.min.css">',
				'<script defer src="scripts/swiper-bundle.min.js"></script>',
				'<script type="module" src="scripts/sliders.js"></script>'],
			to: '',
		})
		fs.removeSync(slidersFile)
	}
}

async function includeModuleByQuestion(moduleName, scriptPath, stylePath, htmlPath, replaceFunc) {
	let questionString = `Include the ${moduleName}? ${hint}`
	let answer = readline.question(questionString).toLowerCase()

	if (answer === 'y')
		return

	if (scriptPath) {
		fs.removeSync(scriptPath)

		let scriptNameWithoutExp = path.basename(scriptPath, '.ts')
		let scriptConnFileName = `${scriptNameWithoutExp}API.ts`

		fs.removeSync(scriptGeneral + scriptConnFileName)
	}
	if (stylePath) {
		fs.removeSync(stylePath)

		let styleModuleName = path.basename(stylePath, '.styl')

		await replace({
			files: mainStyleFile,
			from: `@import 'modules/${styleModuleName}';`, to: '',
		})
	}
	if (htmlPath) {
		fs.removeSync(htmlPath)
	}
	if (replaceFunc) {
		await replaceFunc()
	}
}