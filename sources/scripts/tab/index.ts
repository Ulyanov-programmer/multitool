class HTMLTabButton extends HTMLElement {
  public controlsTab: HTMLTabItem

  private _expanded: boolean
  public get expanded(): boolean {
    return this._expanded
  }
  public set expanded(v: boolean) {
    v ? this.setAttribute('expanded', '') : this.removeAttribute('expanded')
    this._expanded = v
    this.ariaExpanded = v.toString()
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.role = 'tab'
    this.tabIndex = 0
    this.ariaExpanded = 'false'
    this.expanded = Boolean(this.ariaExpanded)

    if (this.hasAttribute('hover')) {
      this.addEventListener('mouseenter', this.openTab)
    }
    else {
      this.addEventListener('click', this.openTab)
    }

    this.addEventListener('keyup', event =>
      event.key == 'Enter' ? this.openTab() : false
    )

    document.addEventListener('DOMContentLoaded', this.init.bind(this))
  }
  init() {
    this.controlsTab = document.getElementById(
      this.getAttribute('aria-controls')
    ) as HTMLTabItem
  }

  openTab() {
    if (!this.controlsTab || this.controlsTab.current) return

    this.controlsTab.parentFrame.toggleTabs(this.controlsTab)
  }
}
class HTMLTabFrame extends HTMLElement {
  private items: HTMLCollectionOf<HTMLTabItem>
  private autoHeight: boolean
  private containerHeight: number = 0
  private isSwitching: boolean

  private _isFade: boolean
  public get isFade(): boolean {
    return this._isFade
  }
  public set isFade(v: boolean) {
    v ? this.setAttribute('fade', '') : this.removeAttribute('fade')
    this._isFade = v
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.autoHeight = this.hasAttribute('auto-height')
    this.isFade = this.hasAttribute('fade')

    document.addEventListener('DOMContentLoaded', this.init.bind(this))
    window.addEventListener('resize', this.setFrameHeight.bind(this))
  }
  init() {
    this.items = this.children as HTMLCollectionOf<HTMLTabItem>

    if (!this.autoHeight) {
      // Setting the height of the largest child.
      this.containerHeight = Math.max(...Array.from(this.items).map(item => item.clientHeight))
    }
    else {
      this.containerHeight =
        this.getCurrentItem()?.clientHeight ?? this.items[0].clientHeight
    }

    this.setFrameHeight(this.containerHeight)

    this.setTabs()
  }

  private setTabs() {
    if (!this.getCurrentItem()) {
      this.activateFirstItem()
      this.disableAnotherItems(this.items[0], true)
    }
  }

  async toggleTabs(switchedItem: HTMLTabItem) {
    if (switchedItem.current || this.isSwitching) return

    this.isSwitching = true

    this.disableAnotherItems(switchedItem)

    if (!this.isFade) await sleep(switchedItem.transitionDurationValue)
    if (this.autoHeight) this.setFrameHeight(switchedItem.clientHeight)

    switchedItem.current = true

    await sleep(switchedItem.transitionDurationValue)
    this.isSwitching = false
  }

  private setFrameHeight(height: number | Event) {
    if (typeof height != 'number') {
      // Get the height of the current tab.
      height = Array.from(this.items).find(item => item.current).clientHeight
    }

    this.style.height = height + 'px'
  }
  private disableAnotherItems(switchedItem: HTMLTabItem, isInitial?: Boolean) {
    for (let item of this.items) {
      if (item != switchedItem) {
        if (isInitial) {
          item.style.transition = 'none'
          item.current = false

          setTimeout(() => {
            item.style.transition = ''
          }, 30)
        }
        else {
          item.current = false
        }
      }
    }
  }
  private activateFirstItem() {
    this.items[0].style.transition = 'none'
    this.items[0].current = true

    setTimeout(() => {
      this.items[0].style.transition = ''
    }, 50)
  }
  private getCurrentItem(): HTMLTabItem {
    for (let item of this.items) {
      var currentItem = item.current ? item : null
    }

    return currentItem
  }
}
class HTMLTabItem extends HTMLElement {
  public controlsButtons: NodeListOf<HTMLTabButton>
  public parentFrame: HTMLTabFrame

  private _transitionDurationValue: number
  public get transitionDurationValue(): number {
    return parseFloat(getComputedStyle(this)['transitionDuration']) * 1000
  }

  private _current: boolean
  public get current(): boolean {
    return this._current
  }
  public set current(v: boolean) {
    this._current = v

    this.controlsButtons = this.controlsButtons ??
      document.querySelectorAll(`tab-button[aria-controls=${this.id}]`)

    v ? this.show() : this.hide()
  }

  constructor() {
    super()
  }

  connectedCallback() {
    this.role = 'tabpanel'
    this.parentFrame = this.parentElement as HTMLTabFrame
    this.current = this.hasAttribute('current')

    document.addEventListener('DOMContentLoaded', this.init.bind(this))
  }
  init() {
    this.controlsButtons = this.controlsButtons ??
      document.querySelectorAll(`tab-button[aria-controls=${this.id}]`)
  }

  private hide() {
    this.removeAttribute('current')
    this.ariaCurrent = 'false'

    for (let button of this.controlsButtons) {
      button.expanded = false
    }
  }
  private show() {
    this.setAttribute('current', '')
    this.ariaCurrent = 'true'

    for (let button of this.controlsButtons) {
      button.expanded = true
    }
  }
}

customElements.define('tab-button', HTMLTabButton)
customElements.define('tab-frame', HTMLTabFrame)
customElements.define('tab-item', HTMLTabItem)

function sleep(timeMs: number): Promise<any> {
  return new Promise(r => setTimeout(r, timeMs))
}