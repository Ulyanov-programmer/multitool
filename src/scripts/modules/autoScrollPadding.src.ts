interface AutoScrollPaddingItemArgs {
  /**
    The element that was fixed, and from which there should be an indent.
  */
  fixedElementSelector: string
  /**
    The scroll-behavior value for the element. 
    @defaultValue 'smooth'
  */
  scrollBehavior?: ScrollBehavior
  /**
    By default, html. 

    Specify a different value if your fixed element is in a different scrollable block.   
    @defaultValue 'html'
  */
  scrollableParentSelector?: string
  /**
    Indent from the element so that it does not fit closely to the fixed block.
    @defaultValue `5` (5px)
  */
  gap?: number

  setInCssVariable?: string
}
export class AutoScrollPaddingItem {
  public scrollableParent: HTMLElement
  public fixedElement: HTMLElement
  public childRefs: NodeListOf<HTMLAnchorElement>
  public gap: number = 5
  public useCssVar: string

  constructor(arg: AutoScrollPaddingItemArgs) {
    this.fixedElement = document.querySelector(arg.fixedElementSelector)
    this.gap = arg.gap ?? this.gap
    this.useCssVar = arg.setInCssVariable

    if (arg.scrollableParentSelector) {
      this.scrollableParent = document.querySelector(arg.scrollableParentSelector)
    } else {
      this.scrollableParent = document.querySelector('html')
    }

    if (this.fixedElement.style.scrollBehavior == '') {
      this.scrollableParent.style.scrollBehavior = arg.scrollBehavior ?? 'smooth'
    }

    this.childRefs = this.scrollableParent.querySelectorAll('a[href^="#"]')
  }

  public updatePaddingValue() {
    let padding = this.fixedElement.offsetHeight + this.gap + 'px'

    if (this.useCssVar) {
      this.scrollableParent.style.setProperty(this.useCssVar, padding)
    } else {
      this.scrollableParent.style.scrollPadding = padding
    }
  }
}


export class AutoScrollPadding {
  private autoPaddingItems: AutoScrollPaddingItem[]

  constructor(...autoScrollPaddingItems: AutoScrollPaddingItem[]) {
    this.autoPaddingItems = autoScrollPaddingItems
    if (this.autoPaddingItems == undefined && this.autoPaddingItems.length <= 0) {
      return
    }


    for (let autoPaddingItem of this.autoPaddingItems) {
      autoPaddingItem.updatePaddingValue.bind(autoPaddingItem)()
    }

    for (let autoPaddingItem of this.autoPaddingItems) {
      for (let ref of autoPaddingItem.childRefs) {
        ref.addEventListener('click', autoPaddingItem.updatePaddingValue.bind(autoPaddingItem))
      }

      window.addEventListener('resize', () => {
        autoPaddingItem.updatePaddingValue()
      })
    }


    document.addEventListener('DOMContentLoaded', () => {
      let scrollElement = document.querySelector(location.hash ? location.hash : null)

      if (scrollElement) {
        scrollElement.scrollIntoView(true)
      }
    })
  }
}