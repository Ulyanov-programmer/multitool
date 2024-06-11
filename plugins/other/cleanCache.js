import fs from 'fs-extra'
import chalk from 'chalk'
import paths from '../../grunt/other/paths.js'

export function cleanCache() {
  fs.removeSync(paths.cache)

  console.log(chalk.gray('[') + 'Cache' + chalk.gray(']') + ' cleaned')
}