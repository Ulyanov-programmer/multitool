import beautify from 'js-beautify'
import fs from 'fs-extra'
import { globSync, hasMagic } from 'glob'
import path from 'path'


let dest, pluginOptions
const ENCODING = 'utf8'


export default function beautifyProcess({ paths, options }) {
  if (!dest) dest = paths.dest
  if (!pluginOptions) pluginOptions = options

  let processedFiles = []

  if (hasMagic(paths.src)) {
    paths.src = globSync(paths.src, {
      dotRelative: true,
    })
  }
  if (paths.src instanceof Array) {
    for (let pathToFile of paths.src) {
      processedFiles.push(beautifyInner(pathToFile))
    }
  }
  else {
    processedFiles.push(beautifyInner(paths.src))
  }

  return processedFiles
}

function beautifyInner(pathToFile) {
  pathToFile = path.normalize(pathToFile)

  let data = fs.readFileSync(pathToFile, ENCODING)

  let result = beautify.html(data, pluginOptions)

  let fileName = pathToFile.split(path.sep).at(-1)

  fs.writeFileSync(dest + fileName, result, ENCODING)

  // a link to the processed file is returned 
  return dest + fileName
}