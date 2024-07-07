import { paths } from './paths.js'

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

// import './plugins/other/server.js'
import './plugins/other/fontsWriting.js' // Parsing fonts into the style file



// Delete the dict folder and clear the cache if the --update-dist flag is set.
if (isDeleteDistBeforeLaunch) {
  await import('./plugins/other/deleteDist.js')
  await import('./plugins/other/cleanCache.js')
}

import './plugins/other/copy.js'


new Beautify({
  associations: 'html',
  workingDirectory: paths.output.root,
  options: {
    indent_size: 2,
    max_preserve_newlines: 1,
  },
  beautifyPluginSlug: 'html',
  watchEvents: ['change'],
})

new Beautify({
  associations: 'css',
  ignore: paths.output.assets + '**',
  workingDirectory: paths.output.root,
  options: {
    indent_size: 2,
  },
  beautifyPluginSlug: 'css',
  watchEvents: ['change'],
})

new Sharp({
  associations: '{gif,webp,avif,png,jpg,jpeg,svg}',
  ignore: paths.sources.assets + '**',
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
  watchEvents: ['add', 'changed'],
})

new Ttf2Woff2({
  associations: '{otf,ttf}',
  ignore: paths.sources.assets + '**',
  watchEvents: ['add'],
})

new Esbuild({
  associations: '{js,ts}',
  ignore: paths.sources.assets + '**',
  params: {
    target: 'es2022',
    bundle: false,
    outdir: paths.output.scripts,
    //? Necessary if the task works with only one file.
    outbase: paths.sources.scripts,
    watchMode: true,
    minify: isProductionMode,
  },
})

new PostHtml({
  associations: 'html',
  ignore: [paths.sources.assets + '**', paths.sources.htmlComponents + '**'],
  plugins: [
    component({
      root: paths.sources.root,
      folders: ['components'],
    }),
    imgAutosize({
      root: paths.output.root,
      processEmptySize: true,
    }),
  ],
  watchEvents: ['change'],
  thirdPartyFiles: [
    paths.sources.htmlComponents + '*.html',
  ],
})

new PostCss({
  associations: 'pcss',
  ignore: paths.sources.assets + '**',
  plugins: plugins,
  outputExtname: 'css',
  watchEvents: ['change'],
})