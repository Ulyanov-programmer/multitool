import { returnScrollbarWidth, elementIsExistWithLog } from "./general.js"

interface BurgerMenuArgs {
  burgerSelector: string
  /** A fullscreen-menu selector that will be shown when you click on the burger. */
  burgerMenuSelector: string
  /** 
    Selector of buttons that are contained in the menu. It is necessary to close the menu when pressing the buttons.
  */
  buttonsSelector: string
  /** If the value is true, set the automatic padding to the size of a header. */
  autoPadding?: autoPaddingOptions
  burgerActiveClass?: string
  menuActiveClass?: string
  closingByClickOnElement?: boolean
}

export default class BurgerMenu {
  private static burger: HTMLElement
  private static menu: HTMLElement
  private static buttons: NodeListOf<HTMLElement>
  private static autoPaddingOptions: autoPaddingOptions
  private static closingByClickOnElement: boolean = true

  public static burgerActiveClass: string
  public static menuActiveClass: string

  constructor(args: BurgerMenuArgs) {
    if (!elementIsExistWithLog('BurgerMenu', args.burgerSelector, args.burgerMenuSelector, args.buttonsSelector))
      return

    BurgerMenu.burger = document.querySelector(args.burgerSelector) as HTMLElement
    BurgerMenu.menu = document.querySelector(args.burgerMenuSelector) as HTMLElement
    BurgerMenu.closingByClickOnElement = args.closingByClickOnElement

    BurgerMenu.burgerActiveClass = args.burgerActiveClass ? args.burgerActiveClass : 'active'
    BurgerMenu.menuActiveClass = args.menuActiveClass ? args.menuActiveClass : 'active'

    BurgerMenu.burger.addEventListener('click', this.toggleNavmenu)

    if (BurgerMenu.closingByClickOnElement) {
      BurgerMenu.buttons = document.querySelectorAll(args.buttonsSelector)

      for (let button of BurgerMenu.buttons) {
        button.addEventListener('click', this.toggleNavmenu)
      }
    }
    if (args.autoPadding) {
      BurgerMenu.autoPaddingOptions = args.autoPadding
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
    BurgerMenu.menu.style.marginTop = `${BurgerMenu.autoPaddingOptions.getElementHeight()}px`

    BurgerMenu.burger.classList.add(BurgerMenu.burgerActiveClass)

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
  private static hideNavmenu() {
    BurgerMenu.menu.classList.remove(BurgerMenu.menuActiveClass)
    BurgerMenu.menu.style.marginTop = `0px`

    BurgerMenu.burger.classList.remove(BurgerMenu.burgerActiveClass)

    document.body.style.overflow = ''
    document.body.style.paddingRight = `0px`
  }
  private changePaddingSizeBySizeOfHeader() {
    if (BurgerMenu.menu.classList.contains(BurgerMenu.menuActiveClass)) {
      BurgerMenu.menu.style.marginTop = `${BurgerMenu.autoPaddingOptions.getElementHeight()}px`
    }
  }
}
export class autoPaddingOptions {
  public element: HTMLElement

  constructor(selectorOfElement: string) {
    if (elementIsExistWithLog('autoPaddingOptions', selectorOfElement)) {
      this.element = document.querySelector(selectorOfElement)
    }
  }

  public getElementHeight() {
    return this.element.clientHeight
  }
}
