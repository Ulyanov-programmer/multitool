import { isNullOrWhiteSpaces } from "./general.js";
export default class Submenu {
    /**
     * Provides functionality for buttons with submenu.
     * @remarks Switching occurs by clicking.
     *
     * @param submenuElements
     * Instances of `SubmenuElement` in an arbitrary number.
     */
    constructor(menuActiveClass, buttonActiveClass, ...submenuElements) {
        if (isNullOrWhiteSpaces(menuActiveClass, buttonActiveClass)) {
            throw new Error('Your input classes is null or white spaces!');
        }
        Submenu.buttonActiveClass = buttonActiveClass;
        Submenu.menuActiveClass = menuActiveClass;
        Submenu.submenuElements.push(...submenuElements);
        for (let submenuElement of submenuElements) {
            submenuElement.buttonElement.addEventListener('click', () => {
                Submenu.showOrHideSubmenu(submenuElement);
            });
        }
    }
    static showOrHideSubmenu(submenuElement) {
        for (let i = 0; i < Submenu.submenuElements.length; i++) {
            if (Submenu.submenuElements[i].buttonElement == submenuElement.buttonElement) {
                submenuElement.buttonElement.classList.toggle(Submenu.buttonActiveClass);
                submenuElement.menuElement.classList.toggle(Submenu.menuActiveClass);
            }
            else {
                Submenu.submenuElements[i].buttonElement.classList.remove(Submenu.buttonActiveClass);
                Submenu.submenuElements[i].menuElement.classList.remove(Submenu.menuActiveClass);
            }
        }
    }
}
Submenu.submenuElements = new Array();
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
    constructor(buttonSelector, menuSelector) {
        if (isNullOrWhiteSpaces(buttonSelector, menuSelector)) {
            throw '[SUBMENU] Some argument in a SubmenuElement is uncorrect.';
        }
        this.menuElement = document.querySelector(menuSelector);
        this.buttonElement = document.querySelector(buttonSelector);
    }
}
