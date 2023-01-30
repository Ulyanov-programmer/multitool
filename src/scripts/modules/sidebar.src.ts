import { elementIsExistWithLog } from "./general.js"
import SwipeElement, { ChangePlane } from './swipe.src.js'

interface SidebarArgs {
  /** Selector of sidebars. Should contain id of this sidebar. */
  selectorOfSidebar: string
  /** 
    Selector for buttons that open some sidebar. 
    Should contains `data-toggle-sidebar='sidebarId'`.
  */
  sidebarActiveClass?: string
  buttonActiveClass?: string

  swipeElementOptions?: swipeElementOptions
}

interface swipeElementOptions {
  changePlane: ChangePlane,
  swipeSensitivity: number,
  maxWorkWidth: number,
}

export default class Sidebar {
  private sidebar: HTMLElement
  private sidebarButton: HTMLElement
  private static swipeArea: HTMLElement
  public static sidebarActiveClass: string
  public static buttonActiveClass: string = 'active'

  constructor(arg: SidebarArgs) {
    if (!elementIsExistWithLog('Sidebar', arg.selectorOfSidebar))
      return

    this.sidebar = document.querySelector(arg.selectorOfSidebar)
    this.sidebarButton = document.querySelector(`[data-toggle-sidebar="${this.sidebar.id}"]`)

    Sidebar.swipeArea = document.querySelector(`[data-swipe-element="${this.sidebar.id}"]`)
    Sidebar.buttonActiveClass = arg.buttonActiveClass ? arg.buttonActiveClass : 'active'
    Sidebar.sidebarActiveClass = arg.sidebarActiveClass ? arg.sidebarActiveClass : 'active'

    this.sidebarButton.addEventListener('click', () => this.toggleSidebar(this.sidebarButton))

    this.initializeSwipe(this.sidebar.id, arg.swipeElementOptions)
  }

  private toggleSidebar(eventButton: HTMLElement) {
    let sidebar = document.getElementById(eventButton.dataset.toggleSidebar)

    eventButton.classList.toggle(Sidebar.buttonActiveClass)
    sidebar.classList.toggle(Sidebar.sidebarActiveClass)
    Sidebar.swipeArea.classList.toggle('active')
  }

  private initializeSwipe(sidebarId: string, swipeElementOptions: swipeElementOptions) {
    new SwipeElement({
      touchStartAreaSelector: `[data-swipe-element="${sidebarId}"]`,
      swipableElementSelector: `#${sidebarId}`,
      changePlane: swipeElementOptions.changePlane,
      swipeSensitivity: swipeElementOptions.swipeSensitivity,
      maxWorkWidth: swipeElementOptions.maxWorkWidth,
    })
  }
}