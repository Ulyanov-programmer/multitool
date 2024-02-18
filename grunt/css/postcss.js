import cssImport from 'postcss-import'
import discardComments from 'postcss-discard-comments'
import autoprefixer from 'autoprefixer'
import presetEnv from 'postcss-preset-env'
import nested from 'postcss-nested'
import simpleVars from 'postcss-simple-vars'
import mediaMinmax from '@csstools/postcss-media-minmax'
import functions from 'postcss-functions'
import mixins from 'postcss-mixins'
import customMedia from 'postcss-custom-media'
import rem from 'postcss-rem'

import paths from '../other/paths.js'

const options = {
  map: false,
  parser: false,

  processors: [
    cssImport(),
    discardComments({
      remove: comment => {
        // ? Deletes all comments that contain @removeInDist.
        return comment.includes('@removeInDist')
      }
    }),
    autoprefixer(),
    presetEnv({
      stage: 4,
    }),
    nested(),
    simpleVars(),
    mediaMinmax(),
    functions({
      functions: {
        pxToVw: (px, layoutWidth) => pxToVw(px, layoutWidth),
        bgImageMultiType: url => bgImageMultiType(url),
      }
    }),
    mixins(),
    customMedia(),
    rem({
      name: 'rem',
    }),
  ],
}

export let postcss = {
  base: {
    options: options,
    files: [{
      expand: true,

      cwd: paths.src.styles,
      src: ['*.pcss', '!_*.pcss'],
      dest: paths.dest.styles,
      ext: '.css',
    }]
  },
  modules: {
    options: options,
    files: [{
      expand: true,

      cwd: paths.src.scripts,
      src: '**/*.pcss',
      dest: paths.dest.scripts,
      ext: '.css',
    }]
  }
}

function pxToVw(px, layoutWidth) {
  let pxNumber = px.replace('px', '')
  let layoutNumber = layoutWidth.replace('px', '')

  return `calc(${pxNumber} * 100vw / ${layoutNumber})`
}

function bgImageMultiType(url) {
  let webpUrl = url.replace('.jpg', '.webp')
  webpUrl = webpUrl.replace('.png', '.webp')

  let avifUrl = url.replace('.jpg', '.avif')
  avifUrl = avifUrl.replace('.png', '.avif')

  let newParams = `image-set(url(${url}) 1x, url(${webpUrl}) 1x, url(${avifUrl}) 1x)`

  return newParams
}
