import fs from 'fs-extra'
import path from 'path'
import beautify from 'js-beautify'
import { parse } from '@adobe/css-tools'
import { ElementOfHtml } from './elementOfHtml.js'


const ENCODING = 'utf8'
const DEFAULT_HTML_CONTENT =
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>`


export class CssToHtml {
  #pathToHTML
  #pathToCSS
  #html
  #ast
  #elements = []
  #content = ''
  #writeBefore
  #writeAfter

  constructor({ pathToHTML, pathToCSS, writeBefore, writeAfter }) {
    this.#pathToHTML = path.normalize(pathToHTML)
    this.#pathToCSS = path.normalize(pathToCSS)
    this.#writeAfter = writeAfter || '<body>'
    this.#writeBefore = writeBefore || '</body>'

    if (!fs.existsSync(this.#pathToHTML)) {
      fs.createFileSync(this.#pathToHTML)
      fs.writeFileSync(this.#pathToHTML, DEFAULT_HTML_CONTENT)
    }

    this.#html = fs.readFileSync(this.#pathToHTML, ENCODING)
    this.#ast = parse(fs.readFileSync(this.#pathToCSS, ENCODING))

    for (let rule of this.#ast.stylesheet.rules) {
      if (rule.type == 'rule')
        this.#elements.push(new ElementOfHtml(rule))
    }

    for (let el of this.#elements) {
      let searched = el.searchInnerElements(this.#elements)
      this.#elements = this.#elements.filter(el => !searched.includes(el))
    }

    if (this.#elements.length) {
      this.#elements.forEach(el => this.#content += el.string)

      this.#writeData()
    }
  }
  #writeData() {
    let contentStartIndex =
      this.#html.indexOf(this.#writeAfter) + this.#writeAfter.length
    let contentEndIndex = this.#html.lastIndexOf(this.#writeBefore)

    let newHtml = this.#html.substring(0, contentStartIndex)
    newHtml += this.#content
    newHtml += this.#html.substring(contentEndIndex)

    fs.writeFileSync(this.#pathToHTML, beautify.html(newHtml))
  }
}