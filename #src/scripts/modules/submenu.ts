import { isNullOrWhiteSpaces } from "./general.js";

export default class Submenu {
	private static submenuElements: SubmenuElement[] = new Array()
	public static menuActiveClass: string
	public static buttonActiveClass: string

	/**
	 * Provides functionality for buttons with submenu.
	 * @remarks Switching occurs by clicking.
	 * 
	 * @param submenuElements
	 * Instances of `SubmenuElement` in an arbitrary number.
	 * @param menuActiveClass
	 * The class for an active spoiler menu.
	 * @param buttonActiveClass
	 * The class for an active spoiler button.
	 */
	constructor({menuActiveClass, buttonActiveClass}, ...submenuElements: SubmenuElement[]) {
		if (isNullOrWhiteSpaces(menuActiveClass, buttonActiveClass)) {
			throw new Error('Your input classes is null or white spaces!');
		}

		Submenu.buttonActiveClass = buttonActiveClass;
		Submenu.menuActiveClass = menuActiveClass;
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
				submenuElement.buttonElement.classList.toggle(Submenu.buttonActiveClass);
				submenuElement.menuElement.classList.toggle(Submenu.menuActiveClass);
			} else {
				Submenu.submenuElements[i].buttonElement.classList.remove(Submenu.buttonActiveClass);
				Submenu.submenuElements[i].menuElement.classList.remove(Submenu.menuActiveClass);
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
	constructor({buttonSelector, menuSelector}) {
		if (isNullOrWhiteSpaces(buttonSelector, menuSelector)) {
			throw '[SUBMENU] Some argument in a SubmenuElement is uncorrect.'
		}

		this.menuElement = document.querySelector(menuSelector);
		this.buttonElement = document.querySelector(buttonSelector)
	}
	public menuElement: HTMLElement
	public buttonElement: HTMLElement
}
