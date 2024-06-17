import fs from 'fs-extra'
import { globSync, hasMagic } from 'glob'
import globParent from 'glob-parent'
import path from 'path'
import chalk from 'chalk'
import chokidar from 'chokidar'
import { performance } from 'perf_hooks'
import { EventEmitter } from 'node:events'
import paths from './other/paths.js'

export class Plugin {
  static ENCODING = 'utf8'
  static performanceStartValue
  static performanceEndValue
  emitter

  constructor({ srcPath, destPath }) {
    this.path = path
    // paths of user 
    this.paths = paths

    this.globSync = globSync
    this.globParent = globParent
    this.hasMagic = hasMagic
    this.fs = fs
    this.performance = performance
    this.emitter = new EventEmitter()
    this.chalk = chalk
    this.chokidar = chokidar

    this.srcPath = srcPath
    this.destPath = destPath
    this.cwd = path.normalize(this.globParent(srcPath))

    this.processedBuffer = []

    this.emitter.on('processedFile', this.processedLog.bind(this))
    this.emitter.on('processedFile', this.saveToCache.bind(this))

    this.emitter.on('processStart', this.performanceTimerStart.bind(this))
    this.emitter.on('processStart', this.taskRunLog.bind(this))
    this.emitter.on('processEnd', this.performanceTimerEnd.bind(this))
  }

  normalizeInputPaths(paths) {
    if (!this.#checkPath(paths))
      return false

    paths = this.#unmaskPathsAndTransformToArray(paths)

    this.#normalizePaths(paths)

    return paths
  }

  #checkPath(paths) {
    if (!paths)
      return false
    if (paths instanceof Array &&
      paths.some(filePath => !filePath) ||
      paths.length == 0
    )
      return false

    return true
  }

  #unmaskPathsAndTransformToArray(paths) {
    if (this.hasMagic(paths)) {
      paths = this.globSync(paths, {
        dotRelative: true,
      })
    }

    if (!Array.isArray(paths))
      paths = [paths]

    return paths
  }

  #normalizePaths(paths) {
    for (let i = 0; i < paths.length; i++) {
      paths[i] = this.path.normalize(paths[i])
    }
  }

  processedLog({ pathToFile, style, extension }) {
    if (!pathToFile) {
      // locks like `[child_plugin_name] was completed`
      console.log(
        chalk.grey('[') +
        this.constructor.name +
        chalk.grey(']') +
        ` was [completed]`
      )
    }
    else {
      // locks like `[child_plugin_name] X was processed`
      if (!extension) {
        console.log(
          chalk.grey('[') +
          this.constructor.name +
          chalk.grey('] ') +
          chalk[style](pathToFile) +
          ` was processed`
        )

        return
      }

      let fileName = path.parse(pathToFile).name

      console.log(
        chalk.grey('[') +
        this.constructor.name +
        chalk.grey('] ') +
        chalk[style](fileName + '.' + extension) +
        ` was processed`
      )
    }
  }
  taskRunLog() {
    // locks like `[plugin_name] starts!`
    console.log(
      chalk.grey('[') +
      this.constructor.name +
      chalk.grey('] ') +
      chalk.grey('-- ') +
      `starts` +
      chalk.grey(' --')
    )
  }
  errorLog(error) {
    // locks like `[child_plugin_name] throw an error!`
    console.log(
      chalk.red('[') +
      this.constructor.name +
      chalk.red('] ') +
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
      chalk.gray('[') +
      this.constructor.name +
      chalk.gray('] ') +
      chalk.gray('-- ') +
      'Done in ' +

      Math.trunc(Plugin.performanceEndValue - Plugin.performanceStartValue) / 1000 +

      's' +
      chalk.gray(' --')
    )
  }

  returnAndCleanProcessedBuffer() {
    return this.processedBuffer.splice(0, this.processedBuffer.length)
  }

  getDistPathForFile(filePath, newFileExt) {
    let parsedPath = this.path.parse(filePath)

    if (newFileExt) {
      return path.resolve(
        `${this.destPath}/${parsedPath.dir.replace(this.cwd, '')}/${parsedPath.name}.${newFileExt}`
      )
    }

    return path.resolve(
      `${this.destPath}/${parsedPath.dir.replace(this.cwd, '')}/${parsedPath.base}`
    )
  }

  startWatching(runEvents) {
    this.watcher = this.chokidar.watch(this.srcPath, { ignoreInitial: true })

    for (let runEvent of runEvents) {
      this.watcher.on(runEvent, this.runProcess.bind(this))
    }
  }

  saveToCache({ pathToFile }) {
    if (this.cache) {
      this.cache.setCache(pathToFile)
    }
  }
}