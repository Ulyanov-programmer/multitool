import sharp from 'sharp'
import { Plugin } from './other/_plugin.js'

export default class Sharp extends Plugin {
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
  #SHARP_OPTIONS = {
    animated: true,
    limitInputPixels: false,
  }
  #options = {
    png: {
      quality: 90,

      webp: {},
      avif: {},
    },
    jpg: {
      mozjpeg: true,

      webp: {},
      avif: {},
    },
    gif: {
      webp: {},
    },
    webp: {},
    avif: {},
  }

  constructor() {
    super({
      associations: '{gif,webp,avif,png,jpg,jpeg,svg}',
      ignore: globalThis.paths.sources.assets + '**',
      watchEvents: ['add', 'changed'],
      logColor: '#009900',
      runOnEvents: {
        names: [
          'tasksAreReady',
        ],
        function: paths => { return this.#process(paths) }
      },
    })

    this.#options = this.#parseOptionObject(this.#options)
  }

  async #process(paths) {
    for (let pathToFile of paths) {
      let parsedPath = Plugin.path.parse(pathToFile)
      let extWithoutDot = parsedPath.ext.replace('.', '')

      if (!this.#extnameIsCorrect(extWithoutDot)) {
        this.#copyWithLog(pathToFile, parsedPath.base)

        continue
      }

      for (let paramName of Object.keys(this.#options[extWithoutDot])) {
        let outputExtname = paramName == 'this' ? extWithoutDot : paramName

        let destFilePath = Plugin.getDistPathForFile(pathToFile, outputExtname)

        let sharpInstance = await sharp(pathToFile, this.#SHARP_OPTIONS)
          .toFormat(
            outputExtname,
            {
              ...this.#DEFAULT_CONVERSION_OPTIONS,
              ...this.#options[extWithoutDot][paramName]
            }
          )

        Plugin.fs.createFileSync(destFilePath)

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
    Plugin.fs.copySync(pathToFile, Plugin.getDistPathForFile(pathToFile))

    this.emitter.emit('processedFile', {
      pathToFile: pathToFile,
      extension: Plugin.path.extname(pathToFile).replace('.', ''),
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