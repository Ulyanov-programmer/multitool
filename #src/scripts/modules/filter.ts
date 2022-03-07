import { isNullOrWhiteSpaces } from "./general.js";

export default class Filter {
	private filterButtons: NodeListOf<HTMLElement>
	private filterContentElements: NodeListOf<HTMLElement>

	/**
	 * Provides functionality for filtering content on a page.
	 * @remarks Content filtering occurs by hiding elements on the page.
	 * 
	 * @param filtButtonsSelector
	 * Selector for the buttons, by clicking on which the filtering occurs.
	 * For correct operation, you need to add the attribute to the element [data-filt-content]
	 * @param filtElementsSelector
	 * Selector for content to be filtered.
	 * For correct operation, you need to add the attribute to the element [data-content-type]
	 * @throws Some selector is null or white spaces - 
	 * This error will be printed to the console if some input argument are null or white spaces.
	 */
	constructor(filtButtonsSelector: string, filtElementsSelector: string) {
		if (isNullOrWhiteSpaces(filtButtonsSelector, filtElementsSelector)) {
			throw '[FILTER] Some argument is null or white spaces!'
		}

		this.filterButtons = document.querySelectorAll(filtButtonsSelector);
		this.filterContentElements = document.querySelectorAll(filtElementsSelector);

		for (const filtButton of this.filterButtons) {
			filtButton.addEventListener('click', () => {
				this.filtContentByType(filtButton, this.filterContentElements)
			});
		}
	}


	private filtContentByType(filterButton: HTMLElement, filterContentElements: NodeListOf<HTMLElement>) {
		let typeOfContent = filterButton.dataset.filtContent;

		for (const filtElement of filterContentElements) {
			if (typeOfContent == 'all' || filtElement.dataset.contentType.includes(typeOfContent)) {
				filtElement.style.display = '';
			} else {
				filtElement.style.display = 'none';
			}
		}
		for (const btn of this.filterButtons) {
			btn == filterButton ? btn.classList.add('active') : btn.classList.remove('active')
		}
	}
}