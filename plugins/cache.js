import { Plugin } from './_plugin.js'

export class LocalCache extends Plugin {
  pathToCacheFile = this.paths.cache + 'lastModificationTime'

  constructor() {
    super({})

    this.fs.ensureFileSync(this.pathToCacheFile)
  }

  getChangedFiles(paths) {
    let normalizedPaths = this.unGlobAndNormalizePaths(paths)
    if (!normalizedPaths) return

    let timeOfLastModificationOfFiles = this.fs.readFileSync(
      this.pathToCacheFile, { encoding: 'utf8' }
    )
    let lastedModTime = timeOfLastModificationOfFiles

    for (let pathToFile of normalizedPaths) {
      let fileStats = this.fs.statSync(pathToFile)

      if (fileStats.mtimeMs > timeOfLastModificationOfFiles) {
        this.processedBuffer.push(pathToFile)

        if (fileStats.mtimeMs > lastedModTime) {
          lastedModTime = fileStats.mtimeMs
        }
      }
    }

    if (lastedModTime == timeOfLastModificationOfFiles) {
      this.setModificationTime({ modTimeOfFile: lastedModTime })
    }

    return this.returnAndCleanProcessedBuffer()
  }

  setModificationTime({ pathToFile, modTimeOfFile = null }) {
    let modTime = modTimeOfFile ?? this.fs.statSync(pathToFile).mtimeMs

    this.fs.outputFileSync(this.pathToCacheFile,
      modTime.toString(),
      { encoding: 'utf8' }
    )
  }
}