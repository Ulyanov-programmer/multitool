import { isNullOrWhiteSpaces, sleep } from "./general.js";
export default class Tab {
    constructor(arg) {
        this.isToggling = false;
        this.buttonsActiveClass = 'active';
        this.contentActiveClass = 'active';
        if (isNullOrWhiteSpaces(arg.btnsSelector, arg.contentBlocksSelector))
            throw '[ACCORDION] Incorrect arguments!';
        this.buttons = document.querySelectorAll(arg.btnsSelector);
        this.contentElements = document.querySelectorAll(arg.contentBlocksSelector);
        let someAccordContent = document.querySelector(arg.contentBlocksSelector);
        this.animationDuration = parseFloat(getComputedStyle(someAccordContent)
            .getPropertyValue('transition-duration')) * 1000 + 100;
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
                accordContentElem.style.display = 'none';
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
                    contentElement.style.display = 'none';
                }
                else {
                    contentElement.removeAttribute('hidden');
                    contentElement.style.display = '';
                }
                await sleep(30);
                activeContentElement.classList.add('active');
                this.isToggling = false;
            }, this.animationDuration);
        }
    }
    ;
}
