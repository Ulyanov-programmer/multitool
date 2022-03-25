import { isNullOrWhiteSpaces } from "./general.js";

export default class SidebarMenu {
	private sidebars: NodeListOf<HTMLElement>;
	private sidebarButtons: NodeListOf<HTMLElement>;
	public static sidebarsActiveClass: string = 'active'
	public static buttonsActiveClass: string = 'active'

	/**
	 * Provides functionality for sidebar.
	 * 
	 * @param selectorOfSidebars
	 * Selector of sidebars. Should contain id of this sidebar.
	 * @param selectorOfSidebarButtons
	 * Selector for buttons that open some sidebar. Should contains data-open-sidebar='sidebarSelector'.
	 * 
	 * @throws Some selector is null or white spaces - 
	 * This error will be printed to the console if some input argument are null or white spaces.
	 */
	constructor({selectorOfSidebars, selectorOfSidebarButtons}) {
		if (isNullOrWhiteSpaces(selectorOfSidebars, selectorOfSidebarButtons)) {
			throw '[SIDEBAR] Some selector is null or white spaces!'
		}

		this.sidebars = document.querySelectorAll(selectorOfSidebars);
		this.sidebarButtons = document.querySelectorAll(selectorOfSidebarButtons);

		for (const sidebarBtn of this.sidebarButtons) {
			sidebarBtn.addEventListener('click', () => {
				this.toggleSidebar(sidebarBtn)
			})
		}
	}

	private toggleSidebar(eventButton: HTMLElement) {
		let parentSidebar = document.getElementById(eventButton.dataset.openSidebar);

		eventButton.classList.toggle(SidebarMenu.buttonsActiveClass);
		parentSidebar.classList.toggle(SidebarMenu.sidebarsActiveClass);
	}
}

