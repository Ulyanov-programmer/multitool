import ts from 'gulp-typescript';
import gulpChanged from "gulp-changed";

export function scripts() {
	return gulp.src(paths.scr.scripts)
		.pipe(gulpChanged(paths.build.scripts, { extension: '.js' }))

		.pipe(ts({
			target: 'es2018',
			allowJs: true,
		}))

		.pipe(gulp.dest(paths.build.scripts))
		.pipe(browsersync.stream());
}