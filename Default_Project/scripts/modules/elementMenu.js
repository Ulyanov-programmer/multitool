import { isNullOrWhiteSpaces } from "./general.js";
export default class ElementModal {
    constructor(contentElementsSelector, modalElementSelector, animationDuration) {
        if (isNullOrWhiteSpaces(contentElementsSelector, modalElementSelector) || animationDuration < 0) {
            throw '[ELEMENT-MODAL] Incorrect arguments!';
        }
        this.contentElements = document.querySelectorAll(contentElementsSelector);
        this.modalElement = document.querySelector(modalElementSelector);
        for (const contentEl of this.contentElements) {
            contentEl.addEventListener('mouseenter', () => {
                this.appendModalMenu(contentEl, this.modalElement);
            });
            contentEl.addEventListener('mouseleave', () => {
                this.removeModalMenu(contentEl, animationDuration);
            });
        }
    }
    appendModalMenu(contentElement, modalElement) {
        let modalElementClone = modalElement.cloneNode(true);
        contentElement.append(modalElementClone);
        setTimeout(() => {
            modalElementClone.classList.remove('_non-active');
        }, 30);
    }
    removeModalMenu(contentElement, animationDuration) {
        // Try to get modal block.
        let modalMenu = contentElement.lastElementChild;
        if (modalMenu) {
            modalMenu.classList.add('_non-active');
            setTimeout(() => {
                modalMenu.remove();
            }, animationDuration + 100);
        }
    }
}
