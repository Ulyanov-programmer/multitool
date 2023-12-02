import { elementIsExistWithLog } from '../general.js'

export enum SubmenuOpenEvents {
  Click,
  Hover,
}

interface SubmenuArgs {
  menuActiveClass: string
  buttonActiveClass: string
  /** 
   * If true, all menus that open with a click will be closed by pressing `Esc`.
   * @defaultValue `false`
   */
  disableOnEsc?: boolean
}
export default class Submenu {
  private static submenuElements: SubmenuElementGroup[] = new Array()
  public static menuActiveClass: string
  public static buttonActiveClass: string

  constructor(args: SubmenuArgs, ...submenuElements: SubmenuElementGroup[]) {
    Submenu.buttonActiveClass = args.buttonActiveClass
    Submenu.menuActiveClass = args.menuActiveClass
    Submenu.submenuElements.push(...submenuElements)

    if (args.disableOnEsc) {
      document.addEventListener('keydown', key =>
        key.code == 'Escape' ? Submenu.hideAllClickSubmenu() : false
      )
    }
  }

  private static hideAllClickSubmenu() {
    for (let submenuGroup of Submenu.submenuElements) {

      if (submenuGroup.openEvent == SubmenuOpenEvents.Click) {

        for (let i = 0; i < submenuGroup.buttonElements.length; i++) {
          submenuGroup.buttonElements[i].classList.remove(Submenu.buttonActiveClass)
          submenuGroup.menuElements[i].classList.remove(Submenu.menuActiveClass)
        }
      }
    }
  }

  static toggleSubmenu(currentSubmenuGroup: SubmenuElementGroup) {
    for (let i = 0; i < currentSubmenuGroup.buttonElements.length; i++) {
      currentSubmenuGroup.buttonElements[i].classList.toggle(Submenu.buttonActiveClass)
      currentSubmenuGroup.menuElements[i].classList.toggle(Submenu.menuActiveClass)

      if (currentSubmenuGroup.menuElements[i].classList.contains(Submenu.menuActiveClass)) {
        currentSubmenuGroup.menuElements[i].style.pointerEvents = 'all'
        currentSubmenuGroup.menuElements[i].style.overflow = ''
        currentSubmenuGroup.menuElements[i].style.opacity = '1'
        currentSubmenuGroup.menuElements[i].style.visibility = ''
      } else {
        currentSubmenuGroup.menuElements[i].style.pointerEvents = 'none'
        currentSubmenuGroup.menuElements[i].style.overflow = 'hidden'
        currentSubmenuGroup.menuElements[i].style.opacity = '0'
        currentSubmenuGroup.menuElements[i].style.visibility = 'hidden'
      }
    }
  }

  static openSubmenu(currentSubmenuGroup: SubmenuElementGroup) {
    for (let i = 0; i < currentSubmenuGroup.buttonElements.length; i++) {
      currentSubmenuGroup.buttonElements[i].classList.add(Submenu.buttonActiveClass)
      currentSubmenuGroup.menuElements[i].classList.add(Submenu.menuActiveClass)

      currentSubmenuGroup.menuElements[i].style.pointerEvents = 'all'
      currentSubmenuGroup.menuElements[i].style.overflow = ''
      currentSubmenuGroup.menuElements[i].style.opacity = '1'

      currentSubmenuGroup.menuElements[i].style.visibility = ''
    }
  }
  static hideSubmenu(currentSubmenuGroup: SubmenuElementGroup) {
    for (let i = 0; i < currentSubmenuGroup.buttonElements.length; i++) {
      currentSubmenuGroup.buttonElements[i].classList.remove(Submenu.buttonActiveClass)
      currentSubmenuGroup.menuElements[i].classList.remove(Submenu.menuActiveClass)

      currentSubmenuGroup.menuElements[i].style.pointerEvents = 'none'
      currentSubmenuGroup.menuElements[i].style.overflow = 'hidden'
      currentSubmenuGroup.menuElements[i].style.opacity = '0'
      currentSubmenuGroup.menuElements[i].style.visibility = 'hidden'
    }
  }
}


interface SubmenuElementGroupArgs {
  /** 
    The value of the SubmenuOpenEvents enumeration, depending on what you specify,
    the menu will open either by mouse `SubmenuOpenEvents.Hover` or by `SubmenuOpenEvents.Click`. 
  */
  openEvent: SubmenuOpenEvents
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
    this.openEvent = args.openEvent

    switch (this.openEvent) {
      case SubmenuOpenEvents.Hover:
        for (let button of this.buttonElements) {
          button.addEventListener(
            'pointerenter', () => Submenu.openSubmenu(this)
          )
          button.parentElement.addEventListener(
            'pointerleave', () => Submenu.hideSubmenu(this)
          )
          button.addEventListener(
            'focus', () => Submenu.openSubmenu(this)
          )
          button.nextElementSibling.addEventListener(
            'focusout', () => Submenu.hideSubmenu(this)
          )

          Submenu.hideSubmenu(this)
        }
        break
      default:
        for (let button of this.buttonElements) {
          button.addEventListener(
            'click', () => Submenu.toggleSubmenu(this)
          )

          Submenu.hideSubmenu(this)
        }
        break
    }
  }

  public menuElements: NodeListOf<HTMLElement>
  public buttonElements: NodeListOf<HTMLElement>
  public openEvent: SubmenuOpenEvents
}
