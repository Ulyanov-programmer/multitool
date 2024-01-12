class AutoScrollPaddingItem {
  private fixedElements: NodeListOf<HTMLElement>

  constructor() {
    this.fixedElements = document.querySelectorAll('[data-auto-scroll-padding]')

    for (let element of this.fixedElements) {
      this.initFixedElement(element)
      this.updatePaddingValue(element)
    }

    window.addEventListener('resize', this.resizeWindowEventHandler.bind(this))

    document.addEventListener('DOMContentLoaded', () => {
      try {
        let scrollElement = document.querySelector(location.hash)
        if (scrollElement)
          scrollElement.scrollIntoView(true)
      }
      catch (error) { }
    })
  }

  private resizeWindowEventHandler() {
    for (let element of this.fixedElements) {
      this.updatePaddingValue(element)
    }
  }

  private updatePaddingValue(fixedElement: HTMLElement) {
    let scrollableParent = document.querySelector<HTMLElement>(fixedElement.dataset.scrollableParent)

    if (fixedElement.dataset.varForPadding) {
      scrollableParent.style.setProperty(
        '--' + fixedElement.dataset.varForPadding,
        this.getPaddingValue(fixedElement)
      )
    }
    else {
      switch (fixedElement.dataset.paddingDirection) {
        case 'top':
          scrollableParent.style.scrollPaddingTop = this.getPaddingValue(fixedElement)
          break
        case 'bottom':
          scrollableParent.style.scrollPaddingBottom = this.getPaddingValue(fixedElement)
          break
        case 'left':
          scrollableParent.style.scrollPaddingLeft = this.getPaddingValue(fixedElement)
          break
        case 'right':
          scrollableParent.style.scrollPaddingRight = this.getPaddingValue(fixedElement)
          break
      }
    }
  }

  private initFixedElement(fixedElement: HTMLElement) {
    if (!fixedElement.dataset.gap)
      fixedElement.dataset.gap = '5'

    if (!fixedElement.dataset.paddingDirection)
      fixedElement.dataset.paddingDirection = 'top'

    if (!fixedElement.dataset.scrollableParent)
      fixedElement.dataset.scrollableParent = 'html'

    let scrollableParent = document.querySelector<HTMLElement>(fixedElement.dataset.scrollableParent)

    fixedElement.dataset.scrollBehavior
      ? scrollableParent.style.scrollBehavior = fixedElement.dataset.scrollBehavior
      : scrollableParent.style.scrollBehavior = 'smooth'

    for (let ref of fixedElement.querySelectorAll('a[href^="#"]')) {
      ref.addEventListener('click', () => {
        this.updatePaddingValue(fixedElement)
      })
    }
  }

  private getPaddingValue(fixedElement: HTMLElement): string {
    switch (fixedElement.dataset.paddingDirection) {
      case 'top':
      case 'bottom':
        return fixedElement.offsetHeight + parseInt(fixedElement.dataset.gap) + 'px'
      case 'left':
      case 'right':
        return fixedElement.offsetWidth + parseInt(fixedElement.dataset.gap) + 'px'
    }
  }
}

new AutoScrollPaddingItem()