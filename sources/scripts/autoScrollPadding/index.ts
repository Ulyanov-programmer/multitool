class AutoScrollPaddingItem {
  private fixedElements: NodeListOf<HTMLElement>

  constructor() {
    this.fixedElements = document.querySelectorAll('[data-auto-scroll-padding]')

    for (let element of this.fixedElements) {
      this.initFixedElement(element)
      this.updatePaddingValue(element)
    }

    document.addEventListener('DOMContentLoaded', () => {
      try {
        let scrollElement = document.querySelector(location.hash)
        if (scrollElement)
          scrollElement.scrollIntoView(true)
      }
      catch (error) { }
    })
  }

  private updatePaddingValue(fixedElement: HTMLElement) {
    let [gap, direction, cssVariable] = fixedElement.dataset.autoScrollPadding.replace(/\s+/g, '').split('/')

    let scrollableParent = document.querySelector<HTMLElement>(fixedElement.dataset.scrollableParent)

    if (cssVariable) {
      scrollableParent.style.setProperty(
        cssVariable, this.getPaddingValue(fixedElement)
      )
    }
    else {
      switch (direction) {
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

        default:
          scrollableParent.style.scrollPadding = this.getPaddingValue(fixedElement)
          break
      }
    }
  }

  private initFixedElement(fixedElement: HTMLElement) {
    if (!fixedElement.dataset.scrollableParent)
      fixedElement.dataset.scrollableParent = 'html'

    for (let ref of fixedElement.querySelectorAll('a[href^="#"]')) {
      ref.addEventListener('pointerdown', () =>
        this.updatePaddingValue(fixedElement)
      )
      ref.addEventListener('keydown', (e: Event) => {
        //@ts-expect-error
        if (e.key == 'Enter')
          this.updatePaddingValue(fixedElement)
      })
    }
  }

  private getPaddingValue(fixedElement: HTMLElement): string {
    let [gap, direction] = fixedElement.dataset.autoScrollPadding.split('/')

    switch (direction) {
      case 'top':
      case 'bottom':
        return `calc(${fixedElement.offsetHeight}px + ${gap || '0'})`

      case 'left':
      case 'right':
        return `calc(${fixedElement.offsetWidth}px + ${gap || '0'})`

      default:
        return `calc(${fixedElement.offsetHeight}px + ${gap || '0px'})`
    }
  }
}

new AutoScrollPaddingItem()