import fs from 'fs-extra'
import chalk from 'chalk'

export default function () {
  if (!fs.existsSync(globalThis.paths.sources.assets))
    return

  let assetsFolderCtime = fs.statSync(globalThis.paths.sources.assets)?.ctimeMs

  if (fs.existsSync(globalThis.paths.output.assets)) {
    var distAssetsFolderCtime = fs.statSync(globalThis.paths.output.assets)?.ctimeMs
  }

  if (assetsFolderCtime <= distAssetsFolderCtime)
    return

  fs.copySync(globalThis.paths.sources.assets, globalThis.paths.output.assets)

  console.log(
    chalk.gray('[') + 'Assets' + chalk.gray(']') +
    ' files copied'
  )
}