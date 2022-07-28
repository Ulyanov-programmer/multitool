import fs from "fs";

const mainJsFilePath = 'node_modules/just-validate/dist/just-validate.production.min.js'

export function setupValidateJs() {
  if (fs.existsSync(mainJsFilePath)) {
    let modules = [mainJsFilePath];
		
    return gulp.src(modules)
      .pipe(gulp.dest(paths.build.scripts));
  } else {
    return gulp.src(paths.scr.scripts);
  }
};