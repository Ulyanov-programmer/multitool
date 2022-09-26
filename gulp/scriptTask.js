import { esbuild, paths, gulp, browsersync, } from './importSources.js'

export default function scripts() {
	return gulp.src(paths.scr.scripts, { since: gulp.lastRun(scripts) })
		.pipe(esbuild({
			target: 'es2018',
		}))

		.pipe(gulp.dest(paths.build.scripts))
		.pipe(browsersync.stream())
}