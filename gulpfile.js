import gulp from "gulp";
import browsersync from 'browser-sync';
import gulpIf from 'gulp-if';
import { paths } from "./gulp/paths.js";
import fs from 'fs-extra';

global.gulp = gulp;
global.if = gulpIf;
global.isProd = process.argv.includes('--prod');
global.paths = paths;
global.browsersync = browsersync;

import { html } from "./gulp/html.js";
import { php } from "./gulp/php.js";
import { css } from "./gulp/css.js";
import { scripts } from "./gulp/scriptTask.js";
import { scriptModules } from "./gulp/moduleTask.js";
import { fontsStyle, fonts } from "./gulp/fonts.js";
import { images, imagesSvg } from "./gulp/images.js";
import { setupSwiperCss, setupSwiperJs } from "./gulp/swiperInit.js";
import { setupValidateJs } from "./gulp/jvInit.js";
import browserSyncFunc from "./gulp/browserSync.js";


function watchFIles() {
	gulp.watch(paths.watch.html, { usePolling: true }, html);
	gulp.watch(paths.watch.php, { usePolling: true }, php);
	gulp.watch([paths.watch.css, paths.watch.demoCss], { usePolling: true }, css);
	gulp.watch(paths.watch.scripts, { usePolling: true }, scripts);
	gulp.watch(paths.watch.scriptModules, { usePolling: true }, scriptModules);
	gulp.watch(paths.watch.images, { usePolling: true }, images);
	gulp.watch(paths.watch.imagesSvg, { usePolling: true }, imagesSvg);
}
function recreate() {
	fs.removeSync(paths.clean)
	return gulp.src(paths.scr.html)
}
let importModuleGulpTasks = [
	setupSwiperCss, setupSwiperJs, setupValidateJs,
]

let build = gulp.series(recreate, importModuleGulpTasks,
	gulp.parallel(scripts, scriptModules, css, html, php, images, imagesSvg, fonts), fontsStyle);

let watch = gulp.parallel(build, watchFIles, browserSyncFunc);

gulp.task('build', build);
gulp.task('watch', watch);
gulp.task('default', watch);