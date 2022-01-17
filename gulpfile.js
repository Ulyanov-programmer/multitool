import gulp from "gulp";
import browsersync from 'browser-sync';
import { paths } from "./gulpData/paths.js";

global.gulp = gulp;
global.paths = paths;
global.browsersync = browsersync;

import { html } from "./gulpData/html.js";
import { css } from "./gulpData/css.js";
import { scripts } from "./gulpData/someScripts.js";
import { fontsStyle, fonts } from "./gulpData/fonts.js";
import { images } from "./gulpData/images.js";
import { setupSwiperCss, setupSwiperJs } from "./gulpData/swiperInit.js";
import browserSyncFunc from "./gulpData/browserSync.js";
import del from 'del';


function watchFIles() {
  gulp.watch(paths.watch.html, html);
  gulp.watch([paths.watch.css], css);
  gulp.watch([paths.watch.scripts], scripts);
  gulp.watch([paths.watch.images], images);
}
function recreate() {
  return del(paths.clean);
}


let build = gulp.series(recreate, setupSwiperCss, setupSwiperJs, 
  gulp.parallel(scripts, css, html, images, fonts), fontsStyle);
  
let watch = gulp.parallel(build, watchFIles, browserSyncFunc);

gulp.task('build', build);
gulp.task('watch', watch);
gulp.task('default', watch);