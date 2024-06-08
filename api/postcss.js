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
import size from 'postcss-size'

import paths from '../grunt/other/paths.js'
import { PostCss } from '../plugins/postcss.js'


export const postcssConfig = new PostCss({
  paths: {
    src: paths.src.styles + '*.pcss',
    dest: paths.dest.styles,
  },
  plugins: [
    cssImport(),
    discardComments({
      remove: comment => {
        // ? Deletes all comments that contain @removeInDist.
        return comment.includes('@removeInDist')
      }
    }),
    size(),
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
        grid: (gap, columns, rows) => grid(gap, columns, rows),
        flex: (gap, flexFlow, inline) => flex(gap, flexFlow, inline),
        absolute: (inset, zIndex) => absolute(inset, zIndex),
      }
    }),
    mixins(),
    customMedia(),
    rem({
      name: 'rem',
    }),
  ],
  outputExtname: 'css'
})

// const options = {
//   map: false,
//   parser: false,

//   processors: [
//     cssImport(),
//     discardComments({
//       remove: comment => {
//         // ? Deletes all comments that contain @removeInDist.
//         return comment.includes('@removeInDist')
//       }
//     }),
//     size(),
//     autoprefixer(),
//     presetEnv({
//       stage: 4,
//     }),
//     nested(),
//     simpleVars(),
//     mediaMinmax(),
//     functions({
//       functions: {
//         pxToVw: (px, layoutWidth) => pxToVw(px, layoutWidth),
//         bgImageMultiType: url => bgImageMultiType(url),
//         grid: (gap, columns, rows) => grid(gap, columns, rows),
//         flex: (gap, flexFlow, inline) => flex(gap, flexFlow, inline),
//         absolute: (inset, zIndex) => absolute(inset, zIndex),
//       }
//     }),
//     mixins(),
//     customMedia(),
//     rem({
//       name: 'rem',
//     }),
//   ],
// }

// export let postcss = {
//   base: {
//     options: options,
//     files: [{
//       expand: true,

//       cwd: paths.src.styles,
//       src: ['*.pcss', '!_*.pcss'],
//       dest: paths.dest.styles,
//       ext: '.css',
//     }]
//   },
//   modules: {
//     options: options,
//     files: [{
//       expand: true,

//       cwd: paths.src.scripts,
//       src: '**/*.pcss',
//       dest: paths.dest.scripts,
//       ext: '.css',
//     }]
//   }
// }

const LAYOUT_WIDTH = 1440
function pxToVw(px) {
  let pxNumber = px.replace('px', '')

  return `calc(${pxNumber} * 100vw / ${LAYOUT_WIDTH})`
}

function bgImageMultiType(url) {
  let webpUrl, avifUrl, newParams

  webpUrl = url.replace('.jpg', '.webp')
  webpUrl = webpUrl.replace('.png', '.webp')

  avifUrl = url.replace('.jpg', '.avif')
  avifUrl = avifUrl.replace('.png', '.avif')

  newParams = `image-set(url(${url}) 1x, url(${webpUrl}) 1x, url(${avifUrl}) 1x)`

  return newParams
}

function grid(gap, columns, rows) {
  let props = 'grid'

  if (gap)
    props += `;\ngap: ${gap}`

  if (columns)
    props += `;\ngrid-template-columns: ${columns}`

  if (rows)
    props += `;\ngrid-template-rows: ${rows}`

  return props
}
function flex(gap, flexFlow, inline) {
  if (inline == 'inline')
    var props = `inline-flex`
  else
    var props = `flex`

  if (gap)
    props += `;\ngap: ${gap}`

  if (flexFlow)
    props += `;\nflex-flow: ${flexFlow}`

  return props
}

function absolute(inset, zIndex) {
  var props = `absolute`

  if (inset)
    props += `;\ninset: ${inset}`

  if (zIndex)
    props += `;\nz-index: ${zIndex}`

  return props
}
