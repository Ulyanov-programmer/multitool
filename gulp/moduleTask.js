import { esbuild, gulpIf, isProd, paths, gulp, browsersync, gulpChanged } from './exportSources.js'

export default function scriptModules() {
	return gulp.src(paths.scr.scriptModules)
		.pipe(gulpChanged(paths.build.scriptModules, { extension: '.js' }))

		.pipe(
			gulpIf(isProd,
				// If gulp run with the --prod flag.
				esbuild({
					target: 'es2018',
					minify: true,
				}),
				// If gulp run without the --prod flag.
				esbuild({
					target: 'es2018',
				})
			)
		)
		.pipe(gulp.dest(paths.build.scriptModules))
		.pipe(browsersync.stream())
}