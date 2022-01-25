import ts from 'gulp-typescript';
import terser from 'gulp-terser';
import fileinclude from "gulp-file-include";

export function scripts() {
  //? saving scripts files
  gulp.src(paths.scr.scripts)
    .pipe(fileinclude())
    .pipe(ts({
      target: 'ES6',
      allowJs: true,
    }))

    .pipe(gulp.dest(paths.build.scripts))
    .pipe(browsersync.stream());

  //? saving modules
  return gulp.src(paths.scr.scriptModules)
    .pipe(fileinclude())
    .pipe(ts({
      target: 'ES6',
      allowJs: true,
    }))
    // use this if you're also annoyed that the gulp is shutdown due to a compiler error.
    .on('error', () => { })

    // minimizing. Delete if you want to see not-minify files.
    .pipe(terser({
      ecma: 2016,
      safari10: true,
    }))
    .pipe(gulp.dest(paths.build.scriptModules))
    .pipe(browsersync.stream());
}