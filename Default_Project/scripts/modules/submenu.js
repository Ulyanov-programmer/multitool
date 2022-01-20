import { isNullOrWhiteSpaces } from "./general.js";
export default class Submenu {
    /**
     * Provides functionality for buttons with submenu.
     * @remarks Switching occurs by clicking.
     *
     * @param submenuElements
     * Instances of `SubmenuElement` in an arbitrary number.
     */
    constructor(...submenuElements) {
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
                submenuElement.buttonElement.classList.toggle('active');
                submenuElement.menuElement.classList.toggle('show');
            }
            else {
                Submenu.submenuElements[i].buttonElement.classList.remove('show');
                Submenu.submenuElements[i].menuElement.classList.remove('show');
            }
        }
    }
}
Submenu.submenuElements = new Array();
/**
 *
 */
export class SubmenuElement {
    constructor(buttonSelector, menuSelector) {
        if (isNullOrWhiteSpaces(buttonSelector, menuSelector)) {
            throw '[SUBMENU] Some argument in a SubmenuElement is uncorrect.';
        }
        this.menuElement = document.querySelector(menuSelector);
        this.buttonElement = document.querySelector(buttonSelector);
    }
}
