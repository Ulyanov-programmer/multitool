import { isNullOrWhiteSpaces } from "./general.js";
export default class ScrollController {
    constructor(arg) {
        if (isNullOrWhiteSpaces(arg.scrollButtonsSelector))
            throw new Error('[SCROLL-ELEMENTS] Incorrect scroll-buttons selector!');
        let scrollButtons = document.querySelectorAll(arg.scrollButtonsSelector);
        for (let scrollButton of scrollButtons) {
            scrollButton.addEventListener('click', () => this.scrollToElement(scrollButton));
        }
        if (isNullOrWhiteSpaces(arg.fixedHeaderSelector) == false) {
            let heightHeight = document.querySelector(arg.fixedHeaderSelector).clientHeight;
            ScrollController.fixedHeaderHeight = heightHeight;
        }
    }
    scrollToElement(scrollButton) {
        let scrollElement = document.querySelector(scrollButton.dataset.scrollTo);
        if (scrollElement == undefined)
            throw new Error('[SCROLL-ELEMENTS] Something wrong with scrollElement!');
        let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top;
        window.scrollTo({
            top: scrolltop - ScrollController.fixedHeaderHeight,
            behavior: "smooth"
        });
    }
}
ScrollController.fixedHeaderHeight = 0;
