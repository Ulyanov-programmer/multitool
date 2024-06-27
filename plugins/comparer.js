import fs from 'fs-extra'
import { globSync } from 'glob'
import path from 'path'
import { getAttribute, setAttribute } from 'fs-xattr'
import { paths } from '../paths.js'

export class FileComparer {
  static getChangedFiles(inputPaths = []) {
    getAttribute()
    let changedFiles = []

    for (let pathToFile of inputPaths) {
      let parsedPath = path.parse(pathToFile)

      let sourceFile = globSync(
        paths.sources.root + '**/' + parsedPath.name + '.*'
      )
      let destFile = globSync(
        paths.output.root + '**/' + parsedPath.name + '.*'
      )
      let sourceStats = sourceFile[0] && fs.statSync(sourceFile[0])
      let outputStats = destFile[0] && fs.statSync(destFile[0])

      if (
        !sourceStats || !outputStats ||
        sourceStats.ctimeMs > outputStats.ctimeMs
      ) {
        changedFiles.push(pathToFile)
      }
    }

    return changedFiles
  }
}