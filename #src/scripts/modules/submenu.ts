import { isNullOrWhiteSpaces } from "./general.js";
export enum SubmenuOpenIvents {
	Click,
	Hover,
};

export default class Submenu {
	private static submenuElements: SubmenuElementGroup[] = new Array()
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
	constructor({ menuActiveClass, buttonActiveClass, disableOnEsc = true }, ...submenuElements: SubmenuElementGroup[]) {
		if (isNullOrWhiteSpaces(menuActiveClass, buttonActiveClass)) {
			throw new Error('Your input selectors is null or white spaces!');
		}

		Submenu.buttonActiveClass = buttonActiveClass;
		Submenu.menuActiveClass = menuActiveClass;
		Submenu.submenuElements.push(...submenuElements)

		if (disableOnEsc) {
			document.addEventListener('keydown', (key) => {
				if (key.code === 'Escape') {
					Submenu.hideAllClickSubmenu();
				}
			});
		}
	}


	public static showOrHideSubmenu(currentSubmenuGroup: SubmenuElementGroup, activeElement: HTMLElement) {
		for (let i = 0; i < currentSubmenuGroup.buttonElements.length; i++) {

			if (currentSubmenuGroup.buttonElements[i] == activeElement) {
				currentSubmenuGroup.buttonElements[i].classList.toggle(Submenu.buttonActiveClass);
				currentSubmenuGroup.menuElements[i].classList.toggle(Submenu.menuActiveClass);
			} else {
				currentSubmenuGroup.buttonElements[i].classList.remove(Submenu.buttonActiveClass);
				currentSubmenuGroup.menuElements[i].classList.remove(Submenu.menuActiveClass);
			}
		}
	}

	private static hideAllClickSubmenu() {
		for (let submenuGroup of Submenu.submenuElements) {

			if (submenuGroup.openIvent == SubmenuOpenIvents.Click) {

				for (let i = 0; i < submenuGroup.buttonElements.length; i++) {
					submenuGroup.buttonElements[i].classList.remove(Submenu.buttonActiveClass);
					submenuGroup.menuElements[i].classList.remove(Submenu.menuActiveClass);
				}
			}
		}
	}
}

export class SubmenuElementGroup {
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
	constructor({ openIvent, buttonSelector, menuSelector }) {
		if (isNullOrWhiteSpaces(buttonSelector, menuSelector)) {
			throw '[SUBMENU GROUP ELS] Some argument in a SubmenuElement is null or white spaces.'
		}

		this.menuElements = document.querySelectorAll(menuSelector)
		this.buttonElements = document.querySelectorAll(buttonSelector)
		this.openIvent = openIvent

		if (this.openIvent == SubmenuOpenIvents.Click) {
			for (let i = 0; i < this.buttonElements.length; i++) {
				this.buttonElements[i].addEventListener('click', () => {
					Submenu.showOrHideSubmenu(this, this.buttonElements[i])
				});
			}
		}
		else if (this.openIvent == SubmenuOpenIvents.Hover) {
			for (let i = 0; i < this.buttonElements.length; i++) {
				this.buttonElements[i].addEventListener('mouseover', () => {
					Submenu.showOrHideSubmenu(this, this.buttonElements[i])
				});
				this.buttonElements[i].addEventListener('mouseout', () => {
					Submenu.showOrHideSubmenu(this, this.buttonElements[i])
				});
			}
		}
	}
	public menuElements: NodeListOf<HTMLElement>
	public buttonElements: NodeListOf<HTMLElement>
	public openIvent: SubmenuOpenIvents
}
