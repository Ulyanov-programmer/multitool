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
    let switchEvent = getComputedStyle(this).getPropertyValue('--switch-event').trim()

    if (switchEvent == 'hover') {
      this.addEventListener('mouseenter', this.openTab)
    }
    else if (switchEvent == 'click' || switchEvent == '') {
      this.addEventListener('click', this.openTab)
    }

    this.addEventListener('keyup', event =>
      event.key == 'Enter' ? this.openTab() : false
    )
    this.initShadowRoot()

    document.addEventListener('DOMContentLoaded', this.init.bind(this))
  }
  init() {
    this.controlsTab = document.getElementById(
      this.getAttribute('aria-controls')
    ) as HTMLTabItem
  }
  private initShadowRoot() {
    this.attachShadow({ mode: 'closed' })
      .innerHTML = `
<style>
  :host {
    cursor: pointer !important;
    display: inline-block;
  }
</style>
<slot></slot>
    `
  }

  openTab() {
    if (!this.controlsTab || this.controlsTab.current) return

    this.controlsTab.parentFrame.toggleTabs(this.controlsTab)
  }
}
class HTMLTabFrame extends HTMLElement {
  private items: HTMLCollectionOf<HTMLTabItem>
  private containerHeight: number = 0
  private isSwitching: boolean
  private resizeObserver: ResizeObserver

  constructor() {
    super()
  }

  connectedCallback() {
    this.initShadowRoot()

    document.addEventListener('DOMContentLoaded', this.init.bind(this))
    window.addEventListener('resize', this.setFrameHeight.bind(this))
  }
  init() {
    this.items = this.children as HTMLCollectionOf<HTMLTabItem>

    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.setFrameHeight(entry.borderBoxSize[0].blockSize)
      }
    })

    this.setTabs()
  }

  private initShadowRoot() {
    this.attachShadow({ mode: 'closed' })
      .innerHTML = `
<style>
  :host {
    display: grid !important;
    grid-template: 1fr / 1fr !important;
    place-items: start stretch;
    transition-property: height;
  }
  ::slotted(tab-item) {
    grid-column: 1 / 2 !important;
    grid-row: 1 / 2 !important;
  }
  @media (prefers-reduced-motion: no-preference) {
    :host {
      transition-duration: 300ms;
    }
  }
</style>
<slot></slot>
    `
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

    if (!this.isFade()) await sleep(switchedItem.transitionDurationValue)
    if (this.isAutoHeight()) this.setFrameHeight(switchedItem.clientHeight)

    switchedItem.current = true
    this.resizeObserver.observe(switchedItem)

    await sleep(switchedItem.transitionDurationValue)
    this.isSwitching = false
  }

  private setFrameHeight(height: number | Event) {
    if (!this.isAutoHeight()) return

    let heightOfPaddings =
      parseInt(window.getComputedStyle(this).paddingBlock.replace('px', '')) * 2

    if (typeof height != 'number') {
      // Get the height of the current tab.
      height = Array.from(this.items).find(item => item.current).clientHeight
    }

    this.style.height = heightOfPaddings + height + 'px'
  }
  private disableAnotherItems(switchedItem: HTMLTabItem, isInitial?: Boolean) {
    for (let item of this.items) {
      if (item != switchedItem) {
        this.resizeObserver.unobserve(item)

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
    this.resizeObserver.observe(this.items[0])

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
  private isFade() {
    return getComputedStyle(this).getPropertyValue('--fade').trim() == 'fade'
  }
  private isAutoHeight() {
    return getComputedStyle(this).getPropertyValue('--auto-height').trim() == 'auto-height'
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

    this.initShadowRoot()

    document.addEventListener('DOMContentLoaded', this.init.bind(this))
  }
  init() {
    this.controlsButtons = this.controlsButtons ??
      document.querySelectorAll(`tab-button[aria-controls=${this.id}]`)
  }
  private initShadowRoot() {
    HTMLStyleElement
    this.attachShadow({ mode: 'closed' })
      .innerHTML = `
<style>
  :host {
    pointer-events: none !important;
    display: block !important;
    opacity: 0 !important;
    transition-property: opacity;
  }
  :host([current]) {
    pointer-events: all !important;
    opacity: 1 !important;
  }
  @media (prefers-reduced-motion: no-preference) {
    :host {
      transition-duration: 300ms;
    }
  }
</style>
<slot></slot>
    `
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