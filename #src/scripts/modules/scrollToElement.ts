import { isNullOrWhiteSpaces } from "./general.js";

export default class ScrollElement {
  private static FIXED_HEADER_HEIGHT = 0;

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
  constructor(scrollButtonsSelector: string, fixedHeaderSelector?: string) {
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


  private scrollToElement(scrollButton: HTMLElement) {
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