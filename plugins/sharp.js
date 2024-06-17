import sharp from 'sharp'
import { Plugin } from './_plugin.js'
import { FlatCache } from './flatCache.js'

export class Sharp extends Plugin {
  #ALLOWED_EXTENSIONS = [
    'gif',
    'png',
    'jpg', 'jpeg',
    'webp',
    'avif',
    'tiff',
    'heif',
  ]
  #DEFAULT_CONVERSION_OPTIONS = {
    quality: 90,
    lossless: false,
    chromaSubsampling: '4:2:0',
  }
  #DEFAULT_SHARP_OPTIONS = {
    animated: true,
    limitInputPixels: false,
  }
  #options
  #logLevel
  #sharpOptions
  cache

  constructor({ paths, options, reLaunchOn }) {
    super({ srcPath: paths.src, destPath: paths.dest })

    this.#logLevel = options.logLevel ?? 'small'
    delete options.logLevel

    this.#sharpOptions = Object.assign(
      this.#DEFAULT_SHARP_OPTIONS,
      options.sharpOptions ?? {}
    )
    delete options.sharpOptions

    this.#options = this.#parseOptionObject(options)

    reLaunchOn && this.startWatching(reLaunchOn)

    this.cache = new FlatCache({
      paths: {
        src: this.srcPath,
      },
      id: this.constructor.name,
      cacheFolderPath: this.paths.cache + this.constructor.name + '/'
    })

    this.runProcess()
  }

  async runProcess(paths = this.srcPath) {
    paths = this.cache.getChangedFiles(paths)

    let normalizedPaths = this.normalizeInputPaths(paths)
    if (!normalizedPaths) return


    this.emitter.emit('processStart')

    try {
      for (let pathToFile of normalizedPaths) {
        this.processedBuffer.push(await this.#process(pathToFile))
      }
    }
    catch (error) {
      this.errorLog(error)
      return this.returnAndCleanProcessedBuffer()
    }


    this.emitter.emit('processEnd')

    return this.returnAndCleanProcessedBuffer()
  }

  async #process(pathToFile) {
    let parsedPath = this.path.parse(pathToFile)
    let extWithoutDot = parsedPath.ext.replace('.', '')

    if (!this.#extnameIsCorrect(extWithoutDot)) {
      this.#copyWithLog(pathToFile, parsedPath.base)

      return this.getDistPathForFile(pathToFile)
    }

    for (let paramName of Object.keys(this.#options[extWithoutDot])) {
      let outputExtname = paramName == 'this' ? extWithoutDot : paramName

      let destFilePath = this.getDistPathForFile(pathToFile, outputExtname)

      let sharpInstance = await sharp(pathToFile, this.#sharpOptions)
        .toFormat(
          outputExtname,
          {
            ...this.#DEFAULT_CONVERSION_OPTIONS,
            ...this.#options[extWithoutDot][paramName]
          }
        )

      this.fs.createFileSync(destFilePath)

      await sharpInstance.toFile(destFilePath)

      this.emitter.emit('processedFile', {
        pathToFile: parsedPath.name + '.' + outputExtname,
        style: 'magenta'
      })
    }


    return this.getDistPathForFile(parsedPath.base)
  }

  #parseOptionObject(options) {
    for (let [rule, params] of Object.entries(options)) {
      let optionsForFatherRule = {}

      for (let paramName of Object.keys(params)) {
        // if the parameter is not an extension parameter
        if (!this.#extnameIsCorrect(paramName)) {
          optionsForFatherRule[paramName] = params[paramName]

          delete options[rule][paramName]

          continue
        }
      }

      if (Object.keys(optionsForFatherRule).length > 0) {
        options[rule].this = optionsForFatherRule
      }
      if (Object.keys(params).length == 0) {
        options[rule].this = {}
      }
    }

    return options
  }

  #copyWithLog(pathToFile, fileBase) {
    this.fs.copySync(pathToFile, this.getDistPathForFile(fileBase))

    if (this.#logLevel == 'full')
      console.log(this.chalk.hex('#FF8800')
        (
          `The image ${this.chalk.bold(fileBase)} cannot be processed, so it is copied to dest.`
        )
      )
    else if (this.#logLevel == 'small')
      console.log(this.chalk.hex('#FF8800')
        (
          fileBase + ' => ' + this.chalk.bold('copied')
        )
      )
  }
  #extnameIsCorrect(extname) {
    if (!this.#ALLOWED_EXTENSIONS.includes(extname)) {
      return false
    }
    else {
      return true
    }
  }
}