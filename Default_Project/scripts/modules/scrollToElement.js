import { isNullOrWhiteSpaces } from "./general.js";
export default class ScrollElement {
    constructor(scrollButtonsSelector, fixedHeaderSelector = null) {
        if (isNullOrWhiteSpaces(scrollButtonsSelector)) {
            throw new Error('[SCROLL-ELEMENTS] Incorrect scroll-buttons selector!');
        }
        let scrollButtons = document.querySelectorAll(scrollButtonsSelector);
        for (let scrollButton of scrollButtons) {
            scrollButton.addEventListener('click', () => {
                this.scrollToElement(scrollButton);
            });
        }
        if (isNullOrWhiteSpaces(fixedHeaderSelector) == false) {
            let heightHeight = document.querySelector(fixedHeaderSelector).clientHeight;
            ScrollElement.FIXED_HEADER_HEIGHT = heightHeight;
        }
    }
    scrollToElement(scrollButton) {
        let scrollElement = document.querySelector(`${scrollButton.dataset.scrollTo}`);
        if (scrollElement) {
            let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top;
            window.scrollTo({
                top: scrolltop - ScrollElement.FIXED_HEADER_HEIGHT,
                behavior: "smooth"
            });
        }
    }
}
ScrollElement.FIXED_HEADER_HEIGHT = 0;
