import { returnScrollbarWidth, elementIsExistWithLog } from "./general.js";

interface BurgerMenuArgs {
	/** Selctor buttons for burger menu. */
	burgerSelector: string
	/** A fullscreen-menu selector that will be shown when you click on the burger. */
	fsNavmenuSelector: string
	/** 
		Selector of buttons that are contained in the menu. It is necessary to close the menu when pressing the buttons.
	*/
	buttonsSelector: string
	/** If the value is true, set the automatic padding to the size of a header. */
	autoPadding?: boolean
}

export default class BurgerMenu {
	private static burger: HTMLElement
	private static menu: HTMLElement
	private static buttons: NodeListOf<HTMLElement>
	private static header: HTMLElement = document.querySelector('header')
	private static autoPadding: boolean = true

	public static burgerActiveClass: string = 'active'
	public static fsNavmenuActiveClass: string = 'active'

	constructor(args: BurgerMenuArgs) {
		if (!elementIsExistWithLog('BurgerMenu',
			args.burgerSelector, args.fsNavmenuSelector, args.buttonsSelector)) {
			return
		}

		BurgerMenu.burger = document.querySelector(args.burgerSelector)
		BurgerMenu.menu = document.querySelector(args.fsNavmenuSelector)
		BurgerMenu.buttons = document.querySelectorAll(args.buttonsSelector)
		BurgerMenu.autoPadding = args.autoPadding

		if (args.autoPadding)
			BurgerMenu.menu.style.paddingTop = `${BurgerMenu.header.clientHeight}px`

		BurgerMenu.burger.addEventListener('click', this.toggleNavmenu);

		for (let button of BurgerMenu.buttons) {
			button.addEventListener('click', this.hideNavmenu);
		}
	}


	private toggleNavmenu() {
		let scrollbarWidth = returnScrollbarWidth();

		if (BurgerMenu.menu == undefined)
			throw new Error('[FSNAVMENU] Something wrong with fsNavmenu!');

		if (BurgerMenu.autoPadding)
			BurgerMenu.menu.style.paddingTop = `${BurgerMenu.header.clientHeight}px`;

		BurgerMenu.burger.classList.toggle(BurgerMenu.burgerActiveClass);

		if (document.body.style.overflow != 'hidden') {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		BurgerMenu.header.style.paddingRight = `${scrollbarWidth}px`;

		BurgerMenu.menu.classList.toggle(BurgerMenu.fsNavmenuActiveClass);
	}

	private hideNavmenu() {
		let scrollbarWidth = returnScrollbarWidth();

		BurgerMenu.burger.classList.remove(BurgerMenu.burgerActiveClass);

		if (document.body.style.overflow.includes('hidden')) {
			document.body.style.overflow = ''
		} else {
			document.body.style.overflow = 'hidden'
		}
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		BurgerMenu.menu.classList.remove(BurgerMenu.fsNavmenuActiveClass);
	}
}
