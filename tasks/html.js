import fs from 'fs-extra'
import posthtml from 'posthtml'
import { globSync, hasMagic } from 'glob'
import path from 'path'


let pluginsArray, dest
const ENCODING = 'utf8'


export default function htmlProcess({ paths, plugins }) {
  if (!pluginsArray) pluginsArray = plugins

  if (!dest) dest = paths.dest

  if (hasMagic(paths.src)) {
    paths.src = globSync(paths.src, {
      dotRelative: true,
    })

    for (let pathToFile of paths.src) {
      posthtmlProcess(pathToFile)
    }
  }
  else {
    posthtmlProcess(paths.src)
  }
}

function posthtmlProcess(pathToFile) {
  posthtml(pluginsArray)
    .process(
      fs.readFileSync(pathToFile, ENCODING),
    )
    .then(result => {
      let fileName = pathToFile.split(path.sep).at(-1)

      fs.writeFileSync(dest + fileName, result.html, ENCODING)
    })
}