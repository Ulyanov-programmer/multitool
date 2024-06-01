import beautify from 'js-beautify'
import fs from 'fs-extra'
import { globSync, hasMagic } from 'glob'
import path from 'path'

export class BeautifyHtml {
  #src
  #dest
  #options
  static #ENCODING = 'utf8'

  constructor({ paths, options }) {
    this.#src = paths.src
    this.#dest = paths.dest
    this.#options = options
  }

  runProcess(paths = this.#src) {
    let processedFiles = []

    if (hasMagic(paths)) {
      paths = globSync(paths, {
        dotRelative: true,
      })
    }
    if (paths instanceof Array) {
      for (let pathToFile of paths) {
        processedFiles.push(this.#process(pathToFile))
      }
    }
    else {
      processedFiles.push(this.#process(paths))
    }

    return processedFiles
  }

  #process(pathToFile) {
    pathToFile = path.normalize(pathToFile)

    let data = fs.readFileSync(pathToFile, BeautifyHtml.#ENCODING)

    let result = beautify.html(data, this.#options)

    let fileName = pathToFile.split(path.sep).at(-1)

    fs.writeFileSync(this.#dest + fileName, result, BeautifyHtml.#ENCODING)

    return this.#dest + fileName
  }
}