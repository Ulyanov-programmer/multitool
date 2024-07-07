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

    // paths of user 
    this.paths = paths
    this.path = path

    this.runTaskCallback = options.runTaskCallback

    this.fs = fs
    this.emitter = new EventEmitter()
    this.chalk = chalk
    this.chokidar = chokidar

    this.cwd = Plugin.getCwd(options)

    this.startWatchingForThirdPartyFiles(options.thirdPartyFiles)

    this.chalkColor = chalk.hex(options.logColor ?? '#FFF')
    // locks like `[child_plugin_name]`
    this.pluginStringInLog =
      chalk.grey('[') +
      this.chalkColor.bold(this.constructor.name) +
      chalk.grey('] ')

    this.#registerEvents()

    this.startWatching(options.watchEvents)
  }

  #registerEvents() {
    this.emitter.on('processedFile', options => {
      this.log('processed', options)
      this.updateTaskBufferForProcessedFiles(options)
    })

    this.emitter.on('processStart', options => {
      this.log('start', options)
      Plugin.#setPerformanceTimer()
    })

    this.emitter.on('processEnd', () => {
      this.log('end', {
        time: Plugin.#getPerformanceTimerValue()
      })
    })

    this.emitter.on('runTask', options => {
      this.#runProcess(undefined, options)
    })
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

  static getCwd(options) {
    return path.normalize(globParent(options?.workingDirectory ?? paths.sources.root))
  }

  #checkPath(paths) {
    if (paths instanceof Array &&
      paths.some(filePath => !filePath) || !paths?.length
    )
      return false

    return true
  }

  #unmaskPathsAndTransformToArray(paths, globOptions) {
    if (hasMagic(paths))
      paths = globSync(paths, globOptions)

    if (!Array.isArray(paths))
      paths = [paths]

    return paths
  }

  log(eventName, options) {
    let mainLogString

    switch (eventName) {
      case 'processed':
        if (!options.pathToFile) {
          mainLogString = ': ' + this.chalkColor(`completed`)
        }
        else if (!options.extension) {
          mainLogString = this.chalkColor(options.pathToFile) + ` was processed`
        }
        else {
          mainLogString = this.chalkColor(options.pathToFile) +
            ` was processed to .${chalk.underline(options.extension)}`
        }

        console.log(this.pluginStringInLog + mainLogString)
        break

      case 'start':
        console.log(this.pluginStringInLog + ': ' + this.chalkColor('starts'))
        break

      case 'error':
        console.log(
          chalk.red('[') +
          this.chalkColor.bold(this.constructor.name) +
          chalk.red('] ') +
          ': ' + chalk.red('error!\n') +
          chalk.red(options.error)
        )
        break

      case 'end':
        console.log(
          this.pluginStringInLog + ': ' +
          this.chalkColor('done in ') + options.time + 's'
        )
        break
    }
  }

  static #setPerformanceTimer() {
    Plugin.performanceStartValue = performance.now()
  }
  static #getPerformanceTimerValue() {
    Plugin.performanceEndValue = performance.now()

    return Math.trunc(
      Plugin.performanceEndValue - Plugin.performanceStartValue
    ) / 1000
  }

  returnAndCleanProcessedBuffer() {
    return this.processedBuffer.splice(0, this.processedBuffer.length)
  }

  static getDistPathForFile(filePath, newFileExt) {
    let parsedPath = path.parse(filePath)
    let newFileBase = newFileExt ? parsedPath.name + `.${newFileExt}` : parsedPath.base

    let newPath = paths.output.root +
      parsedPath.dir.replace(this.cwd ?? Plugin.getCwd(), '') + '/' +
      newFileBase

    return path.normalize(newPath)
  }

  startWatching(runEvents) {
    if (!runEvents?.length) return

    this.watcher = this.chokidar.watch(this.glob, {
      ignoreInitial: true,
      ignored: this.globOptions.ignore,
    })

    for (let runEvent of runEvents) {
      this.watcher.on(runEvent, this.#runProcess.bind(this))
    }
  }

  startWatchingForThirdPartyFiles(globToFiles = []) {
    let localChokidar = this.chokidar.watch(globToFiles, { ignoreInitial: true, })

    // running the task in such a way that it processes all the files it is associated with
    localChokidar.on('change', () => this.#runProcess(null, { passAllFiles: true }))
  }

  updateTaskBufferForProcessedFiles(options) {
    this.processedBuffer.push(
      Plugin.getDistPathForFile(options.pathToFile, options.extension)
    )
  }

  async #runProcess(paths, options) {
    if (options?.passAllFiles && !paths) {
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
      this.log('error', {
        error: error,
      })
    }
    finally {
      return this.returnAndCleanProcessedBuffer()
    }
  }
}