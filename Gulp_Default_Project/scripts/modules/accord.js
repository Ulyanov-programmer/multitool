import { isNullOrWhiteSpaces, sleep } from "./general.js";
export default class Accordion {
    constructor(arg) {
        this.isToggling = false;
        this.buttonsActiveClass = 'active';
        this.contentActiveClass = 'active';
        if (isNullOrWhiteSpaces(arg.btnsSelector, arg.contentBlocksSelector)
            || arg.animationDuration < 0)
            throw '[ACCORDION] Incorrect arguments!';
        this.buttons = document.querySelectorAll(arg.btnsSelector);
        this.contentElements = Array.from(document.querySelectorAll(arg.contentBlocksSelector).values());
        this.animationDuration = arg.animationDuration + 100;
        if (this.buttons.length != this.contentElements.length)
            throw '[ACCORDION] The count of buttons and content-elements is not equal.';
        if (arg.activeFirstElements) {
            this.buttons[0].classList.add('active');
            this.contentElements[0].classList.add('active');
        }
        for (let accordButton of this.buttons) {
            accordButton.addEventListener('click', () => this.toggleActiveElements(accordButton));
        }
        for (let accordContentElem of this.contentElements) {
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
        for (let contentElement of this.contentElements) {
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
