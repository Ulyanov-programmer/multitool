var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isNullOrWhiteSpaces } from "./general.js";
export default class Accordion {
    /**
     * Provides functionality for an accordion.
     *
     * @param btnsSelector
     * Selector for buttons that open some accordion content element.
     * Must contain data-toggle-elem-number="numberOfContentElement"
     * (note, the count starts from zero)
     * @param contentBlockSelector
     * Selector of a block that contains the content-elements of the accordion.
     * @param animationDuration
     * If you use transition, it set animation duration in ms. Can be 0.
     * @param addActiveForFirstElements
     * Sets the first element of buttons and content-block the class active. The default is true.
     *
     * @example
     * Example of accordion:
     * ```html
     * <div class="accordion__container">
     *   <button class="accordion__btn"
     *    data-toggle-elem-number="0">1</button>
     *   <button class="accordion__btn"
     *    data-toggle-elem-number="2">2</button>
     *   <div class="accordion__items">
     *     <div class="accordion__item">1</div>
     *     <div class="accordion__item">2</div>
     *   </div>
     * </div>
     * ```
     * @throws Some selector is null or white spaces -
     * This error will be printed to the console if some input argument are null or white spaces.
     * @throws The count of buttons != the count content-elements.
     */
    constructor(btnsSelector, contentBlockSelector, animationDuration, addActiveForFirstElements = true) {
        this.isToggling = false;
        if (isNullOrWhiteSpaces(btnsSelector, contentBlockSelector) || animationDuration < 0) {
            throw '[ACCORDION] Incorrect arguments!';
        }
        this.accordButtons = document.querySelectorAll(btnsSelector);
        this.accordContentElements = Array.from(document.querySelectorAll(contentBlockSelector).values());
        this.animationDuration = animationDuration + 100;
        if (this.accordButtons.length != this.accordContentElements.length) {
            throw '[ACCORDION] The count of buttons and content-elements must be more than zero.';
        }
        if (addActiveForFirstElements) {
            this.accordButtons[0].classList.add('active');
            this.accordContentElements[0].classList.add('active');
        }
        for (let accordButton of this.accordButtons) {
            accordButton.addEventListener('click', () => {
                this.toggleActiveElements(accordButton);
            });
        }
        for (const accordContentElem of this.accordContentElements) {
            if (accordContentElem.classList.contains('active') == false) {
                accordContentElem.setAttribute('hidden', '');
            }
        }
    }
    toggleActiveElements(activeAccordButton) {
        if (activeAccordButton.classList.contains('active') || this.isToggling) {
            return;
        }
        else {
            this.isToggling = true;
        }
        for (let accordBtn of this.accordButtons) {
            accordBtn.classList.remove('active');
        }
        activeAccordButton.classList.add('active');
        let activeContentElement;
        activeContentElement = this.accordContentElements[activeAccordButton.dataset.toggleElemNumber];
        for (const contentElement of this.accordContentElements) {
            contentElement.classList.remove('active');
            setTimeout(() => {
                if (contentElement != activeContentElement) {
                    contentElement.setAttribute('hidden', '');
                }
                else {
                    activeContentElement.removeAttribute('hidden');
                }
                setTimeout(() => {
                    activeContentElement.classList.add('active');
                }, 10);
                this.togglingToFalseWithAwait(this);
            }, this.animationDuration);
        }
    }
    ;
    togglingToFalseWithAwait(thisAccordion) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(r => setTimeout(() => {
                thisAccordion.isToggling = false;
            }, thisAccordion.animationDuration));
        });
    }
}
