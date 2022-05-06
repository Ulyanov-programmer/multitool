import { elementIsExistWithLog, elementsIsExist } from "./general.js";
export default class ScrollController {
    constructor(arg) {
        if (!elementIsExistWithLog('ScrollController', arg.scrollButtonsSelector))
            return;
        let scrollButtons = document.querySelectorAll(arg.scrollButtonsSelector);
        for (let scrollButton of scrollButtons) {
            scrollButton.addEventListener('click', () => ScrollController.scrollToElement(scrollButton.dataset.scrollTo));
        }
        if (elementsIsExist(arg.fixedElementSelector)) {
            let heightHeight = document.querySelector(arg.fixedElementSelector).clientHeight;
            ScrollController.fixedElementHeight = heightHeight;
        }
        if (arg.scrollByAdressURL) {
            window.addEventListener('load', this.scrollToElementByAdress);
        }
    }
    static scrollToElement(scrollTo) {
        let scrollElement = document.querySelector(scrollTo);
        if (scrollElement == undefined)
            throw new Error('[SCROLL-ELEMENTS] Something wrong with scrollElement!');
        let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top;
        window.scrollTo({
            top: scrolltop - ScrollController.fixedElementHeight,
            behavior: "smooth"
        });
    }
    scrollToElementByAdress() {
        const urlParams = new URLSearchParams(window.location.search);
        const selector = urlParams.get('b');
        ScrollController.scrollToElement(selector);
        // deleting the get block in URL
        const url = new URL(window.location.href);
        const searchParams = url.searchParams;
        searchParams.delete("b");
        window.history.pushState({}, '', url.toString());
    }
}
ScrollController.fixedElementHeight = 0;
