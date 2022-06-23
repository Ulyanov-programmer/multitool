import { isNullOrWhiteSpaces, elementIsExistWithLog } from "./general.js";
export var SubmenuOpenIvents;
(function (SubmenuOpenIvents) {
    SubmenuOpenIvents[SubmenuOpenIvents["Click"] = 0] = "Click";
    SubmenuOpenIvents[SubmenuOpenIvents["Hover"] = 1] = "Hover";
})(SubmenuOpenIvents || (SubmenuOpenIvents = {}));
;
export default class Submenu {
    constructor(args, ...submenuElements) {
        if (isNullOrWhiteSpaces(args.menuActiveClass, args.buttonActiveClass))
            console.log('[Submenu] Please specify the classes for the elements when they are active.');
        Submenu.buttonActiveClass = args.buttonActiveClass;
        Submenu.menuActiveClass = args.menuActiveClass;
        Submenu.submenuElements.push(...submenuElements);
        if (args.disableOnEsc) {
            document.addEventListener('keydown', (key) => key.code == 'Escape' ? Submenu.hideAllClickSubmenu() : false);
        }
    }
    static showOrHideSubmenu(currentSubmenuGroup, activeElement) {
        for (let i = 0; i < currentSubmenuGroup.buttonElements.length; i++) {
            if (currentSubmenuGroup.buttonElements[i] == activeElement) {
                currentSubmenuGroup.buttonElements[i].classList.toggle(Submenu.buttonActiveClass);
                currentSubmenuGroup.menuElements[i].classList.toggle(Submenu.menuActiveClass);
            }
            else {
                currentSubmenuGroup.buttonElements[i].classList.remove(Submenu.buttonActiveClass);
                currentSubmenuGroup.menuElements[i].classList.remove(Submenu.menuActiveClass);
            }
        }
    }
    static hideAllClickSubmenu() {
        for (let submenuGroup of Submenu.submenuElements) {
            if (submenuGroup.openIvent == SubmenuOpenIvents.Click) {
                for (let i = 0; i < submenuGroup.buttonElements.length; i++) {
                    submenuGroup.buttonElements[i].classList.remove(Submenu.buttonActiveClass);
                    submenuGroup.menuElements[i].classList.remove(Submenu.menuActiveClass);
                }
            }
        }
    }
}
Submenu.submenuElements = new Array();
export class SubmenuElementGroup {
    constructor(args) {
        if (!elementIsExistWithLog('SubmenuElementGroup', args.buttonsSelector, args.menusSelector))
            return;
        this.menuElements = document.querySelectorAll(args.menusSelector);
        this.buttonElements = document.querySelectorAll(args.buttonsSelector);
        this.openIvent = args.openIvent;
        switch (this.openIvent) {
            case SubmenuOpenIvents.Hover:
                for (let button of this.buttonElements) {
                    let wrapper = button.parentElement;
                    button.addEventListener('focus', () => Submenu.showOrHideSubmenu(this, button));
                    button.addEventListener('focusout', () => Submenu.showOrHideSubmenu(this, button));
                    button.addEventListener('mouseenter', () => Submenu.showOrHideSubmenu(this, button));
                    wrapper.addEventListener('mouseleave', () => Submenu.showOrHideSubmenu(this, button));
                }
                break;
            default:
                for (let buttonEl of this.buttonElements) {
                    buttonEl.addEventListener('click', () => Submenu.showOrHideSubmenu(this, buttonEl));
                }
                break;
        }
    }
}