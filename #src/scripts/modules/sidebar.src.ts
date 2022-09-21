import { elementIsExistWithLog } from "./general.js"

interface SidebarMenuArgs {
	/** Selector of sidebars. Should contain id of this sidebar. */
	selectorOfSidebars: string
	/** 
		Selector for buttons that open some sidebar. 
		Should contains `data-toggle-sidebar='sidebarId'`.
	*/
	selectorOfSidebarButtons: string
	swipeAreaSelector?: string
	sidebarsActiveClass?: string
	buttonsActiveClass?: string
}

export default class SidebarMenu {
	private sidebarButtons: NodeListOf<HTMLElement>
	private static swipeArea: HTMLElement
	public static sidebarsActiveClass: string
	public static buttonsActiveClass: string = 'active'

	constructor(arg: SidebarMenuArgs) {
		if (!elementIsExistWithLog('SidebarMenu',
			arg.selectorOfSidebars, arg.selectorOfSidebarButtons)) {
			return
		}

		this.sidebarButtons = document.querySelectorAll(arg.selectorOfSidebarButtons)

		SidebarMenu.swipeArea = document.querySelector(arg.swipeAreaSelector) as HTMLElement
		SidebarMenu.buttonsActiveClass = arg.buttonsActiveClass ? arg.buttonsActiveClass : 'active'
		SidebarMenu.sidebarsActiveClass = arg.sidebarsActiveClass ? arg.sidebarsActiveClass : 'active'

		for (let sidebarBtn of this.sidebarButtons) {
			sidebarBtn.addEventListener('click', () =>
				this.toggleSidebar(sidebarBtn)
			)
		}
	}

	private toggleSidebar(eventButton: HTMLElement) {
		let sidebar = document.getElementById(eventButton.dataset.toggleSidebar) as HTMLElement

		eventButton.classList.toggle(SidebarMenu.buttonsActiveClass)
		sidebar.classList.toggle(SidebarMenu.sidebarsActiveClass)
		SidebarMenu.swipeArea.classList.toggle('active')
	}
}

