import chokidar from 'chokidar'
import paths from './plugins/other/paths.js'

import { Sharp } from './plugins/sharp.js'
import { Ttf2Woff2 } from './plugins/ttf2woff2.js'
import { Esbuild } from './plugins/esbuild.js'
import { Beautify } from './plugins/beautify.js'

import { PostCss } from './plugins/postcss.js'
import { plugins } from './plugins/other/postcssConfig.js'

import { PostHtml } from './plugins/posthtml.js'
import component from 'posthtml-component'
import imgAutosize from 'posthtml-img-autosize'

import { isDeleteDistBeforeLaunch, isProductionMode }
  from './plugins/other/environment.js'

// import './grunt/other/server.js'
import './plugins/other/fontsWriting.js' // Parsing fonts into the style file



if (isDeleteDistBeforeLaunch) {
  await import('./plugins/other/deleteDist.js')
  await import('./plugins/other/cleanCache.js')
}

import './plugins/other/copy.js'


const beautifyHtml = new Beautify({
  paths: {
    src: paths.dest.root + '*.html',
    dest: paths.dest.root,
  },
  options: {
    indent_size: 2,
    max_preserve_newlines: 1,
  },
  beautifyPlugin: 'html',
  runOnInit: false,
})

const beautifyCss = new Beautify({
  paths: {
    src: paths.dest.styles + '*.css',
    dest: paths.dest.styles,
  },
  options: {
    indent_size: 2,
  },
  beautifyPlugin: 'css',
  runOnInit: false,
})

const beautifyScriptCss = new Beautify({
  paths: {
    src: paths.dest.scripts + '**/*.css',
    dest: paths.dest.scripts,
  },
  options: {
    indent_size: 2,
  },
  beautifyPlugin: 'css',
  runOnInit: false,
})

chokidar.watch(beautifyHtml.srcPath)
  .on('change', path => beautifyHtml.runProcess(path))

chokidar.watch(beautifyCss.srcPath)
  .on('change', path => beautifyCss.runProcess(path))

chokidar.watch(beautifyScriptCss.srcPath)
  .on('change', path => beautifyScriptCss.runProcess(path))


const sharpConfig = new Sharp({
  paths: {
    src: paths.src.images + '**/*.{gif,webp,avif,png,jpg,jpeg,svg}',
    dest: paths.dest.images,
  },
  options: {
    sharpOptions: {},
    logLevel: 'small',

    png: {
      quality: 90,

      webp: {},
      avif: {},
    },
    jpg: {
      mozjpeg: true,

      webp: {},
      avif: {},
    },
    gif: {
      webp: {},
    },
    webp: {},
    avif: {},
  },
})

const ttf2woff2Config = new Ttf2Woff2({
  paths: {
    src: paths.src.fontsFolder + '*.{otf,ttf}',
    dest: paths.dest.fonts,
  },
})

new Esbuild({
  paths: {
    src: paths.src.scripts + '**/*.{js,ts}',
  },
  options: {
    target: 'es2022',
    bundle: false,
    outdir: paths.dest.scripts,
    //? Necessary if the task works with only one file.
    outbase: paths.src.scripts,
    watchMode: true,
    minify: isProductionMode,
  },
})

const posthtmlConfig = new PostHtml({
  paths: {
    src: paths.src.root + '*.html',
    dest: paths.dest.root,
  },
  plugins: [
    component({
      root: paths.src.root,
      folders: ['components'],
    }),
    imgAutosize({
      root: paths.dest.root,
      processEmptySize: true,
    }),
  ],
})

const postcssConfig = new PostCss({
  paths: {
    src: paths.src.styles + '*.pcss',
    dest: paths.dest.styles,
  },
  plugins: plugins,
  outputExtname: 'css',
})
const postcssForScriptsConfig = new PostCss({
  paths: {
    src: paths.src.scripts + '**/*.pcss',
    dest: paths.dest.scripts,
  },
  plugins: plugins,
  outputExtname: 'css',
})


chokidar.watch(posthtmlConfig.srcPath)
  .on('change', path => posthtmlConfig.runProcess(path))

chokidar.watch(paths.src.root + 'components/*.html')
  .on('change', () => posthtmlConfig.runProcess())

chokidar.watch(postcssConfig.srcPath)
  .on('change', path => postcssConfig.runProcess(path))

chokidar.watch(postcssForScriptsConfig.srcPath)
  .on('change', path => postcssForScriptsConfig.runProcess(path))

chokidar.watch(ttf2woff2Config.srcPath, { ignoreInitial: true })
  .on('add', path => ttf2woff2Config.runProcess(path))

chokidar.watch(sharpConfig.srcPath, { ignoreInitial: true })
  .on('add', path => sharpConfig.runProcess(path))