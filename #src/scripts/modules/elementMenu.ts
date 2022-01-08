import { isNullOrWhiteSpaces } from "./general.js";

export default class ElementModal {
  private contentElements: NodeListOf<HTMLElement>
  private modalElement: HTMLElement

  constructor(contentElementsSelector: string, modalElementSelector: string, animationDuration: number) {
    if (isNullOrWhiteSpaces(contentElementsSelector, modalElementSelector) || animationDuration < 0) {
      throw '[ELEMENT-MODAL] Incorrect arguments!'
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


  appendModalMenu(contentElement: HTMLElement, modalElement: HTMLElement) {
    let modalElementClone = modalElement.cloneNode(true) as HTMLElement;

    contentElement.append(modalElementClone);
    setTimeout(() => {
      modalElementClone.classList.remove('_non-active');
    }, 30)
  }
  removeModalMenu(contentElement: HTMLElement, animationDuration: number) {
    // Try to get modal block.
    let modalMenu = contentElement.lastElementChild;

    if (modalMenu) {
      modalMenu.classList.add('_non-active')
      setTimeout(() => {
        modalMenu.remove();
      }, animationDuration + 100)
    }
  }
}