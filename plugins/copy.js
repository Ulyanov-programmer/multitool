import fs from 'fs-extra'
import chalk from 'chalk'

export default function () {
  fs.copySync(globalThis.paths.sources.assets, globalThis.paths.output.assets)

  console.log(
    chalk.gray('[') + 'Assets' + chalk.gray(']') +
    ' files copied'
  )
}