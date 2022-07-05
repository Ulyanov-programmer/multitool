import gulp from "gulp";
import browsersync from 'browser-sync';
import gulpIf from 'gulp-if';
import { paths } from "./gulpData/paths.js";

global.gulp = gulp;
global.if = gulpIf;
global.isProd = process.argv.includes('--prod');
global.paths = paths;
global.browsersync = browsersync;

import { html } from "./gulpData/html.js";
import { php } from "./gulpData/php.js";
import { css } from "./gulpData/css.js";
import { scripts } from "./gulpData/scriptTask.js";
import { scriptModules } from "./gulpData/moduleTask.js";
import { fontsStyle, fonts } from "./gulpData/fonts.js";
import { images } from "./gulpData/images.js";
import { setupSwiperCss, setupSwiperJs } from "./gulpData/swiperInit.js";
import { setupValidateJs } from "./gulpData/jvInit.js";
import browserSyncFunc from "./gulpData/browserSync.js";
import del from 'del';


function watchFIles() {
	gulp.watch(paths.watch.html, { usePolling: true }, html);
	gulp.watch(paths.watch.php, { usePolling: true }, php);
	gulp.watch([paths.watch.css, paths.watch.demoCss], { usePolling: true }, css);
	gulp.watch(paths.watch.scripts, { usePolling: true }, scripts);
	gulp.watch(paths.watch.scriptModules, { usePolling: true }, scriptModules);
	gulp.watch(paths.watch.images, { usePolling: true }, images);
}
function recreate() {
	return del(paths.clean);
}
let importModuleGulpTasks = [
	setupSwiperCss, setupSwiperJs, setupValidateJs,
]

let build = gulp.series(recreate, importModuleGulpTasks,
	gulp.parallel(scripts, scriptModules, css, html, php, images, fonts), fontsStyle);

let watch = gulp.parallel(build, watchFIles, browserSyncFunc);

gulp.task('build', build);
gulp.task('watch', watch);
gulp.task('default', watch);