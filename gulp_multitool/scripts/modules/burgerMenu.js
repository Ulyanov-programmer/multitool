import { returnScrollbarWidth, elementIsExistWithLog } from "./general.js";
const _BurgerMenu = class {
  constructor(args) {
    if (!elementIsExistWithLog("BurgerMenu", args.burgerSelector, args.burgerMenuSelector, args.buttonsSelector)) {
      return;
    }
    _BurgerMenu.burger = document.querySelector(args.burgerSelector);
    _BurgerMenu.menu = document.querySelector(args.burgerMenuSelector);
    _BurgerMenu.buttons = document.querySelectorAll(args.buttonsSelector);
    _BurgerMenu.autoPadding = args.autoPadding;
    if (args.burgerActiveClass)
      _BurgerMenu.burgerActiveClass = args.burgerActiveClass;
    if (args.menuActiveClass)
      _BurgerMenu.menuActiveClass = args.menuActiveClass;
    if (args.autoPadding)
      _BurgerMenu.menu.style.paddingTop = `${_BurgerMenu.header.clientHeight}px`;
    _BurgerMenu.burger.addEventListener("click", this.toggleNavmenu);
    for (let button of _BurgerMenu.buttons) {
      button.addEventListener("click", this.hideNavmenu);
    }
  }
  toggleNavmenu() {
    let scrollbarWidth = returnScrollbarWidth();
    if (_BurgerMenu.autoPadding)
      _BurgerMenu.menu.style.paddingTop = `${_BurgerMenu.header.clientHeight}px`;
    _BurgerMenu.burger.classList.toggle(_BurgerMenu.burgerActiveClass);
    if (document.body.style.overflow != "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    _BurgerMenu.header.style.paddingRight = `${scrollbarWidth}px`;
    _BurgerMenu.menu.classList.toggle(_BurgerMenu.menuActiveClass);
  }
  hideNavmenu() {
    let scrollbarWidth = returnScrollbarWidth();
    _BurgerMenu.burger.classList.remove(_BurgerMenu.burgerActiveClass);
    if (document.body.style.overflow.includes("hidden")) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    _BurgerMenu.menu.classList.remove(_BurgerMenu.menuActiveClass);
  }
};
let BurgerMenu = _BurgerMenu;
BurgerMenu.header = document.querySelector("header");
BurgerMenu.autoPadding = true;
BurgerMenu.burgerActiveClass = "active";
BurgerMenu.menuActiveClass = "active";
export {
  BurgerMenu as default
};
