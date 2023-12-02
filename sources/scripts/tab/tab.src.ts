import { sleep, elementIsExistWithLog } from '../general.js'

export enum ToggleTabsEvent {
  Click,
  Hover,
}

interface TabArgs {
  /**
    Selector for buttons that open some tab content.
    @remark Must contain `data-toggle-elem-number="numberOfContentElement"` (starts from zero).
  */
  buttonsSelector: string
  /** 
   * Selector of blocks that contain some tab content.
   */
  contentBlocksSelector: string
  /**
   * Enables the Fade effect (when one element is superimposed on another when switching).
   * @defaultValue `false`
   */
  fadeEffect?: boolean
  /**
   * Changes the height of the tab container when switching. 
   * 
   * If `false`, the block size for tabs will be equal to the size of the largest tab.
   * 
   * @remarks Please note that it works exclusively for the Fade-effect, in other cases it is always `true`.
   * @defaultValue `false`
   */
  autoHeight?: boolean
  /**
   * Duration of tab animations. 
   * 
   * @remarks It can be specified both through this argument and in the CSS property of the tabs.
   * Specifying through this argument has a higher priority.
   */
  animationDuration?: number
  /**
   * If true, does not set the class of the active button for the one that switches to the first tab when initializing tabs.
   */
  firstButtonIsNotActive?: boolean
  /**
   * Specifies what action needs to be done with the tab switch button in order for it to work.
   * Takes the value of `ToggleTabsEvent` enumeration.
   * @defaultValue `ToggleTabsEvent.Click` (need to click on a button)
   */
  toggleTabsBy?: ToggleTabsEvent

  buttonsActiveClass?: string
  contentActiveClass?: string
}
export default class Tab {
  private buttons: NodeListOf<HTMLElement>
  private contentElements: NodeListOf<HTMLElement>
  private parentOfContentElements: HTMLElement
  private animationDuration: number
  private switchingLockTime: number
  private isToggling: boolean = false
  private autoHeight: boolean
  private toggleTabsEvent: string = 'click'
  private containerHeight: number = 0
  public buttonsActiveClass: string
  public contentActiveClass: string

  constructor(arg: TabArgs) {
    if (!elementIsExistWithLog('Tab', arg.buttonsSelector, arg.contentBlocksSelector))
      return

    this.buttons = document.querySelectorAll(arg.buttonsSelector)
    this.contentElements = document.querySelectorAll(arg.contentBlocksSelector)

    if (this.buttons.length != this.contentElements.length) {
      console.log('[Tab] The count of buttons and content-elements is not equal.')
      return
    }

    this.buttonsActiveClass = arg.buttonsActiveClass ?? 'active'
    this.contentActiveClass = arg.contentActiveClass ?? 'active'
    this.autoHeight = arg.autoHeight ?? false

    if (arg.firstButtonIsNotActive == false)
      this.buttons[0].classList.add(this.buttonsActiveClass)

    this.contentElements[0].classList.add(this.contentActiveClass)


    let someTabElement = document.querySelector(arg.contentBlocksSelector) as HTMLElement
    this.parentOfContentElements = someTabElement.parentElement as HTMLElement

    if (arg.animationDuration) {
      this.animationDuration = arg.animationDuration
    } else {
      this.animationDuration = parseFloat(getComputedStyle(someTabElement)
        .getPropertyValue('transition-duration')) * 1000
    }
    this.switchingLockTime = this.animationDuration

    this.setToggleTabsEvent(arg.toggleTabsBy)


    if (arg.fadeEffect) {
      this.setFadeTabs()
      this.resizeFadeTabs()

      window.addEventListener('resize', this.resizeFadeTabs.bind(this))

      for (let tabButton of this.buttons) {
        tabButton.addEventListener(this.toggleTabsEvent, () =>
          this.toggleTabsFade(tabButton)
        )
      }
    } else {
      this.setDefaultTabs()
      this.resizeTabs()

      window.addEventListener('resize', this.resizeTabs.bind(this))

      for (let tabButton of this.buttons) {
        tabButton.addEventListener(this.toggleTabsEvent, () =>
          this.toggleTabs(tabButton)
        )
      }
    }
  }

  private setFadeTabs() {
    let marginForCurrentElement = 0

    for (let contentElement of this.contentElements) {
      if (!this.autoHeight && contentElement.clientHeight > this.containerHeight) {
        this.containerHeight = contentElement.clientHeight
      } else if (this.autoHeight && this.containerHeight <= 0) {
        this.containerHeight = this.contentElements[0].clientHeight
      }

      if (contentElement.classList.contains(this.contentActiveClass) == false) {
        contentElement.style.opacity = '0'
        contentElement.style.pointerEvents = 'none'
      }

      contentElement.style.transform = `translateY(-${marginForCurrentElement}px)`
      marginForCurrentElement += contentElement.clientHeight
    }

    this.parentOfContentElements.style.overflow = 'hidden'

    this.setContainerHeight(this.containerHeight)
    this.parentOfContentElements.style.transition = `height ${this.animationDuration}ms`

    for (let contentElement of this.contentElements) {
      contentElement.style.transition = `opacity ${this.animationDuration}ms`
    }
  }
  private setDefaultTabs() {
    for (let contentElement of this.contentElements) {
      if (contentElement.classList.contains(this.contentActiveClass) == false) {
        contentElement.setAttribute('hidden', '')
        contentElement.style.display = 'none'
        contentElement.style.opacity = '0'
        contentElement.style.pointerEvents = 'none'
      }
      contentElement.style.transition = `opacity ${this.animationDuration}ms`

      this.setContainerHeight()
      this.parentOfContentElements.style.transition = `height ${this.animationDuration}ms`
    }
  }

  private resizeFadeTabs() {
    let currentActiveElement = this.getCurrentActiveTab()
    let marginForCurrentElement = 0

    if (currentActiveElement) {
      this.parentOfContentElements.style.height = `${currentActiveElement.clientHeight}px`
    } else {
      this.parentOfContentElements.style.height = `${this.contentElements[0].clientHeight}px`
    }

    for (let contentElement of this.contentElements) {
      contentElement.style.transform = `translateY(-${marginForCurrentElement}px)`
      marginForCurrentElement += contentElement.clientHeight
    }
  }
  private resizeTabs() {
    let currentActiveElement = this.getCurrentActiveTab()

    if (currentActiveElement) {
      this.parentOfContentElements.style.height = `${currentActiveElement.clientHeight}px`
    } else {
      this.parentOfContentElements.style.height = `${this.contentElements[0].clientHeight}px`
    }
  }

  private toggleTabsFade(activeTabButton: HTMLElement) {
    if (this.toggleTogglingStateIfPossible(activeTabButton) == false) {
      return
    }
    this.toggleTabButtons(activeTabButton)

    let currentActiveElement = this.getCurrentActiveTab()
    let nextContentElement = this.getTabByPressedButton(activeTabButton)

    currentActiveElement.style.opacity = '0'
    currentActiveElement.style.pointerEvents = 'none'

    if (this.autoHeight) {
      this.setContainerHeight(nextContentElement.clientHeight)
    }
    nextContentElement.style.opacity = '1'
    nextContentElement.style.removeProperty('pointer-events')

    currentActiveElement.classList.remove(this.contentActiveClass)
    nextContentElement.classList.add(this.contentActiveClass)

    setTimeout(() => {
      this.isToggling = false
    }, this.switchingLockTime)
  }
  private async toggleTabs(activeTabButton: HTMLElement) {
    if (this.toggleTogglingStateIfPossible(activeTabButton) == false) {
      return
    }
    this.toggleTabButtons(activeTabButton)

    let currentActiveElement = this.getCurrentActiveTab()
    let nextContentElement = this.getTabByPressedButton(activeTabButton)

    currentActiveElement.classList.remove(this.contentActiveClass)
    currentActiveElement.style.opacity = '0'
    currentActiveElement.style.pointerEvents = 'none'
    await sleep(this.animationDuration)
    currentActiveElement.setAttribute('hidden', '')
    currentActiveElement.style.display = 'none'


    nextContentElement.removeAttribute('hidden')
    nextContentElement.style.removeProperty('pointer-events')
    nextContentElement.style.display = ''
    this.setContainerHeight(nextContentElement.clientHeight)

    await sleep(20)
    nextContentElement.style.opacity = '1'
    nextContentElement.classList.add(this.contentActiveClass)

    setTimeout(() => {
      this.isToggling = false
    }, this.switchingLockTime)
  }

  private toggleTabButtons(activeTabButton: HTMLElement) {
    for (let accordBtn of this.buttons) {
      if (accordBtn != activeTabButton) {
        accordBtn.classList.remove(this.buttonsActiveClass)
      } else {
        accordBtn.classList.add(this.buttonsActiveClass)
      }
    }
  }
  private toggleTogglingStateIfPossible(activeTabButton: HTMLElement): boolean {
    if (activeTabButton.classList.contains(this.buttonsActiveClass) || this.isToggling) {
      return false
    } else {
      this.isToggling = true
      return true
    }
  }
  private getCurrentActiveTab(): HTMLElement {
    for (let contElem of this.contentElements) {
      if (contElem.classList.contains(this.contentActiveClass)) {
        return contElem
      }
    }
    return this.contentElements[0]
  }
  private getTabByPressedButton(activeTabButton: HTMLElement): HTMLElement {
    return this.contentElements[activeTabButton.dataset.toggleElemNumber]
  }
  private setContainerHeight(height?: number) {
    if (height) {
      this.parentOfContentElements.style.height = `${height}px`
    } else {
      this.parentOfContentElements.style.height = `${this.contentElements[0].clientHeight}px`
    }
  }
  private setToggleTabsEvent(toggleTabsEvent: ToggleTabsEvent): void {
    switch (toggleTabsEvent) {
      case ToggleTabsEvent.Hover:
        this.toggleTabsEvent = 'mouseenter'
        this.switchingLockTime = 0
        break
      default:
        this.toggleTabsEvent = 'click'
        break
    }
  }
}