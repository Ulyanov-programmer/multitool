import { isNullOrWhiteSpaces, sleep } from "./general.js";

interface ElementModalArgs {
	/** Elements over which the modal should be. */
	contentElementsSelector: string
	/** Selector for the modal that will appear above the content elements. */
	modalElementSelector: string
	/** Animation duration in ms, unless you want the modal to open and close too quickly. */
	animationDuration: number
}

export default class ElementModal {
	private contentElements: NodeListOf<HTMLElement>
	private modalElement: HTMLElement

	constructor(arg: ElementModalArgs) {
		if (isNullOrWhiteSpaces(arg.contentElementsSelector, arg.modalElementSelector)
			|| arg.animationDuration < 0) {
			throw '[ELEMENT-MODAL] Some selector is null or white spaces!'
		}

		this.contentElements = document.querySelectorAll(arg.contentElementsSelector);
		this.modalElement = document.querySelector(arg.modalElementSelector);

		for (let contentEl of this.contentElements) {
			contentEl.addEventListener('mouseenter', () =>
				this.appendModalMenu(contentEl, this.modalElement)
			);
			contentEl.addEventListener('mouseleave', () =>
				this.removeModalMenu(contentEl, arg.animationDuration)
			);

			if (contentEl.tabIndex != -1) {
				contentEl.addEventListener('focus', () =>
					this.appendModalMenu(contentEl, this.modalElement)
				);
				contentEl.addEventListener('blur', () =>
					this.removeModalMenu(contentEl, arg.animationDuration)
				);
			}
		}
	}


	private async appendModalMenu(contentElement: HTMLElement, modalElement: HTMLElement) {
		let modalElementClone = modalElement.cloneNode(true) as HTMLElement;

		contentElement.append(modalElementClone);
		await sleep(30)
		modalElementClone.classList.remove('_non-active');
	}
	private async removeModalMenu(contentElement: HTMLElement, animationDuration: number) {
		// Try to get modal block.
		let modalMenu = contentElement.lastElementChild;

		if (modalMenu) {
			modalMenu.classList.add('_non-active')

			await sleep(animationDuration + 100)
			modalMenu.remove();
		}
	}
}