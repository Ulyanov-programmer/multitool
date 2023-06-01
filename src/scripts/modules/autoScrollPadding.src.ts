interface AutoPaddingLocalParams {
  /**
    Specify which block is nested and scrollable.
  */
  scrollableParentSelector: string
}
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
    If you have a nested scrollable block and you want to scroll inside it, pass these parameters.
  */
  localParams?: AutoPaddingLocalParams
  /**
    Indent from the element so that it does not fit closely to the fixed block.
    @defaultValue `5` (5px)
  */
  gap?: number
}
export class AutoScrollPaddingItem {
  public scrollableParentElement: HTMLElement
  public fixedElement: HTMLElement
  public childRefs: NodeListOf<HTMLAnchorElement>
  public localParams: AutoPaddingLocalParams
  public gap: number = 5

  constructor(arg: AutoScrollPaddingItemArgs) {
    this.fixedElement = document.querySelector(arg.fixedElementSelector)
    this.gap = arg.gap ?? this.gap

    if (arg.localParams) {
      this.scrollableParentElement = document.querySelector(arg.localParams.scrollableParentSelector)
    } else {
      this.scrollableParentElement = document.querySelector('html')
    }

    if (this.fixedElement.style.scrollBehavior == '') {
      this.scrollableParentElement.style.scrollBehavior = arg.scrollBehavior ?? 'smooth'
    }

    this.scrollableParentElement.style.scrollPadding = `${this.fixedElement.offsetHeight}px`

    this.childRefs = document.querySelectorAll('a[href^="#"]')
  }

  public clickHandler(event: Event) {
    this.scrollableParentElement.style.scrollPadding =
      `${this.fixedElement.offsetHeight + this.gap}px`
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
      autoPaddingItem.scrollableParentElement.style.scrollPadding =
        `${autoPaddingItem.fixedElement.offsetHeight}px`
    }

    for (let autoPaddingItem of this.autoPaddingItems) {
      for (let ref of autoPaddingItem.childRefs) {
        ref.addEventListener('click', autoPaddingItem.clickHandler.bind(autoPaddingItem))
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      let scrollElement = document.querySelector(location.hash ? location.hash : null)

      if (scrollElement) {
        scrollElement.scrollIntoView(true)
      }
    })
  }
}