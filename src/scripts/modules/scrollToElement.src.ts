import { elementIsExistWithLog, elementsIsExist } from "./general.js"

interface SpoilerMenuArgs {
	/** 
		Selector of buttons for scrolling by click.
		For correct work, you need to add the attribute `data-scroll-to=".selectorOfElem"`
	*/
	scrollButtonsSelector: string
	/** 
		Selector of an element with position: fixed or sticky. Not required.
		If you use a fixed element, enter, so that its height is taken into account when scrolling.
	*/
	fixedElementSelector?: string
	/**
		If you want to scroll to the block when you go to the page, set this parameter to true and specify `href='page.html?b=selectorOfBlock'` in the attribute.
	 */
	scrollByAdressURL?: boolean
}

export default class ScrollController {
	private static fixedElementHeight = 0;

	constructor(arg: SpoilerMenuArgs) {
		if (!elementIsExistWithLog('ScrollController', arg.scrollButtonsSelector))
			return

		let scrollButtons = document.querySelectorAll<HTMLElement>(arg.scrollButtonsSelector)

		for (let scrollButton of scrollButtons) {
			scrollButton.addEventListener('click', () =>
				ScrollController.scrollToElement(scrollButton.dataset.scrollTo)
			)
		}

		if (elementsIsExist(arg.fixedElementSelector)) {
			let heightHeight = document.querySelector(arg.fixedElementSelector).clientHeight
			ScrollController.fixedElementHeight = heightHeight
		}
		if (arg.scrollByAdressURL) {
			window.addEventListener('load', this.scrollToElementByAdress)
		}
	}


	private static scrollToElement(scrollTo: string) {
		let scrollElement = document.querySelector(scrollTo)

		if (scrollElement == undefined) {
			console.log('[ScrollController] Something wrong with scrollElement!')
			return
		}

		let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top

		window.scrollTo({
			top: scrolltop - ScrollController.fixedElementHeight,
			behavior: "smooth"
		})
	}

	private scrollToElementByAdress() {
		const urlParams = new URLSearchParams(window.location.search)
		const selector = urlParams.get('b')

		ScrollController.scrollToElement(selector)

		// deleting the get block in URL
		const url = new URL(window.location.href)
		const searchParams = url.searchParams
		searchParams.delete("b")
		window.history.pushState({}, '', url.toString())
	}
}