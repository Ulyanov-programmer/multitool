import cssImport from 'postcss-import'
import discardComments from 'postcss-discard-comments'
import autoprefixer from 'autoprefixer'
import presetEnv from 'postcss-preset-env'
import nested from 'postcss-nested'
import sanitize from 'postcss-sanitize'
import simpleVars from 'postcss-simple-vars'
import mediaMinmax from '@csstools/postcss-media-minmax'
import functions from 'postcss-functions'
import inlineMedia from 'postcss-inline-media'
import rem from 'postcss-rem'
import size from 'postcss-size'
import discardEmpty from 'postcss-discard-empty'


import * as PostcssFunctions from './postcssFunctions.js'

export const plugins = [
  cssImport(),
  discardComments({
    remove: comment => {
      // ? Deletes all comments that contain @removeInDist.
      return comment.includes('@removeInDist')
    }
  }),
  sanitize({
    removeEmpty: true,
    rules: [
      {
        prop: /--text/,
      },
      {
        prop: /--attrs/,
      },
      {
        prop: /--attr/gi,
      },
    ],
  }),
  size(),
  autoprefixer(),
  presetEnv({
    stage: 4,
  }),
  nested(),
  simpleVars(),
  inlineMedia({
    shorthand: 'max-width',
    shorthandUnit: 'px',
  }),
  mediaMinmax(),
  functions({
    functions: {
      pxToVw: PostcssFunctions.pxToVw,
      bgImageMultiType: PostcssFunctions.bgImageMultiType,
      grid: PostcssFunctions.grid,
      flex: PostcssFunctions.flex,
      absolute: PostcssFunctions.absolute,
    }
  }),
  rem({
    name: 'rem',
  }),
  discardEmpty(),
]