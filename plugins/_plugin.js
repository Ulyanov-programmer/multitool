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
  processedBuffer = []
  globArray
  thirdPartyFilesGlobArray
  globOptions = {
    ignore: null,
  }

  constructor(options) {
    this.glob =
      `${options.workingDirectory ?? paths.sources.root}**/*.${options.associations}`

    this.thirdPartyFilesGlobArray = options.thirdPartyFiles

    this.globOptions.ignore = options.ignore

    if (options.workingDirectory?.includes(paths.output.root)) {
      this.workingInOutputDir = true
    }

    this.outputPath = paths.output.root

    this.path = path
    // paths of user 
    this.paths = paths

    this.runTaskCallback = options.runTaskCallback

    this.globSync = globSync
    this.globParent = globParent
    this.hasMagic = hasMagic
    this.fs = fs
    this.performance = performance
    this.emitter = new EventEmitter()
    this.chalk = chalk
    this.chokidar = chokidar

    this.cwd = path.normalize(this.globParent(options.workingDirectory ?? paths.sources.root))

    this.startWatchingForThirdPartyFiles(options.thirdPartyFiles)

    this.chalkColor = chalk.hex(options.logColor ?? '#FFF')
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

    this.emitter.on('runTask', options => this.#runProcess(undefined, options))
  }

  getChangedFiles(files = this.glob) {
    files = FileComparer.onlyChangedFiles(
      // main files
      this.unGlobPaths(files, this.globOptions),
      // third party files
      this.unGlobPaths(this.thirdPartyFilesGlobArray)
    )

    if (files === false)
      files = this.unGlobPaths(this.glob, this.globOptions)

    return files
  }

  unGlobPaths(paths, globOptions) {
    if (!this.#checkPath(paths)) return false

    return this.#unmaskPathsAndTransformToArray(paths, globOptions)
  }

  #checkPath(paths) {
    if (paths instanceof Array &&
      paths.some(filePath => !filePath) || !paths?.length
    )
      return false

    return true
  }

  #unmaskPathsAndTransformToArray(paths, globOptions) {
    if (this.hasMagic(paths))
      paths = this.globSync(paths, globOptions)

    if (!Array.isArray(paths))
      paths = [paths]

    return paths
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
      if (this.workingInOutputDir) {
        this.runningTaskCounter = 0

        this.watcher.on(runEvent, async pathToFile => {
          if (this.runningTaskCounter == 0) {
            this.runningTaskCounter++

            await this.#runProcess(pathToFile, {
              ignoreCache: true,
            })
          }

          this.runningTaskCounter = 0
        })
      }
      else {
        this.watcher.on(runEvent, this.#runProcess.bind(this))
      }
    }
  }

  startWatchingForThirdPartyFiles(globToFiles = []) {
    let localChokidar = this.chokidar.watch(globToFiles, { ignoreInitial: true, })

    // running the task in such a way that it processes all the files it is associated with
    localChokidar.on('change', this.#runProcess.bind(this))
  }

  updateTaskBufferForProcessedFiles({ pathToFile }) {
    this.processedBuffer.push(this.getDistPathForFile(pathToFile))
  }

  async #runProcess(paths, options) {
    if (options?.ignoreCache && !paths) {
      paths = this.unGlobPaths(this.glob, this.globOptions)
    }
    else if (!paths) {
      paths = this.getChangedFiles(paths)
    }

    if (!Array.isArray(paths)) paths = [paths]

    if (!paths?.length) return


    this.emitter.emit('processStart')

    try {
      await this.runTaskCallback(paths)

      this.emitter.emit('processEnd')
    }
    catch (error) {
      this.errorLog(error)
    }
    finally {
      return this.returnAndCleanProcessedBuffer()
    }
  }
}