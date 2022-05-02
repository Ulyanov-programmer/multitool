import ts from 'gulp-typescript';
import terser from 'gulp-terser';
import gulpChanged from "gulp-changed";

export function scriptModules() {
	return gulp.src(paths.scr.scriptModules)
		.pipe(gulpChanged(paths.build.scriptModules, { extension: '.js' }))
		
		.pipe(ts({
			target: 'es2018',
			allowJs: true,
		}))
		// use this if you're also annoyed that the gulp is shutdown due to a compiler error.
		.on('error', () => { })

		.pipe(
			global.if(global.isProd,
				terser({
					ecma: 2018,
					safari10: true,
				})
			)
		)
		.pipe(gulp.dest(paths.build.scriptModules))
		.pipe(browsersync.stream());
}