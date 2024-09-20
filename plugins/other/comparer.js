import fs from 'fs-extra'
import { globSync } from 'glob'
import path from 'path'
import { utimesSync } from 'utimes'
import { Plugin } from './_plugin.js'

/**
 * Contains methods for analyzing project files.
 */
export class FileComparer {
  /**
   * Compares the input files and their possible files in the directory of processed (dist) files.
   * Processing is performed based on the time of file modification.
   * @param {string[]} inputPaths The paths to the files to be analyzed.
   * @param {string[]} thirdPartyFiles (*optional*) Paths to files that are dependent on the main ones - like components of an html page.
   * @param {string} outputExtname (*optional*) The format of these files that should be in the folder with the result after processing from plugins.
   * @return Returns `false` if at least one third-party file has been modified.
   * Otherwise, it returns an `array` of *modified* files.
   */
  static onlyChangedFiles(inputPaths = [], thirdPartyFiles, outputExtname) {
    if (this.thirdPartyFileHasBeenModified(inputPaths, thirdPartyFiles))
      return false

    for (let i = 0; i < inputPaths.length;) {
      let parsedPath = path.parse(inputPaths[i])

      // Creating and correcting the file path for the Glob library.
      let pathToGlob = Plugin.getDistPathForFile(inputPaths[i])
        .replace(parsedPath.ext, `*.${outputExtname ?? '*'}`)
        .replaceAll('\\', '/')

      let destFile = globSync(pathToGlob)

      let sourceStats = fs.statSync(inputPaths[i])
      let outputStats

      let fileWithSameExtension = destFile.find(
        pathToFile => path.extname(pathToFile) == parsedPath.ext
      )

      if (fileWithSameExtension || destFile[0]) {
        outputStats = fs.statSync(fileWithSameExtension || destFile[0])
      }


      if (sourceStats?.ctimeMs <= outputStats?.ctimeMs)
        inputPaths.splice([i], 1)
      else
        i++
    }

    return inputPaths
  }

  /**
   * Compares the modification time of the main and third-party files.
   * @param {string[]} inputPaths An array of source files.
   * @param {string[]} thirdPartyFiles An array of third-party files.
   * @returns `true` if at least one of the third-party files is modified _later_ than the main (the `inputPaths` arg) ones.
   * Otherwise `false`.
   * @fires If at least one third-party file has been modified, the modification time of all the main files `will be changed` and will be longer!
   */
  static thirdPartyFileHasBeenModified(inputPaths, thirdPartyFiles = []) {
    if (!thirdPartyFiles?.length) return false

    let
      inputFilesCtime = inputPaths.map(file => fs.statSync(file).ctimeMs),
      otherFilesCtime = thirdPartyFiles.map(file => fs.statSync(file).ctimeMs),

      latestModTimeOfThirdParty = Math.max(...otherFilesCtime),
      latestModTimeOfInputs = Math.max(...inputFilesCtime)

    if (latestModTimeOfThirdParty >= latestModTimeOfInputs) {
      // This is necessary to prevent the files from being processed again
      for (let inputPath of inputPaths) {
        utimesSync(inputPath, {
          mtime: Math.ceil(latestModTimeOfThirdParty + 1),
        })
      }

      return true
    }

    return false
  }
}