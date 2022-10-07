import { isNullOrWhiteSpaces, elementIsExistWithLog } from "./general.js";
export var SubmenuOpenIvents = /* @__PURE__ */ ((SubmenuOpenIvents2) => {
  SubmenuOpenIvents2[SubmenuOpenIvents2["Click"] = 0] = "Click";
  SubmenuOpenIvents2[SubmenuOpenIvents2["Hover"] = 1] = "Hover";
  return SubmenuOpenIvents2;
})(SubmenuOpenIvents || {});
;
const _Submenu = class {
  constructor(args, ...submenuElements) {
    if (isNullOrWhiteSpaces(args.menuActiveClass, args.buttonActiveClass))
      console.log("[Submenu] Please specify the classes for the elements when they are active.");
    _Submenu.buttonActiveClass = args.buttonActiveClass;
    _Submenu.menuActiveClass = args.menuActiveClass;
    _Submenu.submenuElements.push(...submenuElements);
    if (args.disableOnEsc) {
      document.addEventListener("keydown", (key) => key.code == "Escape" ? _Submenu.hideAllClickSubmenu() : false);
    }
  }
  static showOrHideSubmenu(currentSubmenuGroup, activeElement) {
    for (let i = 0; i < currentSubmenuGroup.buttonElements.length; i++) {
      if (currentSubmenuGroup.buttonElements[i] == activeElement) {
        currentSubmenuGroup.buttonElements[i].classList.toggle(_Submenu.buttonActiveClass);
        currentSubmenuGroup.menuElements[i].classList.toggle(_Submenu.menuActiveClass);
      } else {
        currentSubmenuGroup.buttonElements[i].classList.remove(_Submenu.buttonActiveClass);
        currentSubmenuGroup.menuElements[i].classList.remove(_Submenu.menuActiveClass);
      }
    }
  }
  static hideAllClickSubmenu() {
    for (let submenuGroup of _Submenu.submenuElements) {
      if (submenuGroup.openIvent == 0 /* Click */) {
        for (let i = 0; i < submenuGroup.buttonElements.length; i++) {
          submenuGroup.buttonElements[i].classList.remove(_Submenu.buttonActiveClass);
          submenuGroup.menuElements[i].classList.remove(_Submenu.menuActiveClass);
        }
      }
    }
  }
};
let Submenu = _Submenu;
Submenu.submenuElements = new Array();
export {
  Submenu as default
};
export class SubmenuElementGroup {
  constructor(args) {
    if (!elementIsExistWithLog("SubmenuElementGroup", args.buttonsSelector, args.menusSelector))
      return;
    this.menuElements = document.querySelectorAll(args.menusSelector);
    this.buttonElements = document.querySelectorAll(args.buttonsSelector);
    this.openIvent = args.openIvent;
    switch (this.openIvent) {
      case 1 /* Hover */:
        for (let button of this.buttonElements) {
          let wrapper = button.parentElement;
          button.addEventListener("focus", () => Submenu.showOrHideSubmenu(this, button));
          button.addEventListener("focusout", () => Submenu.showOrHideSubmenu(this, button));
          button.addEventListener("mouseenter", () => Submenu.showOrHideSubmenu(this, button));
          wrapper.addEventListener("mouseleave", () => Submenu.showOrHideSubmenu(this, button));
        }
        break;
      default:
        for (let buttonEl of this.buttonElements) {
          buttonEl.addEventListener("click", () => Submenu.showOrHideSubmenu(this, buttonEl));
        }
        break;
    }
  }
}
