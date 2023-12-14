import { sleep, elementIsExistWithLog } from '../general.js'

export enum ToggleTabsEvent {
  Click,
  Hover,
}

interface TabArgs {
  buttonsContainerSelector: string
  tabsContainerSelector: string
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
   * Specifies what action needs to be done with the tab switch button in order for it to work.
   * Takes the value of `ToggleTabsEvent` enumeration.
   * @defaultValue `ToggleTabsEvent.Click` (need to click on a button)
   */
  toggleTabsBy?: ToggleTabsEvent

  buttonActiveClass?: string
  tabActiveClass?: string
}
export default class Tab {
  private buttons: HTMLCollectionOf<HTMLButtonElement>
  private tabs: HTMLCollectionOf<HTMLElement>
  private parentOfTabs: HTMLElement
  private parentOfButtons: HTMLElement
  private animationDuration: number
  private switchingLockTime: number
  private isToggling: boolean = false
  private autoHeight: boolean
  private toggleTabsEvent: string = 'click'
  private containerHeight: number = 0
  public buttonActiveClass: string
  public tabActiveClass: string

  constructor(arg: TabArgs) {
    if (!elementIsExistWithLog('Tab', arg.buttonsContainerSelector, arg.tabsContainerSelector))
      return

    // Getting all links and tabs inside containers (the first level of nesting, all items)
    this.parentOfButtons = document.querySelector(arg.buttonsContainerSelector)
    this.parentOfTabs = document.querySelector(arg.tabsContainerSelector)
    this.buttons = this.parentOfButtons.children as HTMLCollectionOf<HTMLButtonElement>
    this.tabs = this.parentOfTabs.children as HTMLCollectionOf<HTMLElement>


    if (this.buttons.length != this.tabs.length) {
      console.log('[Tab] The count of buttons and content-elements is not equal.')
      return
    }

    this.buttonActiveClass = arg.buttonActiveClass
    this.tabActiveClass = arg.tabActiveClass
    this.autoHeight = arg.autoHeight ?? false

    if (this.tabActiveClass)
      this.tabs[0].classList.add(this.tabActiveClass)

    this.parentOfButtons.setAttribute('role', 'tablist')

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (arg.animationDuration) {
        this.animationDuration = arg.animationDuration
      }
      else {
        this.animationDuration = parseFloat(getComputedStyle(this.tabs[0])
          .getPropertyValue('transition-duration')) * 1000
      }
    }
    else {
      this.animationDuration = 0
    }

    this.switchingLockTime = this.animationDuration

    this.setToggleTabsEvent(arg.toggleTabsBy)
    this.setButtons(arg.fadeEffect)


    if (arg.fadeEffect) {
      this.setFadeTabs()
      this.resizeFadeTabs()

      window.addEventListener('resize', this.resizeFadeTabs.bind(this))
    }
    else {
      this.setDefaultTabs()
      this.resizeTabs()

      window.addEventListener('resize', this.resizeTabs.bind(this))
    }
  }

  private setButtons(isFadeTabs: boolean) {
    for (let button of this.buttons) {
      button.setAttribute('role', 'tab')
      button.setAttribute('aria-expanded', 'false')

      button.addEventListener(this.toggleTabsEvent, event => {
        event.preventDefault()

        isFadeTabs
          ? this.toggleTabsFade(button)
          : this.toggleTabs(button)
      })
    }

    this.buttons[0].setAttribute('aria-expanded', 'true')
  }
  private setFadeTabs() {
    let marginForCurrentElement = 0

    for (let tab of this.tabs) {
      tab.setAttribute('tabindex', '0')
      tab.setAttribute('role', 'tabpanel')
      tab.setAttribute('aria-current', 'false')

      if (!this.autoHeight && tab.clientHeight > this.containerHeight) {
        this.containerHeight = tab.clientHeight
      }
      else if (this.autoHeight && this.containerHeight <= 0) {
        this.containerHeight = this.tabs[0].clientHeight
      }

      if (tab != this.tabs[0]) {
        tab.style.opacity = '0'
        tab.style.pointerEvents = 'none'
        tab.setAttribute('tabindex', '-1')
        tab.setAttribute('aria-current', 'false')
      }

      tab.style.transform = `translateY(-${marginForCurrentElement}px)`
      marginForCurrentElement += tab.clientHeight
    }

    this.parentOfTabs.style.overflow = 'hidden'
    this.tabs[0].setAttribute('aria-current', 'true')

    this.setContainerHeight(this.containerHeight)
    this.parentOfTabs.style.transition = `height ${this.animationDuration}ms`

    for (let contentElement of this.tabs) {
      contentElement.style.transition = `opacity ${this.animationDuration}ms`
    }
  }
  private setDefaultTabs() {
    for (let tab of this.tabs) {
      tab.setAttribute('tabindex', '0')
      tab.setAttribute('role', 'tabpanel')
      tab.setAttribute('aria-current', 'false')

      if (tab != this.tabs[0]) {
        tab.setAttribute('hidden', '')
        tab.setAttribute('tabindex', '-1')
        tab.style.display = 'none'
        tab.style.opacity = '0'
        tab.style.pointerEvents = 'none'
      }

      tab.style.transition = `opacity ${this.animationDuration}ms`

      this.setContainerHeight()
      this.parentOfTabs.style.transition = `height ${this.animationDuration}ms`
    }

    this.tabs[0].setAttribute('aria-current', 'true')
  }

  private resizeFadeTabs() {
    let currentActiveTab = this.getCurrentActiveTab()
    let marginForCurrentElement = 0

    if (currentActiveTab) {
      this.parentOfTabs.style.height = currentActiveTab.clientHeight + 'px'
    } else {
      this.parentOfTabs.style.height = this.tabs[0].clientHeight + 'px'
    }

    for (let tab of this.tabs) {
      tab.style.transform = `translateY(-${marginForCurrentElement}px)`
      marginForCurrentElement += tab.clientHeight
    }
  }
  private resizeTabs() {
    let currentActiveTab = this.getCurrentActiveTab()

    if (currentActiveTab) {
      this.parentOfTabs.style.height = currentActiveTab.clientHeight + 'px'
    } else {
      this.parentOfTabs.style.height = this.tabs[0].clientHeight + 'px'
    }
  }

  private toggleTabsFade(activeButton: HTMLButtonElement) {
    if (!this.toggleTogglingStateIfPossible(activeButton)) return

    this.toggleTabButtons(activeButton)

    let currentActiveTab = this.getCurrentActiveTab()
    let nextContentTab = this.getTabByPressedButton(activeButton)

    currentActiveTab.style.opacity = '0'
    currentActiveTab.style.pointerEvents = 'none'
    currentActiveTab.setAttribute('tabindex', '-1')
    currentActiveTab.setAttribute('aria-current', 'false')

    if (this.autoHeight)
      this.setContainerHeight(nextContentTab.clientHeight)

    nextContentTab.style.opacity = '1'
    nextContentTab.style.removeProperty('pointer-events')

    currentActiveTab.classList.remove(this.tabActiveClass)

    if (this.tabActiveClass) {
      nextContentTab.classList.add(this.tabActiveClass)
    }

    nextContentTab.setAttribute('tabindex', '0')
    nextContentTab.setAttribute('aria-current', 'true')

    setTimeout(() => {
      this.isToggling = false
    }, this.switchingLockTime)
  }
  private async toggleTabs(activeButton: HTMLButtonElement) {
    if (!this.toggleTogglingStateIfPossible(activeButton)) return

    this.toggleTabButtons(activeButton)

    let currentActiveTab = this.getCurrentActiveTab()
    let nextContentTab = this.getTabByPressedButton(activeButton)

    currentActiveTab.classList.remove(this.tabActiveClass)
    currentActiveTab.style.opacity = '0'
    currentActiveTab.style.pointerEvents = 'none'
    await sleep(this.animationDuration)
    currentActiveTab.style.display = 'none'
    currentActiveTab.setAttribute('hidden', '')
    currentActiveTab.setAttribute('tabindex', '-1')
    currentActiveTab.setAttribute('aria-current', 'false')


    nextContentTab.removeAttribute('hidden')
    nextContentTab.setAttribute('tabindex', '0')
    nextContentTab.setAttribute('aria-current', 'true')
    nextContentTab.style.removeProperty('pointer-events')
    nextContentTab.style.display = ''
    this.setContainerHeight(nextContentTab.clientHeight)

    await sleep(20)
    nextContentTab.style.opacity = '1'

    if (this.tabActiveClass) {
      nextContentTab.classList.add(this.tabActiveClass)
    }

    setTimeout(() => {
      this.isToggling = false
    }, this.switchingLockTime)
  }

  private toggleTabButtons(activeButton: HTMLElement) {
    for (let button of this.buttons) {
      if (button != activeButton) {
        button.classList.remove(this.buttonActiveClass)
        button.setAttribute('aria-expanded', 'false')
      }
      else {
        if (button.classList.contains(this.buttonActiveClass)) {
          button.classList.add(this.buttonActiveClass)
        }
        button.setAttribute('aria-expanded', 'true')
      }
    }
  }
  private toggleTogglingStateIfPossible(activeButton: HTMLElement): boolean {
    if (activeButton.getAttribute('aria-expanded') == 'true' || this.isToggling) {
      return false
    }
    else {
      this.isToggling = true
      return true
    }
  }
  private getCurrentActiveTab(): HTMLElement {
    let activeTab = this.parentOfTabs.querySelector<HTMLElement>(`[aria-current="true"]`)

    if (activeTab)
      return activeTab

    return this.tabs[0]
  }
  private getTabByPressedButton(activeButton: HTMLButtonElement): HTMLElement {
    return this.parentOfTabs.querySelector(
      '#' + activeButton.getAttribute('aria-controls')
    )
  }
  private setContainerHeight(height?: number) {
    if (height) {
      this.parentOfTabs.style.height = height + 'px'
    } else {
      this.parentOfTabs.style.height = this.tabs[0].clientHeight + 'px'
    }
  }
  private setToggleTabsEvent(toggleTabsEvent: ToggleTabsEvent) {
    if (toggleTabsEvent == ToggleTabsEvent.Hover) {
      this.toggleTabsEvent = 'mouseenter'
      this.switchingLockTime = 0
    }
    else {
      this.toggleTabsEvent = 'click'
    }
  }
}