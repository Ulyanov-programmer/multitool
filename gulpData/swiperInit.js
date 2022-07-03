import fs from "fs";

const mainJsFilePath = 'node_modules/swiper/swiper-bundle.min.js'
const mainCssFilePath = 'node_modules/swiper/swiper-bundle.min.css'

export function setupSwiperJs() {
  if (fs.existsSync(mainJsFilePath)) {
    const modules = [mainJsFilePath, `${mainJsFilePath}.map`];

    return gulp.src(modules)
      .pipe(gulp.dest(paths.build.scripts));
  } else {
    return gulp.src(paths.scr.scripts);
  }
};
export function setupSwiperCss() {
  if (fs.existsSync(mainCssFilePath)) {
    const swiperCss = [mainCssFilePath];
		
    return gulp.src(swiperCss)
      .pipe(gulp.dest(paths.build.css));
  } else {
    return gulp.src(paths.scr.css);
  }
};