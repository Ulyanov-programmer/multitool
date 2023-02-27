import gulp from 'gulp'
import { paths } from './gulp/paths.js'
import browsersyncFunc from './gulp/browserSync.js'

import html from './gulp/html.js'
import php from './gulp/php.js'
import css from './gulp/css.js'
import scripts from './gulp/scriptTask.js'
import scriptModules from './gulp/moduleTask.js'
import fonts, { fontsStyle } from './gulp/fonts.js'
import images, { imagesSvg } from './gulp/images.js'
import deleteUnlinkFiles from './gulp/deleteUnlinkFiles.js'
import libs from './gulp/importModules.js'


function watchFIles() {
  gulp.watch(paths.watch.html, { usePolling: true }, html).on('unlink', (filePath) => {
    deleteUnlinkFiles(filePath)
  })
  gulp.watch(paths.watch.php, php).on('unlink', (filePath) => {
    deleteUnlinkFiles(filePath)
  })
  gulp.watch([paths.watch.css, paths.watch.demoCss], { usePolling: true }, css).on('unlink', (filePath) => {
    deleteUnlinkFiles(filePath, ['.min.css', '.css'])
  })
  gulp.watch(paths.watch.scripts, scripts).on('unlink', (filePath) => {
    deleteUnlinkFiles(filePath, ['.js'])
  })
  gulp.watch(paths.watch.scriptModules, scriptModules).on('unlink', (filePath) => {
    deleteUnlinkFiles(filePath, ['.js'])
  })
  gulp.watch(paths.watch.images, images).on('unlink', (filePath) => {
    deleteUnlinkFiles(filePath, ['.webp', '.avif'])
  })
  gulp.watch(paths.watch.imagesSvg, imagesSvg).on('unlink', (filePath) => {
    deleteUnlinkFiles(filePath)
  })
}

const mainTasks = [
  html, css, fonts, scriptModules, scripts, php, imagesSvg, images,
]


let build = gulp.series(gulp.parallel(libs, mainTasks), fontsStyle)
let watch = gulp.parallel(build, watchFIles, browsersyncFunc)

gulp.task('build', build)
gulp.task('watch', watch)
gulp.task('default', watch)