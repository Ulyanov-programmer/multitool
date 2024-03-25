import fs from 'fs-extra'
import paths from './paths.js'

export function isFontFilesConverted() {
  fs.ensureDirSync(paths.dest.fonts)

  let
    filesInSources = fs.readdirSync(paths.src.fontsFolder),
    filesInDist = fs.readdirSync(paths.dest.fonts)

  filesInSources.splice(filesInSources.indexOf('.gitkeep'), 1)

  for (let i = 0; i < filesInSources.length; i++) {
    // Compares file names without extension
    if (filesInSources[i].split('.')[0] != filesInDist[i]?.split('.')[0]) {
      return false
    }
  }

  return true
}