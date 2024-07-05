import sharp from 'sharp'
import { Plugin } from './_plugin.js'

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
  #sharpOptions
  cache

  constructor(options) {
    super({
      associations: options.associations,
      workingDirectory: options.workingDirectory,
      ignore: options.ignore,
      logColor: '#009900',

      runTaskCallback: paths => { return this.#process(paths) },

      watchEvents: options.reLaunchOn,
    })

    this.#sharpOptions = Object.assign(
      this.#DEFAULT_SHARP_OPTIONS,
      options.params.sharpOptions ?? {}
    )
    delete options.params.sharpOptions

    this.#options = this.#parseOptionObject(options.params)

    this.emitter.emit('runTask')
  }

  async #process(paths) {
    for (let pathToFile of paths) {
      let parsedPath = this.path.parse(pathToFile)
      let extWithoutDot = parsedPath.ext.replace('.', '')

      if (!this.#extnameIsCorrect(extWithoutDot)) {
        this.#copyWithLog(pathToFile, parsedPath.base)

        return
      }

      for (let paramName of Object.keys(this.#options[extWithoutDot])) {
        let outputExtname = paramName == 'this' ? extWithoutDot : paramName

        let destFilePath = Plugin.getDistPathForFile(pathToFile, outputExtname)

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
          pathToFile: pathToFile,
          extension: outputExtname,
        })
      }
    }
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

  #copyWithLog(pathToFile) {
    this.fs.copySync(pathToFile, Plugin.getDistPathForFile(pathToFile))

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
      extension: this.path.extname(pathToFile).replace('.', ''),
    })
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