import { createParser } from 'css-selector-parser'

const selectorParser = createParser()
const validVariableNamesForAttributes = [
  'attr',
  'attrs',
  'data',
]
const selfCloseTags = [
  'input',
  'br',
  'hr',
  'col',
  'link',
  'area',
  'img',
  'base',
  'embed',
  'keygen',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]

export class ElementOfHtml {
  #string = ''
  get string() {
    this.#addTextBefore()
    this.#createFirstString()
    this.#addText()
    this.#addInnerElements()
    this.#createEndString()
    this.#addTextAfter()

    return this.#string
  }
  #selfCloseTag = false
  selector
  innerElements = []
  classes = []
  attributes = ''

  constructor(entryRule) {
    this.selector = entryRule.selectors[0]

    this.#parseSelector(entryRule.selectors[0])

    this.#setAttributes(entryRule)
    this.#setText(entryRule)
    this.#setTag()
    this.#setClasses()
  }

  #createFirstString() {
    let endOfString = this.#selfCloseTag ? ' />' : ' >'

    this.#string +=
      '<' +
      this.tag +
      this.classes +
      this.attributes +
      endOfString
  }
  #addTextBefore() {
    this.#string += this.textBefore ? `${this.textBefore}` : ''
  }
  #addTextAfter() {
    this.#string += this.textAfter ? `${this.textAfter}` : ''
  }
  #addText() {
    this.#string += this.text ? `\n${this.text}` : ''
  }
  #addInnerElements() {
    for (let innerElement of this.innerElements) {
      this.#string += '\n' + innerElement.string
    }
  }
  #createEndString() {
    if (!this.#selfCloseTag) {
      this.#string += '\n</' + this.tag + '>'
    }
  }
  searchInnerElements(elements) {
    this.innerElements = elements.filter(el =>
      el != this &&
      el.selector.includes(this.selector)
    )

    for (let element of this.innerElements) {
      let searched = element.searchInnerElements(this.innerElements)
      this.innerElements = this.innerElements.filter(el => !searched.includes(el))
    }

    return this.innerElements
  }

  #setTag() {
    this.tag = this.tag ?? 'div'
    this.#selfCloseTag = selfCloseTags.includes(this.tag)
  }
  #setClasses() {
    if (this.classes.length) {
      this.classes = ` class="` + this.classes.toString().replaceAll(',', ' ') + "\""
    }
    else {
      this.classes = ''
    }
  }
  #setAttributes(entryRule) {
    for (let decl of entryRule.declarations) {
      let declName = decl.property.split('-')

      if (validVariableNamesForAttributes.includes(declName[2])) {
        this.attributes += ' ' + this.#parseAttrVariable(decl)
      }
    }
  }
  #setText(entryRule) {
    this.text = entryRule.declarations.find(
      decl => decl.property == '--text'
    )?.value
    this.textBefore = entryRule.declarations.find(
      decl => decl.property == '--text-before'
    )?.value
    this.textAfter = entryRule.declarations.find(
      decl => decl.property == '--text-after'
    )?.value

    // Removing extra quotes
    this.text = this?.text?.substring(1, this.text.length - 1)
    this.textBefore = this?.textBefore?.substring(1, this.textBefore.length - 1)
    this.textAfter = this?.textAfter?.substring(1, this.textAfter.length - 1)
  }

  #parseSelector(selector) {
    let rule = selectorParser(selector)

    // Getting the last rule if it has nested ones.
    if (rule.rules[0]?.nestedRule) {
      rule = rule.rules[0].nestedRule

      while (rule.nestedRule) rule = rule.nestedRule
    }

    for (let item of rule.items || rule.rules[0].items) {
      switch (item.type) {
        case 'TagName':
          this.tag = item.name
          break
        case 'ClassName':
          this.classes.push(item.name)
          break
        case 'Attribute':
          let value = item.value
            ? item?.operator + `"${item?.value?.value}"`
            : ''
          this.attributes += ' ' + item.name + value
          break
      }
    }
  }
  #parseAttrVariable(declaration) {
    let declName = declaration.property.split('-')[2]
    let name, values

    switch (declName) {
      case 'attr':
      case 'data':
        // Deleting the "--attr-" in a variable
        name = declaration.property.replace('--', '').replace('attr-', '')
        values = declaration.value ? '=' + declaration.value : ''
        return name + values

      case 'attrs':
        values = declaration.value.split(' ')
          .map(v => v.substring(1, v.length - 1))

        return values.toString().replaceAll(',', ' ')
    }
  }
}