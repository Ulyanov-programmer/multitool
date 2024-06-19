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
  associations: 'html',
  workingDirectory: paths.dest.root,
  options: {
    indent_size: 2,
    max_preserve_newlines: 1,
  },
  beautifyPluginSlug: 'html',
  reLaunchOn: ['change'],
})

new Beautify({
  associations: 'css',
  ignore: paths.dest.assets + '**',
  workingDirectory: paths.dest.root,
  options: {
    indent_size: 2,
  },
  beautifyPluginSlug: 'css',
  reLaunchOn: ['change'],
})

new Sharp({
  associations: '{gif,webp,avif,png,jpg,jpeg,svg}',
  ignore: paths.src.assets + '**',
  params: {
    sharpOptions: {},

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
  associations: '{otf,ttf}',
  ignore: paths.src.assets + '**',
  reLaunchOn: ['add'],
})

new Esbuild({
  associations: '{js,ts}',
  ignore: paths.src.assets + '**',
  params: {
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
  associations: 'html',
  ignore: [paths.src.assets + '**', paths.src.htmlComponents + '**'],
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
  associations: 'pcss',
  ignore: paths.src.assets + '**',
  plugins: plugins,
  outputExtname: 'css',
  reLaunchOn: ['change'],
})



chokidar.watch(paths.src.root + 'components/*.html')
  .on('change', () => posthtmlConfig.runProcess())
