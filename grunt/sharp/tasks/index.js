'use strict'

const sharp = require('sharp'),
  globParent = require('glob-parent'),
  fs = require('fs-extra'),
  path = require('path'),
  chalk = require('chalk').default

const
  ALLOWED_EXTENSIONS = [
    'gif',
    'png',
    'jpg', 'jpeg',
    'webp',
    'avif',
    'tiff',
    'heif',
  ],
  DEFAULT_CONVERSION_OPTIONS = {
    quality: 90,
    lossless: false,
    chromaSubsampling: '4:2:0',
  },
  DEFAULT_SHARP_OPTIONS = {
    animated: true,
    limitInputPixels: false,
  }

let logLevel, sharpOptions, destCwd, sourceCwd

module.exports = function (grunt) {
  grunt.task.registerMultiTask('sharp', 'Convert and optimize images with Sharp.',
    async function () {
      let
        done = this.async(),
        options = this.options()

      logLevel = options.logLevel ?? 'small'
      sharpOptions = options.sharpOptions ?? {}
      destCwd = this.files[0].dest
      sourceCwd = globParent(this.data.src)

      delete options.logLevel
      delete options.sharpOptions


      for (let fileSrc of this.filesSrc) {
        let
          parsedFile = path.parse(fileSrc),
          fileExtname = parsedFile.ext.replace('.', ''),
          fileName = parsedFile.name,
          fileBase = parsedFile.base,
          fileCwd = parsedFile.dir.replace(sourceCwd, ''),

          pathToDist = createPathToNewFileInDist(fileName, fileExtname, fileCwd)

        fs.ensureDirSync(pathToDist.replace(parsedFile.base, ''))

        if (!extnamesIsCorrect(fileExtname)) {
          if (fs.existsSync(pathToDist)) continue

          fs.copySync(fileSrc, pathToDist)

          logAboutSuccessfulCopy(fileBase)
          continue
        }

        for (let [conversionRule, conversionRuleOptions] of Object.entries(options)) {
          let [convertFrom, convertTo] = conversionRule.split('_to_')

          if (!extnamesIsCorrect(convertFrom, convertTo)) {
            console.error(chalk.red.bold('Invalid name of an conversion rule! Make sure you have spelled the extension names correctly.'))

            return done(false)
          }


          // Checking that the file has not a suitable extension
          if (convertTo && convertFrom != fileExtname) continue

          //? For general conversion rules such as png: {}
          if (!convertTo) {
            let newFilePath = createPathToNewFileInDist(fileName, convertFrom, fileCwd)

            // Checking that the file has already been created
            if (fs.existsSync(newFilePath)) continue

            await convert(fileSrc, convertFrom, conversionRuleOptions, newFilePath)
            logAboutSuccessfulConversion(fileBase, fileName, convertFrom)

            if (conversionRuleOptions.alsoProcessOriginal) {
              let newFilePath = createPathToNewFileInDist(fileName, fileExtname, fileCwd)

              if (fs.existsSync(newFilePath)) continue

              await convert(fileSrc, fileExtname, conversionRuleOptions, newFilePath)
              logAboutSuccessfulConversion(fileBase, fileName, fileExtname)
            }
          }
          //? For specific conversion rules such as png_to_webp: {}
          else {
            let newFilePath = createPathToNewFileInDist(fileName, convertTo, fileCwd)

            if (fs.existsSync(newFilePath)) continue

            await convert(fileSrc, convertFrom, convertTo, conversionRuleOptions, newFilePath)
            logAboutSuccessfulConversion(fileBase, fileName, convertTo)
          }
        }
      }

      return done(true)
    }
  )

  async function convert(filePath, oldFileFormat, newFileFormat, options, newFilePath) {
    if (newFileFormat == 'heif' && !options.compression)
      options.compression = 'av1'
    else if (oldFileFormat == 'heif' && !options.compression)
      options.compression = 'jpeg'

    let sharpInstance =
      await sharp(filePath, Object.assign(DEFAULT_SHARP_OPTIONS, sharpOptions))
        .toFormat(newFileFormat, Object.assign(DEFAULT_CONVERSION_OPTIONS, options))

    fs.createFileSync(newFilePath)

    await sharpInstance.toFile(newFilePath)
  }
}

function logAboutSuccessfulConversion(fileBase, fileName, newFileExtname) {
  if (logLevel == 'full')
    console.log(
      'The file ' + chalk.green(sourceCwd + fileBase)
      + ' was processed to '
      + chalk.green(destCwd + fileName + '.' + chalk.bold(newFileExtname))
    )
  else if (logLevel == 'small')
    console.log(
      chalk.green(fileBase) + ' => ' + chalk.green.bold(newFileExtname)
    )
}
function logAboutSuccessfulCopy(fileBase) {
  if (logLevel == 'full')
    console.log(chalk.hex('#FF8800')
      (
        `The image ${chalk.bold(fileBase)} cannot be processed, so it is copied to dest.`
      )
    )
  else if (logLevel == 'small')
    console.log(chalk.hex('#FF8800')
      (fileBase + ' => ' + chalk.bold('copied'))
    )
}

function createPathToNewFileInDist(fileName, newFileExt, fileCwd) {
  return path.resolve(`${destCwd}/${fileCwd}/${fileName}.${newFileExt}`)
}

function extnamesIsCorrect(...extnames) {
  for (let extname of extnames) {
    if (!ALLOWED_EXTENSIONS.includes(extname)) {
      return false
    }
  }

  return true
}