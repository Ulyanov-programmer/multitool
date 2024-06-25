import fs from 'fs-extra'
import chalk from 'chalk'
import { paths } from '../../paths.js'

fs.copySync(paths.sources.assets, paths.output.assets)

console.log(
  chalk.gray('[') + 'Assets' + chalk.gray(']') +
  ' files copied'
)