import fs from 'fs-extra'
import chalk from 'chalk'

/** 
 * This plugin deletes the folder with the result files.
 */

fs.removeSync(globalThis.config.output.root)

console.log(
  chalk.gray('[') +
  'DeleteDist' +
  chalk.gray(']') +
  ' directory removed'
)