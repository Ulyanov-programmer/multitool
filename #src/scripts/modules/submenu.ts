import { isNullOrWhiteSpaces } from "./general.js";

export default class Submenu {
  private static submenuElements: SubmenuElement[] = new Array()

  /**
   * Provides functionality for buttons with submenu.
   * @remarks Switching occurs by clicking.
   * 
   * @param submenuElements
   * Instances of `SubmenuElement` in an arbitrary number.
   */
  constructor(...submenuElements: SubmenuElement[]) {
    Submenu.submenuElements.push(...submenuElements)

    for (let submenuElement of submenuElements) {
      submenuElement.buttonElement.addEventListener('click', () => {
        Submenu.showOrHideSubmenu(submenuElement)
      });
    }
  }


  private static showOrHideSubmenu(submenuElement: SubmenuElement) {

    for (let i = 0; i < Submenu.submenuElements.length; i++) {

      if (Submenu.submenuElements[i].buttonElement == submenuElement.buttonElement) {
        submenuElement.buttonElement.classList.toggle('active');
        submenuElement.menuElement.classList.toggle('show');
      } else {
        Submenu.submenuElements[i].buttonElement.classList.remove('show');
        Submenu.submenuElements[i].menuElement.classList.remove('show');
      }
    }
  }
}

export class SubmenuElement {
  /**
   * Required for submenu scripts to work.
   * 
   * @param buttonSelector
   * Selector of the button that will open the submenu.
   * 
   * @param menuSelector
   * Selector of the menu that will open when the button is clicked.
   * 
   * @throws Some argument in a SubmenuElement is uncorrect -
   * Throws if some argument is null of white spaces.
   */
  constructor(buttonSelector: string, menuSelector: string) {
    if (isNullOrWhiteSpaces(buttonSelector, menuSelector)) {
      throw '[SUBMENU] Some argument in a SubmenuElement is uncorrect.'
    }

    this.menuElement = document.querySelector(menuSelector);
    this.buttonElement = document.querySelector(buttonSelector)
  }
  public menuElement: HTMLElement
  public buttonElement: HTMLElement
}
