import fs from 'fs-extra'
import path from 'path'
import beautify from 'js-beautify'
import { parse } from '@adobe/css-tools'
import { createParser } from 'css-selector-parser'
import { ElementOfHtml } from './elementOfHtml.js'
import postcss from 'postcss'
import nested from 'postcss-nested'


export class CssToHtml {
  // добавить в опции плагина?
  static #postcss = postcss([
    nested({
      preserveEmpty: true,
    }),
  ])
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
  #astRules
  #elements = []
  #writeBefore
  #writeAfter
  #formatterOptions = {
    indent_size: 2,
    max_preserve_newlines: -1,
    preserve_newlines: false,
  }

  constructor({ pathToHTML, pathToCSS, writeBefore, writeAfter, formatterOptions }) {
    this.#pathToHTML = path.normalize(pathToHTML)
    this.#pathToCSS = path.normalize(pathToCSS)
    this.#formatterOptions = Object.assign(this.#formatterOptions, formatterOptions)

    if (!fs.existsSync(this.#pathToHTML)) {
      fs.createFileSync(this.#pathToHTML)
    }

    this.#html = fs.readFileSync(this.#pathToHTML, CssToHtml.ENCODING)
    let css = fs.readFileSync(this.#pathToCSS, CssToHtml.ENCODING)

    this.#writeAfter = writeAfter ?? ''
    this.#writeBefore = writeBefore ?? ''

    let postcssResult = CssToHtml.#postcss.process(css)

    let astRules = parse(postcssResult.css).stylesheet.rules

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
    let contentStartIndex, contentEndIndex, newContent = ''

    contentStartIndex =
      this.#html.indexOf(this.#writeAfter) + this.#writeAfter.length
    contentEndIndex = this.#writeBefore
      ? this.#html.lastIndexOf(this.#writeBefore)
      : this.#html.length

    newContent += this.#html.substring(0, contentStartIndex)

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
}