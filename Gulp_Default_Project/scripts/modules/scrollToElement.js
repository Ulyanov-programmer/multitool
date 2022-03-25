import { isNullOrWhiteSpaces } from "./general.js";
export default class ScrollController {
    /**
     * Provides functionality for scrolling by clicking on buttons.
     *
     * @param scrollButtonsSelector
     * Selector of buttons for scrolling by click.
     * For correct work, you need to add the attribute [data-scroll-to='.selectorOfElem']
     * @param fixedHeaderSelector
     * Selector of header with position: fixed. Not required.
     * If you use a fixed header, enter, so that its height is taken into account when scrolling.
     *
     * @throws scrollButtonsSelector is null or white spaces -
     * This error will be printed to the console if some input argument are null or white spaces.
     */
    constructor({ scrollButtonsSelector, fixedHeaderSelector = undefined }) {
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
            ScrollController.fixedHeaderHeight = heightHeight;
        }
    }
    scrollToElement(scrollButton) {
        let scrollElement = document.querySelector(scrollButton.dataset.scrollTo);
        if (scrollElement == undefined) {
            throw new Error('[SCROLL-ELEMENTS] Something wrong with scrollElement!');
        }
        let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top;
        window.scrollTo({
            top: scrolltop - ScrollController.fixedHeaderHeight,
            behavior: "smooth"
        });
    }
}
ScrollController.fixedHeaderHeight = 0;
