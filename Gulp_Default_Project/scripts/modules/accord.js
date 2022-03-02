import { isNullOrWhiteSpaces, sleep } from "./general.js";
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
     * @param activeFirstElements
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
     * This error will be printed to the console if some input argument is null or white spaces.
     * @throws The count of buttons != the count content-elements.
     */
    constructor(btnsSelector, contentBlockSelector, animationDuration, activeFirstElements = true) {
        this.isToggling = false;
        this.buttonsActiveClass = 'active';
        this.contentActiveClass = 'active';
        if (isNullOrWhiteSpaces(btnsSelector, contentBlockSelector) || animationDuration < 0) {
            throw '[ACCORDION] Incorrect arguments!';
        }
        this.buttons = document.querySelectorAll(btnsSelector);
        this.contentElements = Array.from(document.querySelectorAll(contentBlockSelector).values());
        this.animationDuration = animationDuration + 100;
        if (this.buttons.length != this.contentElements.length) {
            throw '[ACCORDION] The count of buttons and content-elements is not equal.';
        }
        if (activeFirstElements) {
            this.buttons[0].classList.add('active');
            this.contentElements[0].classList.add('active');
        }
        for (let accordButton of this.buttons) {
            accordButton.addEventListener('click', () => {
                this.toggleActiveElements(accordButton);
            });
        }
        for (const accordContentElem of this.contentElements) {
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
        for (let accordBtn of this.buttons) {
            accordBtn.classList.remove('active');
        }
        activeAccordButton.classList.add('active');
        let activeContentElement = this.contentElements[activeAccordButton.dataset.toggleElemNumber];
        for (const contentElement of this.contentElements) {
            contentElement.classList.remove('active');
            setTimeout(async () => {
                if (contentElement != activeContentElement) {
                    contentElement.setAttribute('hidden', '');
                }
                else {
                    activeContentElement.removeAttribute('hidden');
                }
                await sleep(10);
                activeContentElement.classList.add('active');
                this.isToggling = false;
            }, this.animationDuration);
        }
    }
    ;
}
