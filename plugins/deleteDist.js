import fs from 'fs-extra'
import chalk from 'chalk'

export default function () {
  fs.removeSync(globalThis.paths.output.root)

  console.log(
    chalk.gray('[') + 'DeleteDist' + chalk.gray(']') +
    ' directory removed'
  )
}