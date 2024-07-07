import cssImport from 'postcss-import'
import discardComments from 'postcss-discard-comments'
import autoprefixer from 'autoprefixer'
import presetEnv from 'postcss-preset-env'
import nested from 'postcss-nested'
import simpleVars from 'postcss-simple-vars'
import mediaMinmax from '@csstools/postcss-media-minmax'
import functions from 'postcss-functions'
import customMedia from 'postcss-custom-media'
import rem from 'postcss-rem'
import size from 'postcss-size'

import * as PostcssFunctions from './postcssFunctions.js'

export const plugins = [
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
      pxToVw: PostcssFunctions.pxToVw,
      bgImageMultiType: PostcssFunctions.bgImageMultiType,
      grid: PostcssFunctions.grid,
      flex: PostcssFunctions.flex,
      absolute: PostcssFunctions.absolute,
    }
  }),
  customMedia(),
  rem({
    name: 'rem',
  }),
]