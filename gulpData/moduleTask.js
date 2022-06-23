import ts from 'gulp-typescript';
import terser from 'gulp-terser';
import gulpChanged from "gulp-changed";
import plumber from "gulp-plumber";

export function scriptModules() {
	return gulp.src(paths.scr.scriptModules)
		.pipe(plumber())
		.pipe(gulpChanged(paths.build.scriptModules, { extension: '.js' }))
		
		.pipe(ts({
			target: 'es2018',
			allowJs: true,
			noEmitOnError: true,
			isolatedModules: true,
		}))

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