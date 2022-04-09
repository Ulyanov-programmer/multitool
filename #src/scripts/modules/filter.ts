import { isNullOrWhiteSpaces } from "./general.js";

interface FilterArgs {
	/**
		Selector for the buttons, by clicking on which the filtering occurs.
		For correct operation, you need to add the attribute to the element `data-filt-content`
	*/
	filtButtonsSelector: string
	/** 
		Selector for content to be filtered.
		For correct operation, you need to add the attribute to the element `data-content-type`
	*/
	filtElementsSelector: string
}

export default class Filter {
	private filterButtons: NodeListOf<HTMLElement>
	private filterContentElements: NodeListOf<HTMLElement>

	constructor(arg: FilterArgs) {
		if (isNullOrWhiteSpaces(arg.filtButtonsSelector, arg.filtElementsSelector)) {
			throw '[FILTER] Some argument is null or white spaces!'
		}

		this.filterButtons = document.querySelectorAll(arg.filtButtonsSelector);
		this.filterContentElements = document.querySelectorAll(arg.filtElementsSelector);

		for (let filtButton of this.filterButtons) {
			filtButton.addEventListener('click', () => {
				this.filtContentByType(filtButton, this.filterContentElements)
			});
		}
	}


	private filtContentByType(filterButton: HTMLElement, filterContentElements: NodeListOf<HTMLElement>) {
		let typeOfContent = filterButton.dataset.filtContent;

		for (let filtElement of filterContentElements) {
			if (typeOfContent == 'all' || filtElement.dataset.contentType.includes(typeOfContent)) {
				filtElement.style.display = '';
			} else {
				filtElement.style.display = 'none';
			}
		}
		for (let btn of this.filterButtons) {
			btn == filterButton ? btn.classList.add('active') : btn.classList.remove('active')
		}
	}
}