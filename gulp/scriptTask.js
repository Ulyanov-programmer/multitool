import esbuild from 'gulp-esbuild';
import gulpChanged from "gulp-changed";

export function scripts() {
	return gulp.src(paths.scr.scripts)
		.pipe(gulpChanged(paths.build.scripts, { extension: '.js' }))

		.pipe(esbuild({
			target: 'es2018',
		}))

		.pipe(gulp.dest(paths.build.scripts))
		.pipe(browsersync.stream());
}