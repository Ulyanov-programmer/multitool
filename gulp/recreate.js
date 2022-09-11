import { fs, paths, gulp, } from './importSources.js'

export default function recreate() {
	fs.removeSync(paths.clean)
	return gulp.src(paths.scr.html)
}