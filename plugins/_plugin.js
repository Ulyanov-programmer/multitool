import fs from 'fs-extra'
import { globSync, hasMagic } from 'glob'
import globParent from 'glob-parent'
import path from 'path'
import chalk from 'chalk'
import chokidar from 'chokidar'
import { performance } from 'perf_hooks'
import { EventEmitter } from 'node:events'
import { paths } from '../paths.js'
import { FileComparer } from './comparer.js'

export class Plugin {
  static ENCODING = 'utf8'
  static performanceStartValue
  static performanceEndValue
  emitter

  constructor({ associations, workingDirectory, ignore, logColor, runTaskCallback }) {
    this.glob = (workingDirectory ?? paths.sources.root) + '**/*.' + associations
    this.globOptions = {
      ignore: ignore,
      dotRelative: true,
    }

    this.files = (paths = this.glob, onlyChanged) => {
      paths = this.unGlobPaths(paths)

      if (onlyChanged) {
        path = FileComparer.getChangedFiles(paths)
      }

      if (this.thirdPartyFiles?.length && changedFiles) {
        for (let file of changedFiles)
          if (this.thirdPartyFiles.includes(file))
            return paths
      }

      return changedFiles
    }

    this.outputPath = paths.output.root

    this.path = path
    // paths of user 
    this.paths = paths

    this.runTaskCallback = runTaskCallback

    this.globSync = globSync
    this.globParent = globParent
    this.hasMagic = hasMagic
    this.fs = fs
    this.performance = performance
    this.emitter = new EventEmitter()
    this.chalk = chalk
    this.chokidar = chokidar

    this.cwd = path.normalize(this.globParent(workingDirectory ?? paths.sources.root))

    this.processedBuffer = []
    this.thirdPartyFiles = []

    this.chalkColor = chalk.hex(logColor ?? '#FFF')
    // locks like `[child_plugin_name]`
    this.pluginStringInLog =
      chalk.grey('[') +
      this.chalkColor.bold(this.constructor.name) +
      chalk.grey('] ')

    this.emitter.on('processedFile', this.processedLog.bind(this))
    this.emitter.on('processedFile', this.updateTaskBufferForProcessedFiles.bind(this))

    this.emitter.on('processStart', Plugin.#performanceTimerStart.bind(this))
    this.emitter.on('processStart', this.taskRunLog.bind(this))
    this.emitter.on('processEnd', Plugin.#performanceTimerEnd.bind(this))

    this.emitter.on('runTask', this.#runProcess.bind(this))
  }

  unGlobPaths(paths) {
    if (!this.#checkPath(paths)) return false

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
    if (this.hasMagic(paths))
      paths = this.globSync(paths, this.globOptions)

    if (!Array.isArray(paths))
      paths = [paths]

    return paths
  }

  #normalizePaths(paths) {
    for (let i = 0; i < paths.length; i++) {
      paths[i] = this.path.normalize(paths[i])
    }
  }

  processedLog({ pathToFile, extension }) {
    if (!pathToFile) {
      // locks like `[child_plugin_name] was -- completed --`
      console.log(
        this.pluginStringInLog +
        this.chalkColor(` was -- completed --`)
      )

      return
    }

    // locks like `[child_plugin_name] X was processed`
    if (!extension) {
      console.log(
        this.pluginStringInLog +
        this.chalkColor(pathToFile) + ` was processed`
      )

      return
    }

    // locks like `[child_plugin_name] X was processed to .extName`
    console.log(
      this.pluginStringInLog +
      this.chalkColor(pathToFile) +
      ` was processed to .${chalk.underline(extension)}`
    )
  }
  taskRunLog() {
    // locks like `[plugin_name] -- starts --`
    console.log(this.pluginStringInLog + this.chalkColor('-- starts --'))
  }
  errorLog(error) {
    // locks like `[child_plugin_name] throw an error!`
    console.log(
      chalk.red('[') +
      this.chalkColor.bold(this.constructor.name) +
      chalk.red('] ') +
      chalk.red('throw an error!\n') +
      chalk.red(error)
    )
  }

  static #performanceTimerStart() {
    Plugin.performanceStartValue = this.performance.now()
  }
  static #performanceTimerEnd() {
    Plugin.performanceEndValue = this.performance.now()

    console.log(
      this.pluginStringInLog +
      this.chalkColor('-- Done in ') +

      Math.trunc(
        Plugin.performanceEndValue - Plugin.performanceStartValue
      ) / 1000 +

      's ' +
      this.chalkColor('--')
    )
  }

  returnAndCleanProcessedBuffer() {
    return this.processedBuffer.splice(0, this.processedBuffer.length)
  }

  getDistPathForFile(filePath, newFileExt) {
    let parsedPath = this.path.parse(filePath)
    let newFileBase = newFileExt ? parsedPath.name + `.${newFileExt}` : parsedPath.base

    let newPath = this.outputPath +
      parsedPath.dir.replace(this.cwd, '') + '/' +
      newFileBase

    return path.normalize(newPath)
  }

  startWatching(runEvents) {
    if (runEvents?.length <= 0) return


    this.watcher = this.chokidar.watch(this.glob, {
      ignoreInitial: true,
      ignored: this.globOptions.ignore,
    })

    for (let runEvent of runEvents) {
      this.watcher.on(runEvent, this.#runProcess.bind(this))
    }
  }
  startWatchingForThirdPartyFiles(options) {
    for (let [runEvent, triggerFilesPath] of Object.entries(options ?? {})) {
      this.thirdPartyFiles.push(...this.globSync(triggerFilesPath))

      let localChokidar = this.chokidar.watch(triggerFilesPath, { ignoreInitial: true, })

      // running the task in such a way that it processes all the files it is associated with
      localChokidar.on(runEvent, () => this.#runProcess(this.glob, null, false))
    }
  }

  updateTaskBufferForProcessedFiles({ pathToFile }) {
    this.processedBuffer.push(this.getDistPathForFile(pathToFile))
  }

  async #runProcess(paths, stats, onlyChangedFiles = true) {
    paths = this.files(paths, onlyChangedFiles)

    if (!paths) return


    this.emitter.emit('processStart')

    try {
      let result = await this.runTaskCallback(paths)

      if (result instanceof Promise) {
        result.then(() =>
          this.emitter.emit('processEnd')
        )
      }
      else {
        this.emitter.emit('processEnd')
      }
    }
    catch (error) {
      this.errorLog(error)
    }
    finally {
      return this.returnAndCleanProcessedBuffer()
    }
  }
}