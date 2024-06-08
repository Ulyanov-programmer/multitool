import cacache from 'cacache'
import { Plugin } from './_plugin.js'

export class Cacache extends Plugin {
  startBuffer
  #keyPrefix
  #cacheFolderPath

  constructor({ paths, cacheFolderPath, keyPrefix }) {
    super({ srcPath: paths.src, })

    this.#keyPrefix = keyPrefix
    this.#cacheFolderPath = cacheFolderPath
  }

  async getChangedFiles(paths = this.srcPath) {
    let normalizedPaths = this.normalizeInputPaths(paths)
    if (!normalizedPaths) return []

    let cachedObjects = await this.#getCacheInfo()

    for (let pathToFile of normalizedPaths) {
      if (
        // if no one entry
        !Object.keys(cachedObjects).length ||
        !cachedObjects[this.#getCacheKeyByFilepath(pathToFile)]
      ) {
        await this.#putCache(pathToFile)
        this.processedBuffer.push(pathToFile)
        continue
      }

      let
        fileBuffer = this.fs.readFileSync(pathToFile),
        cachedFile = await cacache.get(
          this.#cacheFolderPath,
          this.#getCacheKeyByFilepath(pathToFile),
        )

      if (!cachedFile.data.equals(fileBuffer)) {
        this.processedBuffer.push(pathToFile)
        this.#setCache(pathToFile)
      }
    }


    return this.returnAndCleanProcessedBuffer()
  }

  async #getCacheInfo() {
    return await cacache.ls(this.#cacheFolderPath)
  }
  async #putCache(pathToFile) {
    await cacache.put(
      this.#cacheFolderPath,
      this.#getCacheKeyByFilepath(pathToFile),
      this.fs.readFileSync(pathToFile)
    )
  }

  async setCacheIfNotCached(paths = this.srcPath) {
    let normalizedPaths = this.normalizeInputPaths(paths)
    if (!normalizedPaths) return []


    try {
      let cachedObjects = await this.#getCacheInfo()

      for (let pathToFile of normalizedPaths) {
        // if no one entry
        if (
          !Object.keys(cachedObjects).length ||
          !cachedObjects[this.#getCacheKeyByFilepath(pathToFile)]
        ) {
          await cacache.put(
            this.#cacheFolderPath,
            this.#getCacheKeyByFilepath(pathToFile),
            this.fs.readFileSync(pathToFile)
          )
        }
      }

      return normalizedPaths
    }
    catch (error) {
      this.errorLog(error)
      return []
    }
  }

  async #setCache(pathToFile) {
    if (!pathToFile) return

    await cacache.put(
      this.#cacheFolderPath,
      this.#getCacheKeyByFilepath(pathToFile),
      this.fs.readFileSync(pathToFile)
    )
  }

  #getCacheKeyByFilepath(pathToFile) {
    return this.#keyPrefix + '_' + this.path.parse(pathToFile).name
  }
}