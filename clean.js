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
const stylesModules = `${pathToProject}${src}/styles/modules/`


const fontsGitkeep = `${src}/fonts/.gitkeep`
const mainStyleFile = `${src}/styles/style.styl`
const mainHtmlFile = `${src}/index.html`
const mainScriptFile = `${src}/scripts/script.ts`
const gulpSliderConnectionFile = `${pathToProject}/gulpfile.js`
const slidersFile = `${pathToProject}${src}/scripts/sliders.js`



const srcDemoFoldersAndFIles =
	[`${src}/img/demo`, `${src}/styles/_demoStyles.styl`, `${src}/_demo.htm`,];

const demoStyles = {
	files: pathToProject + mainStyleFile,
	from: "@import '_demoStyles';", to: '',
};
const demoHtml = {
	files: pathToProject + mainHtmlFile,
	from: "@@include('_demo.htm')", to: '',
};
const hint = '(enter [y], if you not, enter [key enter or another])';


deleteFontsGitkeep()
await deleteDemoContent()
cleanReadmeFilesAndFolders()
deleteSnippets()
deleteDemoProject()
console.log('Initialize the slider? ' + hint);
await setSlider()
await setModules()

console.log('🎆🎆🎆 I wish You a successful job!');

async function setModules() {
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

	await includeModuleByQuestion(`Include Animations by scroll? ${hint}`,
		`${scriptModules}animateByScroll.ts`)

	await includeModuleByQuestion(`Include Searchbar styles? ${hint}`,
		``, `${stylesModules}_searchbar.styl`)
}
function deleteFontsGitkeep() {
	try {
		fs.removeSync(pathToProject + fontsGitkeep)

		console.log('✅ .gitkeep in fonts folder have been deleted.');
	} catch (error) {
		console.log('❌' + error);
	}
}
async function deleteDemoContent() {
	try {
		for (const pathToDemo of srcDemoFoldersAndFIles) {
			fs.removeSync(pathToProject + pathToDemo)
		}
		await replace(demoStyles)
		await replace(demoHtml)

		console.log('✅ The demo content have been deleted.');
	} catch (error) {
		console.log('❌' + error);
	}
}
function cleanReadmeFilesAndFolders() {
	try {
		fs.emptyDir(pathToProject + readmeFolder)
		fs.removeSync('./README.md')
		fs.createFileSync('README.md')

		console.log('✅ The readme folder and file are clean.');
	} catch (error) {
		console.log('❌' + error);
	}
}
function deleteDemoProject() {
	try {
		fs.removeSync(pathToProject + demoProjectFolderName)

		console.log('✅ Demo Project have been deleted.');
	} catch (error) {
		console.log('❌' + error);
	}
}
function deleteSnippets() {
	try {
		fs.removeSync(pathToProject + snippetsFolderName)

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
		fs.removeSync(slidersFile)
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