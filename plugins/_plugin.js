import fs from 'fs-extra'
import { globSync, hasMagic } from 'glob'
import path from 'path'
import chalk from 'chalk'
import { performance } from 'perf_hooks'
import { EventEmitter } from 'node:events'

export class Plugin {
  static ENCODING = 'utf8'
  static performanceStartValue
  static performanceEndValue
  emitter

  constructor({ srcPath, destPath }) {
    this.path = path
    this.globSync = globSync
    this.hasMagic = hasMagic
    this.fs = fs
    this.performance = performance
    this.emitter = new EventEmitter()

    this.srcPath = srcPath
    this.destPath = destPath

    this.processedBuffer = []

    this.emitter.on('processedFile', this.processedLog.bind(this))

    this.emitter.on('processStart', this.performanceTimerStart.bind(this))
    this.emitter.on('processStart', this.taskRunLog.bind(this))
    this.emitter.on('processEnd', this.performanceTimerEnd.bind(this))
  }

  cleanProcessedBufferAndReturnIt() {
    return this.processedBuffer.splice(0, this.processedBuffer.length)
  }

  transformPathsToArrayIfHasMagic(paths) {
    if (this.hasMagic(paths)) {
      return this.globSync(paths, {
        dotRelative: true,
      })
    }

    return paths
  }

  processedLog({ name, style }) {
    // locks like `[child_plugin_name] file_name was processed`
    console.log(
      chalk.grey('[') +
      this.constructor.name +
      chalk.grey('] ') +
      chalk[style](name) +
      ` was processed`
    )
  }
  taskRunLog() {
    // locks like `[plugin_name] starts!`
    console.log(
      chalk.grey('[') +
      this.constructor.name +
      chalk.grey('] ') +
      `starts!`
    )
  }
  errorLog(error) {
    // locks like `[child_plugin_name] throw an error!`
    console.log(
      chalk.grey('[') +
      this.constructor.name +
      chalk.grey('] ') +
      chalk.red('throw an error!\n') +
      chalk.red(error)
    )
  }
  performanceTimerStart() {
    Plugin.performanceStartValue = this.performance.now()
  }
  performanceTimerEnd() {
    Plugin.performanceEndValue = this.performance.now()

    console.log(
      `[${this.constructor.name}] ` +
      'Done in ' +
      Math.trunc(Plugin.performanceEndValue - Plugin.performanceStartValue) +
      'ms'
    )
  }
}