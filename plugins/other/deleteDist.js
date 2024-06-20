import fs from 'fs-extra'
import chalk from 'chalk'
import { paths } from '../../paths.js'

function deleteDist() {
  fs.removeSync(paths.output.root)

  console.log(chalk.gray('[') + 'DeleteDist' + chalk.gray(']') + ' directory removed')
}
deleteDist()