import fs from 'fs-extra'

export default function recreate() {
	fs.removeSync(paths.clean)
	return gulp.src(paths.scr.html)
}