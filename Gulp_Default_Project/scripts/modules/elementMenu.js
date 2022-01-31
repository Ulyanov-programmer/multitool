var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isNullOrWhiteSpaces, sleep } from "./general.js";
export default class ElementModal {
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
    constructor(contentElementsSelector, modalElementSelector, animationDuration) {
        if (isNullOrWhiteSpaces(contentElementsSelector, modalElementSelector) || animationDuration < 0) {
            throw '[ELEMENT-MODAL] Some selector is null or white spaces!';
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
        return __awaiter(this, void 0, void 0, function* () {
            let modalElementClone = modalElement.cloneNode(true);
            contentElement.append(modalElementClone);
            yield sleep(30);
            modalElementClone.classList.remove('_non-active');
        });
    }
    removeModalMenu(contentElement, animationDuration) {
        return __awaiter(this, void 0, void 0, function* () {
            // Try to get modal block.
            let modalMenu = contentElement.lastElementChild;
            if (modalMenu) {
                modalMenu.classList.add('_non-active');
                yield sleep(animationDuration + 100);
                modalMenu.remove();
            }
        });
    }
}
