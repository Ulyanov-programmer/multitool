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


new Beautify({
  paths: {
    src: paths.dest.root + '*.html',
    dest: paths.dest.root,
  },
  options: {
    indent_size: 2,
    max_preserve_newlines: 1,
  },
  beautifyPlugin: 'html',
  reLaunchOn: ['change'],
})

new Beautify({
  paths: {
    src: paths.dest.styles + '*.css',
    dest: paths.dest.styles,
  },
  options: {
    indent_size: 2,
  },
  beautifyPlugin: 'css',
  reLaunchOn: ['change'],
})

new Beautify({
  paths: {
    src: paths.dest.scripts + '**/*.css',
    dest: paths.dest.scripts,
  },
  options: {
    indent_size: 2,
  },
  beautifyPlugin: 'css',
  reLaunchOn: ['change'],
})

new Sharp({
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
  reLaunchOn: ['add'],
})

new Ttf2Woff2({
  paths: {
    src: paths.src.fontsFolder + '*.{otf,ttf}',
    dest: paths.dest.fonts,
  },
  reLaunchOn: ['add'],
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
  reLaunchOn: ['change'],
})

new PostCss({
  paths: {
    src: paths.src.styles + '*.pcss',
    dest: paths.dest.styles,
  },
  plugins: plugins,
  outputExtname: 'css',
  reLaunchOn: ['change'],
})
new PostCss({
  paths: {
    src: paths.src.scripts + '**/*.pcss',
    dest: paths.dest.scripts,
  },
  plugins: plugins,
  outputExtname: 'css',
  reLaunchOn: ['change'],
})



chokidar.watch(paths.src.root + 'components/*.html')
  .on('change', () => posthtmlConfig.runProcess())
