import fs from 'fs-extra'
import { globSync, hasMagic } from 'glob'
import path from 'path'
import chalk from 'chalk'

export class Plugin {
  static ENCODING = 'utf8'

  constructor({ srcPath, destPath }) {
    this.path = path
    this.globSync = globSync
    this.hasMagic = hasMagic
    this.fs = fs

    this.srcPath = srcPath
    this.destPath = destPath

    this.processedBuffer = []
  }

  cleanProcessedBufferAndReturnIt(processedBuffer) {
    return processedBuffer.splice(0, processedBuffer.length)
  }

  transformPathsToArrayIfHasMagic(paths) {
    if (this.hasMagic(paths)) {
      return this.globSync(paths, {
        dotRelative: true,
      })
    }

    return paths
  }

  log({ plugin, processedFile }) {
    // locks like `[plugin_name] file_name was processed`
    console.log(
      chalk.grey('[') +
      plugin +
      chalk.grey('] ') +
      chalk[processedFile.style](processedFile.name) +
      ` was processed`
    )
  }
}