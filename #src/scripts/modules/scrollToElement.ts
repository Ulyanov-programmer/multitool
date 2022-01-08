import { isNullOrWhiteSpaces } from "./general.js";

export default class ScrollElement {
  private static FIXED_HEADER_HEIGHT = 0;

  constructor(scrollButtonsSelector: string, fixedHeaderSelector: string = null) {
    if (isNullOrWhiteSpaces(scrollButtonsSelector)) {
      throw new Error('[SCROLL-ELEMENTS] Incorrect scroll-buttons selector!');
    }
    let scrollButtons = document.querySelectorAll<HTMLElement>(scrollButtonsSelector);

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


  scrollToElement(scrollButton: HTMLElement) {
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