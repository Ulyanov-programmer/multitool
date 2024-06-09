import fs from 'fs-extra'
import chalk from 'chalk'
import paths from '../grunt/other/paths.js'

export function deleteDist() {
  fs.removeSync(paths.dest.root)

  console.log(chalk.gray('[') + 'DeleteDist' + chalk.gray(']') + ' directory removed')
}