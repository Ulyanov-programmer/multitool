import gulp from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import cleanCss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import header from 'gulp-header'
import browsersync from 'browser-sync'
import gulpIf from 'gulp-if'
import fileInclude from 'gulp-file-include'
import plumber from 'gulp-plumber'
import imgToPicture from 'gulp-html-img-to-picture'
import versionNumber from 'gulp-version-number'
import fs from 'fs-extra'
import ttf2woff2 from 'gulp-ttf2woff2'
import squoosh from 'gulp-libsquoosh'
import svgmin from 'gulp-svgmin'
import esbuild from 'gulp-esbuild'
import gulpChanged from 'gulp-changed'
import { parseNumericWeightFromName, parseStyleFromName, numericFontWeightMap } from 'parse-font-name'
import { paths } from './paths.js'
import browsersyncFunc from './browserSync.js'
import { fontsFIlePath } from './paths.js'
const sass = gulpSass(dartSass)
const isProd = process.argv.includes('--prod')

export { numericFontWeightMap, parseStyleFromName, parseNumericWeightFromName, browsersyncFunc, gulpChanged, esbuild, svgmin, squoosh, fontsFIlePath, ttf2woff2, fs, versionNumber, imgToPicture, plumber, fileInclude, gulp, paths, gulpIf, isProd, browsersync, sass, cleanCss, autoprefixer, rename, header }