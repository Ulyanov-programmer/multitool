import { elementIsExistWithLog } from './general.js'
import SwipeElement, { ChangePlane } from './swipe.src.js'

interface SidebarArgs {
  /** Id of sidebar. */
  idOfSidebar: string

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
  private sidebarId: string
  private sidebarButton: HTMLElement
  private static swipeArea: HTMLElement
  public static sidebarActiveClass: string = 'active'
  public static buttonActiveClass: string = 'active'

  constructor(arg: SidebarArgs) {
    this.sidebarId = `#${arg.idOfSidebar}`

    if (!elementIsExistWithLog('Sidebar', this.sidebarId))
      return

    this.sidebar = document.querySelector(this.sidebarId)
    this.sidebarButton = document.querySelector(`[data-toggle-sidebar-id='${arg.idOfSidebar}']`)

    Sidebar.swipeArea = document.querySelector(`[data-swipe-element='${this.sidebarId}']`)

    if (Sidebar.buttonActiveClass)
      Sidebar.buttonActiveClass = arg.buttonActiveClass
    if (Sidebar.sidebarActiveClass)
      Sidebar.sidebarActiveClass = arg.sidebarActiveClass


    this.sidebarButton.addEventListener('click', () => {
      this.toggleSidebar(this.sidebarButton)
    })

    if (arg.swipeElementOptions) {
      this.initializeSwipe(arg.swipeElementOptions)
    }
  }

  private toggleSidebar(eventButton: HTMLElement) {
    let sidebar = document.getElementById(eventButton.dataset.toggleSidebarId)

    eventButton.classList.toggle(Sidebar.buttonActiveClass)
    sidebar.classList.toggle(Sidebar.sidebarActiveClass)

    if (Sidebar.swipeArea) {
      Sidebar.swipeArea.classList.toggle('active')
    }
  }

  private initializeSwipe(swipeElementOptions: swipeElementOptions) {
    new SwipeElement({
      touchStartAreaSelector: `[data-swipe-element='${this.sidebarId}']`,
      swipeableElementSelector: `${this.sidebarId}`,
      changePlane: swipeElementOptions.changePlane,
      swipeSensitivity: swipeElementOptions.swipeSensitivity,
      maxWorkWidth: swipeElementOptions.maxWorkWidth,
    })
  }
}