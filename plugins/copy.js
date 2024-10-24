import fs from 'fs-extra'
import chalk from 'chalk'

/** 
 * This plugin copies some files (files of folder sources/assets) to the dist folder.
 */

function copy() {
  if (!fs.existsSync(globalThis.config.sources.assets))
    return

  let assetsFolderCtime = fs.statSync(globalThis.config.sources.assets)?.ctimeMs

  if (fs.existsSync(globalThis.config.output.assets)) {
    var distAssetsFolderCtime = fs.statSync(globalThis.config.output.assets)?.ctimeMs
  }

  if (assetsFolderCtime <= distAssetsFolderCtime)
    return

  fs.copySync(globalThis.config.sources.assets, globalThis.config.output.assets)

  console.log(
    chalk.gray('[') + 'Assets' + chalk.gray(']') + ' files copied'
  )
}

copy()