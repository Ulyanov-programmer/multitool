import fs from 'fs-extra'
import path from 'path'
import beautify from 'js-beautify'
import { parse } from '@adobe/css-tools'
import { createParser } from 'css-selector-parser'
import { ElementOfHtml } from './elementOfHtml.js'


export class CssToHtml {
  static ENCODING = 'utf8'
  static SELECTOR_PARSER = createParser({ syntax: 'progressive' })
  static UNACCEPTABLE_SELECTORS = [
    'WildcardTag',
    'PseudoElement',
    'PseudoClass',
    ':',
    '*',
    '+',
    '>',
    '||',
    '~',
    '|',
  ]
  #pathToHTML
  #pathToCSS
  #html
  #css
  #astRules
  #elements = []
  #writeBefore
  #writeAfter
  #formatterOptions = {
    indent_size: 2,
    max_preserve_newlines: -1,
    preserve_newlines: false,
  }

  constructor({ pathToHTML, pathToCSS, writeBefore, writeAfter, formatterOptions, preprocessingFunction }) {
    this.#pathToHTML = path.normalize(pathToHTML)
    this.#pathToCSS = path.normalize(pathToCSS)
    this.#formatterOptions = Object.assign(this.#formatterOptions, formatterOptions)

    if (!fs.existsSync(this.#pathToHTML)) {
      console.error(`The ${this.#pathToHTML} file was not found, so it was created.`)

      fs.createFileSync(this.#pathToHTML)
    }

    this.#html = fs.readFileSync(this.#pathToHTML, CssToHtml.ENCODING)
    this.#css = fs.readFileSync(this.#pathToCSS, CssToHtml.ENCODING)

    if (preprocessingFunction) {
      this.#css = preprocessingFunction(this.#css)
    }

    this.#writeAfter = writeAfter
    this.#writeBefore = writeBefore

    let astRules = parse(this.#css).stylesheet.rules

    if (!astRules.length)
      return

    this.#filterAstRules(astRules)

    this.#initHTMLElements()
    this.#createHTMLStructure()

    if (this.#elements.length)
      this.#writeData()
  }

  #filterAstRules(astRules) {
    this.#astRules = astRules.filter(
      rule => {
        if (
          rule.type != 'rule' ||
          this.#containsUnacceptableSelector(rule.selectors[0])
        )
          return false

        return true
      }
    )
  }
  #initHTMLElements() {
    for (let rule of this.#astRules) {
      this.#elements.push(new ElementOfHtml(rule, rule.selectors[0]))
    }
  }
  #createHTMLStructure() {
    for (let i = 0; i < this.#elements.length; i++) {
      this.#elements[i].searchInnerElements(this.#elements, i)
    }

    this.#elements = this.#elements.filter(el => el.parentSelector == '')
  }
  #writeData() {
    let [contentStartIndex, contentEndIndex] = this.#getWritingStartAndEndIndex()

    let newContent = this.#html.substring(0, contentStartIndex)

    for (let element of this.#elements) {
      newContent += element.string + '\n'
    }

    newContent += this.#html.substring(contentEndIndex)

    newContent = beautify.html(newContent, this.#formatterOptions)

    fs.writeFileSync(this.#pathToHTML, newContent)
  }
  #containsUnacceptableSelector(selector) {
    return CssToHtml.UNACCEPTABLE_SELECTORS.some(
      unSelector => selector.includes(unSelector)
    )
  }
  #getWritingStartAndEndIndex() {
    let contentStartIndex = 0, contentEndIndex = this.#html.length

    if (this.#writeAfter) {
      contentStartIndex = this.#html.indexOf(this.#writeAfter)
    }
    if (this.#writeBefore) {
      contentEndIndex = this.#html.lastIndexOf(this.#writeBefore)
    }

    if (contentStartIndex == -1 || contentEndIndex == -1) {
      throw new Error(`contentStartIndex or contentEndIndex was not found in the file ${this.#pathToHTML}!`)
    }

    contentStartIndex += this.#writeAfter?.length ?? 0

    return [contentStartIndex, contentEndIndex]
  }
}