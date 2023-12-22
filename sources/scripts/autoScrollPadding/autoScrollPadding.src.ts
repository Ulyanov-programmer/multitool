export enum PaddingDirection {
  Top,
  Bottom,
  Left,
  Right,
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
  /**
   * Assigns the calculated indent to the specified css variable.
   * @example '--scroll-padding'
   */
  setInCssVariable?: string
  cssVariableLocation?: string
  /**
   * Specify `PaddingDirection.Top` | `PaddingDirection.Bottom` so that the indentation size is measured by the height of the element, or `PaddingDirection.Left` | `PaddingDirection.Right` to be measured by the width of the element.
   * 
   * Depending on which direction you specify, the appropriate side of the `scrollPadding` will be selected (`scroll-padding-right`, `scroll-padding-top`, etc).
   * @defaultValue `PaddingDirection.Top`
   */
  paddingDirection?: PaddingDirection
}
export class AutoScrollPaddingItem {
  public scrollableParent: HTMLElement
  public fixedElement: HTMLElement
  public childRefs: NodeListOf<HTMLLinkElement>
  public gap: number = 5
  public useCssVar: string
  private cssVariableLocation: HTMLElement
  public paddingDirection: PaddingDirection

  constructor(arg: AutoScrollPaddingItemArgs) {
    this.fixedElement = document.querySelector(arg.fixedElementSelector)
    this.gap = arg.gap ?? this.gap
    this.useCssVar = arg.setInCssVariable
    this.cssVariableLocation = document.querySelector(arg.cssVariableLocation)

    this.paddingDirection = arg.paddingDirection ?? PaddingDirection.Top

    if (arg.scrollableParentSelector) {
      this.scrollableParent = document.querySelector(arg.scrollableParentSelector)
    } else {
      this.scrollableParent = document.querySelector('html')
    }

    if (!this.fixedElement.style.scrollBehavior) {
      this.scrollableParent.style.scrollBehavior = arg.scrollBehavior ?? 'smooth'
    }

    this.childRefs = this.scrollableParent.querySelectorAll('a[href^="#"]')

    for (let ref of this.childRefs) {
      ref.addEventListener('click', this.updatePaddingValue)
    }

    this.updatePaddingValue()
    window.addEventListener('resize', this.updatePaddingValue)

    document.addEventListener('DOMContentLoaded', () => {
      try {
        let scrollElement = document.querySelector(location.hash)
        if (scrollElement)
          scrollElement.scrollIntoView(true)
      }
      catch (error) { }
    })
  }

  updatePaddingValue() {
    let padding: string

    switch (this.paddingDirection) {
      case PaddingDirection.Top:
      case PaddingDirection.Bottom:
        padding = this.fixedElement.offsetHeight + this.gap + 'px'
        break
      case PaddingDirection.Left:
      case PaddingDirection.Right:
        padding = this.fixedElement.offsetWidth + this.gap + 'px'
        break
    }

    if (this.useCssVar) {
      if (this.cssVariableLocation) {
        this.cssVariableLocation.style.setProperty(this.useCssVar, padding)
      } else {
        this.scrollableParent.style.setProperty(this.useCssVar, padding)
      }
    }
    else {
      switch (this.paddingDirection) {
        case PaddingDirection.Top:
          this.scrollableParent.style.scrollPaddingTop = padding
          break
        case PaddingDirection.Bottom:
          this.scrollableParent.style.scrollPaddingBottom = padding
          break
        case PaddingDirection.Left:
          this.scrollableParent.style.scrollPaddingLeft = padding
          break
        case PaddingDirection.Right:
          this.scrollableParent.style.scrollPaddingRight = padding
          break
      }
    }
  }
}