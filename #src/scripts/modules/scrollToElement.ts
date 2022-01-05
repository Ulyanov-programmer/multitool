export default class ScrollElement {
  static FIXED_HEADER_HEIGHT = 0;

  constructor(scrollButtonsSelector, fixedHeaderSelector = null) {
    let scrollButtons = document.querySelectorAll(scrollButtonsSelector);

    if (scrollButtons.length >= 0) {

      for (let scrollButton of scrollButtons) {
        scrollButton.addEventListener('click', () => {
          this.scrollToElement(scrollButton);
        });
      }
      if (fixedHeaderSelector && fixedHeaderSelector != '') {
        let heightHeight = document.querySelector(fixedHeaderSelector).clientHeight;
        ScrollElement.FIXED_HEADER_HEIGHT = heightHeight;
      }
    } else {
      throw '[SCROLL-ELEMENTS] The specified elements were not found!'
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