import { isNullOrWhiteSpaces, sleep } from "./general.js";

interface AccordionArgs {
	/**
		Selector for buttons that open some accordion content element.
		Must contain `data-toggle-elem-number="numberOfContentElement"`
		`(note, the count starts from zero)`
	*/
	btnsSelector: string
	/** Selector of blocks that contain some accordion content.	*/
	contentBlocksSelector: string
	/** Sets the first element of buttons and content-block the class active. */
	activeFirstElements: boolean
}

export default class Accordion {
	private buttons: NodeListOf<HTMLElement>
	private contentElements: Element[]
	private animationDuration: number
	private isToggling: boolean = false
	public buttonsActiveClass: string = 'active'
	public contentActiveClass: string = 'active'

	constructor(arg: AccordionArgs) {
		if (isNullOrWhiteSpaces(arg.btnsSelector, arg.contentBlocksSelector))
			throw '[ACCORDION] Incorrect arguments!'

		this.buttons = document.querySelectorAll(arg.btnsSelector);
		this.contentElements = Array.from
			(document.querySelectorAll(arg.contentBlocksSelector).values())

		let someAccordContent = document.querySelector(arg.contentBlocksSelector);
		this.animationDuration = parseFloat(getComputedStyle(someAccordContent)
			.getPropertyValue('transition-duration')) * 1000 + 100

		if (this.buttons.length != this.contentElements.length) 
			throw '[ACCORDION] The count of buttons and content-elements is not equal.'

		if (arg.activeFirstElements) {
			this.buttons[0].classList.add('active');
			this.contentElements[0].classList.add('active');
		}

		for (let accordButton of this.buttons) {
			accordButton.addEventListener('click', () => 
				this.toggleActiveElements(accordButton)
			)
		}
		for (let accordContentElem of this.contentElements) {
			if (accordContentElem.classList.contains('active') == false) {
				accordContentElem.setAttribute('hidden', '');
			}
		}
	}


	private toggleActiveElements(activeAccordButton: HTMLElement) {
		if (activeAccordButton.classList.contains('active') || this.isToggling) {
			return
		} else {
			this.isToggling = true;
		}
		for (let accordBtn of this.buttons) {
			accordBtn.classList.remove('active');
		}
		activeAccordButton.classList.add('active');


		let activeContentElement: HTMLElement = this.contentElements[activeAccordButton.dataset.toggleElemNumber];

		for (let contentElement of this.contentElements) {
			contentElement.classList.remove('active');

			setTimeout(async () => {
				if (contentElement != activeContentElement) {
					contentElement.setAttribute('hidden', '');
				} else {
					activeContentElement.removeAttribute('hidden');
				}

				await sleep(10)
				activeContentElement.classList.add('active');
				this.isToggling = false;

			}, this.animationDuration);
		}
	};
}