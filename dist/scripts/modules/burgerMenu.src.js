import { returnScrollbarWidth, elementIsExistWithLog } from "./general.js";
const _BurgerMenu = class {
  constructor(args) {
    if (!elementIsExistWithLog("BurgerMenu", args.burgerSelector, args.burgerMenuSelector, args.buttonsSelector))
      return;
    _BurgerMenu.burger = document.querySelector(args.burgerSelector);
    _BurgerMenu.menu = document.querySelector(args.burgerMenuSelector);
    _BurgerMenu.closingByClickOnElement = args.closingByClickOnElement;
    _BurgerMenu.burgerActiveClass = args.burgerActiveClass ? args.burgerActiveClass : "active";
    _BurgerMenu.menuActiveClass = args.menuActiveClass ? args.menuActiveClass : "active";
    _BurgerMenu.burger.addEventListener("click", this.toggleNavmenu);
    if (_BurgerMenu.closingByClickOnElement) {
      _BurgerMenu.buttons = document.querySelectorAll(args.buttonsSelector);
      for (let button of _BurgerMenu.buttons) {
        button.addEventListener("click", this.toggleNavmenu);
      }
    }
    if (args.autoPadding) {
      _BurgerMenu.autoPaddingOptions = args.autoPadding;
      this.changePaddingSizeBySizeOfHeader();
      window.addEventListener("resize", this.changePaddingSizeBySizeOfHeader);
    }
  }
  toggleNavmenu() {
    let scrollbarWidth = returnScrollbarWidth();
    if (_BurgerMenu.menu.classList.contains(_BurgerMenu.menuActiveClass) == false) {
      _BurgerMenu.showNavmenu(scrollbarWidth);
    } else {
      _BurgerMenu.hideNavmenu();
    }
  }
  static showNavmenu(scrollbarWidth) {
    _BurgerMenu.menu.classList.add(_BurgerMenu.menuActiveClass);
    _BurgerMenu.burger.classList.add(_BurgerMenu.burgerActiveClass);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  static hideNavmenu() {
    _BurgerMenu.menu.classList.remove(_BurgerMenu.menuActiveClass);
    _BurgerMenu.burger.classList.remove(_BurgerMenu.burgerActiveClass);
    document.body.style.overflow = "";
    document.body.style.paddingRight = `0px`;
  }
  changePaddingSizeBySizeOfHeader() {
    _BurgerMenu.autoPaddingOptions.setHeaderPadding();
  }
};
let BurgerMenu = _BurgerMenu;
BurgerMenu.closingByClickOnElement = true;
export {
  BurgerMenu as default
};
export class autoPaddingOptions {
  constructor(selectorOfElement) {
    if (elementIsExistWithLog("autoPaddingOptions", selectorOfElement)) {
      this.element = document.querySelector(selectorOfElement);
    }
    this.root = document.querySelector(":root");
  }
  getElementHeight() {
    return this.element.clientHeight;
  }
  setHeaderPadding() {
    this.root.style.setProperty("--burgerMarginTop", this.getElementHeight() + "px");
  }
}
