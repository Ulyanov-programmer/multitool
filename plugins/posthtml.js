import fs from 'fs-extra'
import posthtml from 'posthtml'
import { globSync, hasMagic } from 'glob'
import path from 'path'


export class PostHtml {
  #src
  #dest
  #pluginsArray
  static #ENCODING = 'utf8'

  constructor({ paths, plugins }) {
    this.#src = paths.src
    this.#dest = paths.dest
    this.#pluginsArray = plugins
  }

  async runProcess(paths = this.#src) {
    let processedFiles = []

    if (hasMagic(paths)) {
      paths = globSync(paths, {
        dotRelative: true,
      })
    }
    if (paths instanceof Array) {
      for (let pathToFile of paths) {
        processedFiles.push(await this.#process(pathToFile))
      }
    }
    else {
      processedFiles.push(await this.#process(paths))
    }

    return processedFiles
  }

  async #process(pathToFile) {
    pathToFile = path.normalize(pathToFile)

    let result = await posthtml(this.#pluginsArray)
      .process(fs.readFileSync(pathToFile, PostHtml.#ENCODING))

    let fileName = pathToFile.split(path.sep).at(-1)

    fs.writeFileSync(this.#dest + fileName, result.html, PostHtml.#ENCODING)

    // a link to the processed file is returned 
    return this.#dest + fileName
  }
}