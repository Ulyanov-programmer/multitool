import fs from 'fs-extra'
import chalk from 'chalk'

fs.removeSync(globalThis.paths.output.root)

console.log(
  chalk.gray('[') + 'DeleteDist' + chalk.gray(']') +
  ' directory removed'
)