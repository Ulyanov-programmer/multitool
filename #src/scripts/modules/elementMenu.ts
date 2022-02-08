import { isNullOrWhiteSpaces, sleep } from "./general.js";

export default class ElementModal {
  private contentElements: NodeListOf<HTMLElement>
  private modalElement: HTMLElement

  /**
   * Provides the ability to use modals over elements.
   * 
   * @param contentElementsSelector
   * Elements over which the modal should be.
   * @param modalElementSelector
   * Selector for the modal that will appear above the content elements.
   * @param animationDuration
   * Animation duration in ms, unless you want the modal to open and close too quickly.
   * 
   * @throws Some selector is null or white spaces - 
   * This error will be printed to the console if some input argument are null or white spaces.
   */
  constructor(contentElementsSelector: string, modalElementSelector: string, animationDuration: number) {
    if (isNullOrWhiteSpaces(contentElementsSelector, modalElementSelector) || animationDuration < 0) {
      throw '[ELEMENT-MODAL] Some selector is null or white spaces!'
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
      
      if (contentEl.tabIndex != -1) {
        contentEl.addEventListener('focus', () => {
          this.appendModalMenu(contentEl, this.modalElement);
        });
        contentEl.addEventListener('blur', () => {
          this.removeModalMenu(contentEl, animationDuration);
        });
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