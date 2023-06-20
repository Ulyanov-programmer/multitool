import loadPlugins from 'gulp-load-plugins'
export let $ = loadPlugins({
  overridePattern: true,
  pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'postcss-*', 'posthtml-*',],
  config: process.env.npm_package_json,
})

import gulp from 'gulp'
import { paths } from './gulp/paths.js'
import browsersyncFunc from './gulp/browserSync.js'
export const isProd = process.argv.includes('--prod')


import html from './gulp/html.js'
import php from './gulp/php.js'
import css, { environmentCss } from './gulp/css.js'
import scripts, { libs } from './gulp/scripts.js'
import fonts, { fontsStyle } from './gulp/fonts.js'
import images, { imagesSvg } from './gulp/images.js'
import video from './gulp/video.js'
import deleteUnlinkFiles from './gulp/deleteUnlinkFiles.js'
import deleteDist from './gulp/deleteDist.js'


function watchFIles() {
  gulp.watch(paths.watch.html, { usePolling: true }, html)
    .on('unlink', (filePath) => {
      deleteUnlinkFiles(filePath)
    })
  gulp.watch(paths.watch.php, php)
    .on('unlink', (filePath) => {
      deleteUnlinkFiles(filePath)
    })
  gulp.watch(paths.watch.css, { usePolling: true }, css)
    .on('unlink', (filePath) => {
      deleteUnlinkFiles(filePath, ['.min.css', '.css'])
    })
  gulp.watch(paths.watch.cssNoAccessToDist, environmentCss)
  gulp.watch(paths.watch.scripts, scripts)
    .on('unlink', (filePath) => {
      deleteUnlinkFiles(filePath, ['.js'])
    })
  gulp.watch(paths.watch.scriptModules, scripts)
    .on('unlink', (filePath) => {
      deleteUnlinkFiles(filePath, ['.js'])
    })
  gulp.watch(paths.watch.images, images)
    .on('unlink', (filePath) => {
      deleteUnlinkFiles(filePath, ['.webp', '.avif'])
    })
  gulp.watch(paths.watch.imagesSvg, imagesSvg)
    .on('unlink', (filePath) => {
      deleteUnlinkFiles(filePath)
    })
  gulp.watch(paths.watch.video, video)
    .on('unlink', (filePath) => {
      deleteUnlinkFiles(filePath)
    })
}

const mainTasks = [
  html, css, environmentCss, fonts, scripts, php, imagesSvg, images, video,
]

let build = gulp.series(deleteDist, gulp.parallel(libs, mainTasks), fontsStyle)
let watch = gulp.parallel(build, watchFIles, browsersyncFunc)

gulp.task('build', build)
gulp.task('watch', watch)
gulp.task('default', watch)