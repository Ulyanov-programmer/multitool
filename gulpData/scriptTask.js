import ts from 'gulp-typescript';
import gulpChanged from "gulp-changed";
import plumber from "gulp-plumber";


export function scripts() {
	return gulp.src(paths.scr.scripts)
		.pipe(plumber())
		.pipe(gulpChanged(paths.build.scripts, { extension: '.js' }))

		.pipe(ts({
			target: 'es2018',
			allowJs: true,
			noEmitOnError: true,
			isolatedModules: true,
		}))

		.pipe(gulp.dest(paths.build.scripts))
		.pipe(browsersync.stream());
}