import { returnScrollbarWidth, isNullOrWhiteSpaces } from "./general.js";

interface FsNavmenuArgs {
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

export default class FsNavmenu {
	private static burger: HTMLElement
	private static fsNavmenu: HTMLElement
	private static buttons: NodeListOf<HTMLElement>
	private static header: HTMLElement = document.querySelector('header')
	private static autoPadding: boolean = true

	public static burgerActiveClass: string = 'active'
	public static fsNavmenuActiveClass: string = 'active'

	constructor(args: FsNavmenuArgs) {
		if (isNullOrWhiteSpaces(args.burgerSelector, args.fsNavmenuSelector, args.buttonsSelector))
			throw '[FSNAVMENU] Some selector is null or white spaces.'

		FsNavmenu.burger = document.querySelector(args.burgerSelector);
		FsNavmenu.fsNavmenu = document.querySelector(args.fsNavmenuSelector);
		FsNavmenu.buttons = document.querySelectorAll(args.buttonsSelector);
		FsNavmenu.autoPadding = args.autoPadding;

		if (args.autoPadding)
			FsNavmenu.fsNavmenu.style.paddingTop = `${FsNavmenu.header.clientHeight}px`

		FsNavmenu.burger.addEventListener('click', this.toggleNavmenu);

		for (let button of FsNavmenu.buttons) {
			button.addEventListener('click', this.hideNavmenu);
		}
	}


	private toggleNavmenu() {
		let scrollbarWidth = returnScrollbarWidth();

		if (FsNavmenu.fsNavmenu == undefined)
			throw new Error('[FSNAVMENU] Something wrong with fsNavmenu!');

		if (FsNavmenu.autoPadding)
			FsNavmenu.fsNavmenu.style.paddingTop = `${FsNavmenu.header.clientHeight}px`;

		FsNavmenu.burger.classList.toggle(FsNavmenu.burgerActiveClass);

		if (document.body.style.overflow != 'hidden') {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		FsNavmenu.header.style.paddingRight = `${scrollbarWidth}px`;

		FsNavmenu.fsNavmenu.classList.toggle(FsNavmenu.fsNavmenuActiveClass);
	}

	private hideNavmenu() {
		let scrollbarWidth = returnScrollbarWidth();

		FsNavmenu.burger.classList.remove(FsNavmenu.burgerActiveClass);

		if (document.body.style.overflow.includes('hidden')) {
			document.body.style.overflow = ''
		} else {
			document.body.style.overflow = 'hidden'
		}
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		FsNavmenu.fsNavmenu.classList.remove(FsNavmenu.fsNavmenuActiveClass);
	}
}
