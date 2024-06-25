import fs from 'fs-extra'
import chalk from 'chalk'
import { paths } from '../../paths.js'

fs.removeSync(paths.cache)

console.log(
  chalk.gray('[') + 'Cache' + chalk.gray(']') +
  ' cleaned'
)