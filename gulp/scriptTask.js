import { esbuild, gulpChanged, paths, gulp, browsersync, } from './importSources.js'

export default function scripts() {
	return gulp.src(paths.scr.scripts)
		.pipe(gulpChanged(paths.build.scripts, { extension: '.js' }))

		.pipe(esbuild({
			target: 'es2018',
		}))

		.pipe(gulp.dest(paths.build.scripts))
		.pipe(browsersync.stream())
}