import fs from 'fs-extra'
import chalk from 'chalk'
import paths from '../grunt/other/paths.js'

export function copyAssets() {
  fs.copySync(paths.src.assets, paths.dest.assets)

  console.log(chalk.gray('[') + 'Assets' + chalk.gray(']') + ' files copied')
}
