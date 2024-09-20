import { Plugin } from './other/_plugin.js'
import sharp from 'sharp'

/**
 * This plugin converts images to more modern formats.
 * It is also triggered when a new file is changed or added.
 */

new Plugin({
  name: 'sharp',
  associations: '{gif,webp,avif,png,jpg,jpeg,svg}',
  ignore: globalThis.paths.sources.assets + '**',
  watchEvents: ['add', 'changed'],
  logColor: '#009900',
  runOnEvents: {
    names: [
      'pluginsAreReady',
    ],
    function: process,
  },
})

const
  ALLOWED_EXTENSIONS = [
    'gif', 'png', 'jpg', 'jpeg', 'webp', 'avif', 'tiff', 'heif',
  ],
  DEFAULT_CONVERSION_OPTIONS = {
    quality: 90,
    lossless: false,
    chromaSubsampling: '4:2:0',
  },
  SHARP_OPTIONS = {
    animated: true,
    limitInputPixels: false,
  }

let options = {
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
parseOptionsObject()

async function process(paths) {
  for (let pathToFile of paths) {
    let parsedPath = Plugin.path.parse(pathToFile)
    let extWithoutDot = parsedPath.ext.replace('.', '')

    if (!extnameIsCorrect(extWithoutDot)) {
      copyWithLog(pathToFile, parsedPath.base)

      this.emitter.emit('processedFile', {
        pathToFile: pathToFile,
        extension: extWithoutDot,
      })

      continue
    }

    for (let paramName of Object.keys(options[extWithoutDot])) {
      let outputExtname = paramName == 'this' ? extWithoutDot : paramName

      let destFilePath = Plugin.getDistPathForFile(pathToFile, outputExtname)

      let sharpInstance = await sharp(pathToFile, SHARP_OPTIONS)
        .toFormat(outputExtname,
          {
            ...DEFAULT_CONVERSION_OPTIONS,
            ...options[extWithoutDot][paramName]
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

function parseOptionsObject() {
  for (let [rule, params] of Object.entries(options)) {
    let optionsForFatherRule = {}

    for (let paramName of Object.keys(params)) {
      // if the parameter is not an extension parameter
      if (!extnameIsCorrect(paramName)) {
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
}

function copyWithLog(pathToFile) {
  Plugin.fs.copySync(pathToFile, Plugin.getDistPathForFile(pathToFile))
}
function extnameIsCorrect(extname) {
  return ALLOWED_EXTENSIONS.includes(extname) ? true : false
}