import { isNullOrWhiteSpaces } from "./general.js";

interface SpoilerMenuArgs {
	/** 
	 	Selector of buttons for scrolling by click.
		For correct work, you need to add the attribute `data-scroll-to=".selectorOfElem"`
	*/
	scrollButtonsSelector: string
	/** 
		Selector of header with position: fixed. Not required.
		If you use a fixed header, enter, so that its height is taken into account when scrolling.
	*/
	fixedHeaderSelector?: string
}

export default class ScrollController {
	private static fixedHeaderHeight = 0;

	constructor(arg: SpoilerMenuArgs) {
		if (isNullOrWhiteSpaces(arg.scrollButtonsSelector))
			throw new Error('[SCROLL-ELEMENTS] Incorrect scroll-buttons selector!');

		let scrollButtons = document.querySelectorAll<HTMLElement>(arg.scrollButtonsSelector);

		for (let scrollButton of scrollButtons) {
			scrollButton.addEventListener('click', () =>
				this.scrollToElement(scrollButton)
			)
		}
		if (isNullOrWhiteSpaces(arg.fixedHeaderSelector) == false) {
			let heightHeight = document.querySelector(arg.fixedHeaderSelector).clientHeight;
			ScrollController.fixedHeaderHeight = heightHeight;
		}
	}


	private scrollToElement(scrollButton: HTMLElement) {
		let scrollElement = document.querySelector(scrollButton.dataset.scrollTo);

		if (scrollElement == undefined)
			throw new Error('[SCROLL-ELEMENTS] Something wrong with scrollElement!')

		let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top;

		window.scrollTo({
			top: scrolltop - ScrollController.fixedHeaderHeight,
			behavior: "smooth"
		});
	}
}