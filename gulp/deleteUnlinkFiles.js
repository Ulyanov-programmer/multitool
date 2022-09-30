import { fs, source, project, } from './exportSources.js'
import * as path from 'path'

export default function deleteUnlinkFiles(filePath, fileNewExts = []) {
	let fileDistPath
	fileDistPath = filePath.replace(source, project)

	for (let fileNewExt of fileNewExts) {
		let fileDistPathWithNewExt = fileDistPath.replace(path.extname(fileDistPath), fileNewExt)

		if (fs.existsSync(fileDistPathWithNewExt)) {
			fs.removeSync(fileDistPathWithNewExt)
			console.log(`The File ${fileDistPathWithNewExt} has been deleted.`)
		}
	}

	if (fs.existsSync(fileDistPath)) {
		fs.removeSync(fileDistPath)
		console.log(`The File ${fileDistPath} has been deleted.`)
	}
}