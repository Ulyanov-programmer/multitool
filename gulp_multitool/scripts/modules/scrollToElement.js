import { elementIsExistWithLog, elementsIsExist } from "./general.js";
const _ScrollController = class {
  constructor(arg) {
    if (!elementIsExistWithLog("ScrollController", arg.scrollButtonsSelector))
      return;
    let scrollButtons = document.querySelectorAll(arg.scrollButtonsSelector);
    for (let scrollButton of scrollButtons) {
      scrollButton.addEventListener("click", () => _ScrollController.scrollToElement(scrollButton.dataset.scrollTo));
    }
    if (elementsIsExist(arg.fixedElementSelector)) {
      let heightHeight = document.querySelector(arg.fixedElementSelector).clientHeight;
      _ScrollController.fixedElementHeight = heightHeight;
    }
    if (arg.scrollByAdressURL) {
      window.addEventListener("load", this.scrollToElementByAdress);
    }
  }
  static scrollToElement(scrollTo) {
    let scrollElement = document.querySelector(scrollTo);
    if (scrollElement == void 0) {
      console.log("[ScrollController] Something wrong with scrollElement!");
      return;
    }
    let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top;
    window.scrollTo({
      top: scrolltop - _ScrollController.fixedElementHeight,
      behavior: "smooth"
    });
  }
  scrollToElementByAdress() {
    const urlParams = new URLSearchParams(window.location.search);
    const selector = urlParams.get("b");
    _ScrollController.scrollToElement(selector);
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    searchParams.delete("b");
    window.history.pushState({}, "", url.toString());
  }
};
let ScrollController = _ScrollController;
ScrollController.fixedElementHeight = 0;
export {
  ScrollController as default
};
