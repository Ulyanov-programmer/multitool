import flatCache from 'flat-cache'
import { Plugin } from './_plugin.js'

export class FlatCache extends Plugin {
  #cache
  #id
  #cacheFolderPath

  constructor({ cacheFolderPath, id }) {
    super({})

    this.#id = id
    this.#cacheFolderPath = cacheFolderPath
    this.#cache = flatCache.load(this.#id, this.#cacheFolderPath ?? this.paths.cache)
  }

  getChangedFiles(paths = this.files) {
    let normalizedPaths = this.unGlobAndNormalizePaths(paths)
    if (!normalizedPaths) return []

    let cache = this.#cache.getKey(this.#id)

    for (let pathToFile of normalizedPaths) {
      let cacheParamNameForFile = this.#getCacheKeyByFilepath(pathToFile)

      // if cache for file is empty
      if (!cache || !cache[cacheParamNameForFile]) {
        this.processedBuffer.push(pathToFile)
        continue
      }

      let fileBuffer = this.fs.readFileSync(pathToFile)

      if (fileBuffer.byteLength != cache[cacheParamNameForFile].bufferSize) {
        this.processedBuffer.push(pathToFile)
      }
    }

    return this.returnAndCleanProcessedBuffer()
  }

  setCache(pathToFile) {
    if (!pathToFile) return
    let cacheObjectName = this.#getCacheKeyByFilepath(pathToFile)

    this.#cache.setKey(
      this.#id,
      Object.assign(
        this.#cache.getKey(this.#id) ?? {},
        {
          [cacheObjectName]: {
            bufferSize: this.fs.readFileSync(pathToFile).byteLength
          }
        },
      )
    )

    this.#cache.save()
  }

  #getCacheKeyByFilepath(pathToFile) {
    let parsedFileName = this.path.parse(pathToFile)

    return this.#id
      + '_'
      + parsedFileName.dir.replaceAll(this.path.sep, '_')
      + '_'
      + parsedFileName.name
  }
}