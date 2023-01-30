import { isNullOrWhiteSpaces, elementIsExistWithLog } from "./general.js"
export enum SubmenuOpenIvents {
  Click,
  Hover,
};

interface SubmenuArgs {
  /** The class for an active submenu menu. */
  menuActiveClass: string
  /** The class for an active submenu button. */
  buttonActiveClass: string
  /** If true, all menus that open with a click will be closed by pressing Esc. */
  disableOnEsc?: boolean
}

export default class Submenu {
  private static submenuElements: SubmenuElementGroup[] = new Array()
  public static menuActiveClass: string
  public static buttonActiveClass: string

  constructor(args: SubmenuArgs, ...submenuElements: SubmenuElementGroup[]) {
    if (isNullOrWhiteSpaces(args.menuActiveClass, args.buttonActiveClass))
      console.log('[Submenu] Please specify the classes for the elements when they are active.')

    Submenu.buttonActiveClass = args.buttonActiveClass
    Submenu.menuActiveClass = args.menuActiveClass
    Submenu.submenuElements.push(...submenuElements)

    if (args.disableOnEsc) {
      document.addEventListener('keydown', (key) =>
        key.code == 'Escape' ? Submenu.hideAllClickSubmenu() : false
      )
    }
  }


  public static showOrHideSubmenu(currentSubmenuGroup: SubmenuElementGroup, activeElement: HTMLElement) {
    for (let i = 0; i < currentSubmenuGroup.buttonElements.length; i++) {

      if (currentSubmenuGroup.buttonElements[i] == activeElement) {
        currentSubmenuGroup.buttonElements[i].classList.toggle(Submenu.buttonActiveClass)
        currentSubmenuGroup.menuElements[i].classList.toggle(Submenu.menuActiveClass)
      } else {
        currentSubmenuGroup.buttonElements[i].classList.remove(Submenu.buttonActiveClass)
        currentSubmenuGroup.menuElements[i].classList.remove(Submenu.menuActiveClass)
      }
    }
  }

  private static hideAllClickSubmenu() {
    for (let submenuGroup of Submenu.submenuElements) {

      if (submenuGroup.openIvent == SubmenuOpenIvents.Click) {

        for (let i = 0; i < submenuGroup.buttonElements.length; i++) {
          submenuGroup.buttonElements[i].classList.remove(Submenu.buttonActiveClass)
          submenuGroup.menuElements[i].classList.remove(Submenu.menuActiveClass)
        }
      }
    }
  }
}


interface SubmenuElementGroupArgs {
  /** 
    The value of the SubmenuOpenIvents enumeration, depending on what you specify,
    the menu will open either by mouse hover or by click. 
  */
  openIvent: SubmenuOpenIvents
  /** Selector of the buttons that will open a submenu. */
  buttonsSelector: string
  /** Selector of the menus that will open when a button is clicked. */
  menusSelector: string
}
export class SubmenuElementGroup {
  constructor(args: SubmenuElementGroupArgs) {
    if (!elementIsExistWithLog('SubmenuElementGroup', args.buttonsSelector, args.menusSelector))
      return

    this.menuElements = document.querySelectorAll(args.menusSelector)
    this.buttonElements = document.querySelectorAll(args.buttonsSelector)
    this.openIvent = args.openIvent

    switch (this.openIvent) {
      case SubmenuOpenIvents.Hover:
        for (let button of this.buttonElements) {
          let wrapper = button.parentElement as HTMLElement

          button.addEventListener('focus', () =>
            Submenu.showOrHideSubmenu(this, button)
          )
          button.addEventListener('focusout', () =>
            Submenu.showOrHideSubmenu(this, button)
          )
          button.addEventListener('mouseenter', () =>
            Submenu.showOrHideSubmenu(this, button)
          )
          wrapper.addEventListener('mouseleave', () =>
            Submenu.showOrHideSubmenu(this, button)
          )
        }
        break
      default:
        for (let buttonEl of this.buttonElements) {
          buttonEl.addEventListener('click', () =>
            Submenu.showOrHideSubmenu(this, buttonEl)
          )
        }
        break
    }
  }

  public menuElements: NodeListOf<HTMLElement>
  public buttonElements: NodeListOf<HTMLElement>
  public openIvent: SubmenuOpenIvents
}
