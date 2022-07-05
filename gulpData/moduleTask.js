import esbuild from 'gulp-esbuild';
import gulpChanged from "gulp-changed";
import plumber from "gulp-plumber";

export function scriptModules() {
	return gulp.src(paths.scr.scriptModules)
		.pipe(plumber())
		.pipe(gulpChanged(paths.build.scriptModules, { extension: '.js' }))

		.pipe(
			global.if(global.isProd,
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
		.pipe(browsersync.stream());
}