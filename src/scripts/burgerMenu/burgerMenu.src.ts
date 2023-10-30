import { returnScrollbarWidth, elementIsExistWithLog, sleep } from '../general.js'

interface BurgerMenuArgs {
  burgerSelector: string
  /** 
   * The selector of the element that will be active when the call button is pressed. 
   */
  burgerMenuSelector: string
  /** 
    Selector of buttons that are contained in the menu. It is necessary to close the menu when pressing the buttons.
  */
  buttonsSelector: string
  /** 
   * Add, if necessary, that when the menu is called, it has an offset from a certain fixed element.
   */
  autoPadding?: autoPaddingOptions
  /**
   * Specify `true` if you want the menu to be closed by clicking on one of its items.
   * @defaultValue `true`
   */
  closeMenuByClickOnElement?: boolean
  burgerActiveClass?: string
  menuActiveClass?: string
}

export default class BurgerMenu {
  private static burger: HTMLElement
  private static menu: HTMLElement
  private static buttons: NodeListOf<HTMLElement>
  private static autoPaddingOptions: autoPaddingOptions
  private static closeMenuByClickOnElement: boolean = true
  private static burgerMenuStyles: CSSStyleDeclaration
  private static burgerMenuTransitionDurationMs: number = 100

  public static burgerActiveClass: string
  public static menuActiveClass: string

  constructor(args: BurgerMenuArgs) {
    if (!elementIsExistWithLog('BurgerMenu', args.burgerSelector, args.burgerMenuSelector, args.buttonsSelector))
      return

    BurgerMenu.burger = document.querySelector(args.burgerSelector)
    BurgerMenu.menu = document.querySelector(args.burgerMenuSelector)
    BurgerMenu.closeMenuByClickOnElement = args.closeMenuByClickOnElement

    BurgerMenu.burgerMenuStyles = getComputedStyle(BurgerMenu.menu)
    BurgerMenu.burgerMenuTransitionDurationMs =
      parseFloat(BurgerMenu.burgerMenuStyles.transitionDuration) * 1000

    BurgerMenu.burgerActiveClass = args.burgerActiveClass ?? 'active'
    BurgerMenu.menuActiveClass = args.menuActiveClass ?? 'active'

    BurgerMenu.burger.addEventListener('click', this.toggleNavmenu)

    if (BurgerMenu.closeMenuByClickOnElement) {
      BurgerMenu.buttons = document.querySelectorAll(args.buttonsSelector)

      for (let button of BurgerMenu.buttons) {
        button.addEventListener('click', this.toggleNavmenu)
      }
    }

    if (args.autoPadding) {
      BurgerMenu.autoPaddingOptions = args.autoPadding

      this.changePaddingSizeBySizeOfHeader()
      window.addEventListener('resize', this.changePaddingSizeBySizeOfHeader)
    }
  }


  private toggleNavmenu() {
    let scrollbarWidth = returnScrollbarWidth()

    if (BurgerMenu.menu.classList.contains(BurgerMenu.menuActiveClass) == false) {
      BurgerMenu.showNavmenu(scrollbarWidth)
    } else {
      BurgerMenu.hideNavmenu()
    }
  }

  private static showNavmenu(scrollbarWidth: number) {
    BurgerMenu.menu.classList.add(BurgerMenu.menuActiveClass)

    BurgerMenu.burger.classList.add(BurgerMenu.burgerActiveClass)

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
  private static async hideNavmenu() {
    BurgerMenu.menu.classList.remove(BurgerMenu.menuActiveClass)

    BurgerMenu.burger.classList.remove(BurgerMenu.burgerActiveClass)

    await sleep(this.burgerMenuTransitionDurationMs)

    document.body.style.overflow = ''
    document.body.style.paddingRight = `0px`
  }

  private changePaddingSizeBySizeOfHeader() {
    BurgerMenu.autoPaddingOptions.setHeaderPadding()
  }
}

export class autoPaddingOptions {
  private element: HTMLElement
  private root: HTMLElement

  /**
   * Create, if you want the menu to have an indent from a certain fixed element.
   * @param selectorOfElement The element from whose height the indentation for the menu will be calculated when it appears.
   */
  constructor(selectorOfElement: string) {
    if (elementIsExistWithLog('autoPaddingOptions', selectorOfElement)) {
      this.element = document.querySelector(selectorOfElement)
    }

    this.root = document.querySelector(':root')
  }

  private getElementHeight() {
    return this.element.clientHeight
  }

  public setHeaderPadding() {
    this.root.style.setProperty('--burger-margin-top', this.getElementHeight() + 'px')
  }
}