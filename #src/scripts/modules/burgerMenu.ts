import { returnScrollbarWidth, elementIsExistWithLog } from "./general.js"

interface BurgerMenuArgs {
	/** Selctor buttons for burger menu. */
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
	private static header = document.querySelector('header') as HTMLElement
	private static autoPaddingOptions: autoPaddingOptions
	private static closingByClickOnElement: boolean = true

	public static burgerActiveClass: string = 'active'
	public static menuActiveClass: string = 'active'

	constructor(args: BurgerMenuArgs) {
		if (!elementIsExistWithLog('BurgerMenu',
			args.burgerSelector, args.burgerMenuSelector, args.buttonsSelector)) {
			return
		}
		BurgerMenu.burger = document.querySelector(args.burgerSelector) as HTMLElement
		BurgerMenu.menu = document.querySelector(args.burgerMenuSelector) as HTMLElement
		BurgerMenu.autoPaddingOptions = args.autoPadding
		BurgerMenu.closingByClickOnElement = args.closingByClickOnElement


		if (args.burgerActiveClass)
			BurgerMenu.burgerActiveClass = args.burgerActiveClass
		if (args.menuActiveClass)
			BurgerMenu.menuActiveClass = args.menuActiveClass

		if (args.autoPadding)
			BurgerMenu.menu.style.paddingTop = `${BurgerMenu.autoPaddingOptions.elementHeight}px`

		BurgerMenu.burger.addEventListener('click', this.toggleNavmenu)

		if (BurgerMenu.closingByClickOnElement) {
			BurgerMenu.buttons = document.querySelectorAll(args.buttonsSelector)
			for (let button of BurgerMenu.buttons) {
				button.addEventListener('click', this.hideNavmenu)
			}
		}
	}


	private toggleNavmenu() {
		let scrollbarWidth = returnScrollbarWidth()

		if (BurgerMenu.autoPaddingOptions)
			BurgerMenu.menu.style.paddingTop = `${BurgerMenu.autoPaddingOptions.elementHeight}px`

		BurgerMenu.burger.classList.toggle(BurgerMenu.burgerActiveClass)

		if (document.body.style.overflow != 'hidden') {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		document.body.style.paddingRight = `${scrollbarWidth}px`

		BurgerMenu.header.style.paddingRight = `${scrollbarWidth}px`

		BurgerMenu.menu.classList.toggle(BurgerMenu.menuActiveClass)
	}

	private hideNavmenu() {
		let scrollbarWidth = returnScrollbarWidth()

		BurgerMenu.burger.classList.remove(BurgerMenu.burgerActiveClass)

		if (document.body.style.overflow == 'hidden') {
			document.body.style.overflow = ''
		} else {
			document.body.style.overflow = 'hidden'
		}
		document.body.style.paddingRight = `${scrollbarWidth}px`

		BurgerMenu.menu.classList.remove(BurgerMenu.menuActiveClass)
	}
}
export class autoPaddingOptions {
	public elementHeight: number

	constructor(selectorOfElement: string) {
		if (elementIsExistWithLog('autoPaddingOptions', selectorOfElement)) {
			let element = document.querySelector(selectorOfElement)
			this.elementHeight = element.clientHeight
		}
	}
}
