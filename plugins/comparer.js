import fs from 'fs-extra'
import { globSync } from 'glob'
import path from 'path'
import { utimesSync } from 'utimes'
import { Plugin } from './_plugin.js'

export class FileComparer {
  static onlyChangedFiles(inputPaths = [], thirdPartyFiles) {
    if (this.thirdPartyFileHasBeenModified(inputPaths, thirdPartyFiles))
      return false

    for (let i = 0; i < inputPaths.length;) {
      let parsedPath = path.parse(inputPaths[i])

      // Creating and correcting the file path for the Glob library.
      let pathToGlob = Plugin.getDistPathForFile(inputPaths[i])
        .replace(parsedPath.ext, '.*')
        .replaceAll('\\', '/')

      let destFile = globSync(pathToGlob)

      let sourceStats = fs.statSync(inputPaths[i])
      let outputStats = destFile[0] && fs.statSync(destFile[0])


      if (sourceStats?.ctimeMs <= outputStats?.ctimeMs)
        inputPaths.splice([i], 1)
      else
        i++
    }

    return inputPaths
  }

  static thirdPartyFileHasBeenModified(inputPaths, thirdPartyFiles = []) {
    if (!thirdPartyFiles) return false

    let isThirdPartyFileModded

    for (let inputPath of inputPaths) {
      // If at least one of the paths is the path to a third-party file
      if (thirdPartyFiles.includes(inputPath))
        isThirdPartyFileModded = true
    }

    if (isThirdPartyFileModded) {
      return true
    }
    else {
      let inputFilesStatsCtime = []
      let otherFilesStatsCtime = []

      for (let thirdPartyFile of thirdPartyFiles) {
        otherFilesStatsCtime.push(fs.statSync(thirdPartyFile).ctimeMs)
      }
      for (let inputPath of inputPaths) {
        inputFilesStatsCtime.push(fs.statSync(inputPath).ctimeMs)
      }

      let latestModTimeOfThirdParty = Math.max(...otherFilesStatsCtime)
      let latestModTimeOfInputs = Math.max(...inputFilesStatsCtime)

      if (latestModTimeOfThirdParty >= latestModTimeOfInputs) {
        // This is necessary to prevent the files from being processed again
        for (let inputPath of inputPaths) {
          utimesSync(inputPath, {
            mtime: Math.ceil(latestModTimeOfThirdParty + 1),
          })
        }

        return true
      }
    }

    return false
  }
}