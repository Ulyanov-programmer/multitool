import fs from "fs";

export function setupValidateJs() {
  if (fs.existsSync('node_modules/just-validate/dist/just-validate.production.min.js')) {
    let modules = [
      'node_modules/just-validate/dist/just-validate.production.min.js',
		];
    return gulp.src(modules)
      .pipe(gulp.dest(paths.build.scripts));
  } else {
    return gulp.src(paths.scr.scripts);
  }
};