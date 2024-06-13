import fs from 'fs-extra'
import chalk from 'chalk'
import paths from './paths.js'

function copyAssets() {
  fs.copySync(paths.src.assets, paths.dest.assets)

  console.log(chalk.gray('[') + 'Assets' + chalk.gray(']') + ' files copied')
}
copyAssets()