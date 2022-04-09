import { returnScrollbarWidth, isNullOrWhiteSpaces } from "./general.js";
export default class FsNavmenu {
    constructor(args) {
        if (isNullOrWhiteSpaces(args.burgerSelector, args.fsNavmenuSelector, args.buttonsSelector)) {
            throw '[FSNAVMENU] Some selector is null or white spaces.';
        }
        FsNavmenu.burger = document.querySelector(args.burgerSelector);
        FsNavmenu.fsNavmenu = document.querySelector(args.fsNavmenuSelector);
        FsNavmenu.buttons = document.querySelectorAll(args.buttonsSelector);
        FsNavmenu.autoPadding = args.autoPadding;
        if (args.autoPadding) {
            FsNavmenu.fsNavmenu.style.paddingTop = `${FsNavmenu.header.clientHeight}px`;
        }
        FsNavmenu.burger.addEventListener('click', this.showOrHideFullscreenNav);
        for (let button of FsNavmenu.buttons) {
            button.addEventListener('click', this.hideNavmenu);
        }
    }
    showOrHideFullscreenNav() {
        let scrollbarWidth = returnScrollbarWidth();
        if (FsNavmenu.fsNavmenu == undefined) {
            throw new Error('[FSNAVMENU] Something wrong with fsNavmenu!');
        }
        if (FsNavmenu.autoPadding) {
            FsNavmenu.fsNavmenu.style.paddingTop = `${FsNavmenu.header.clientHeight}px`;
        }
        FsNavmenu.burger.classList.toggle(FsNavmenu.burgerActiveClass);
        document.body.classList.toggle('scroll-block');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        FsNavmenu.header.style.paddingRight = `${scrollbarWidth}px`;
        FsNavmenu.fsNavmenu.classList.toggle(FsNavmenu.fsNavmenuActiveClass);
    }
    hideNavmenu() {
        let scrollbarWidth = returnScrollbarWidth();
        FsNavmenu.burger.classList.remove(FsNavmenu.burgerActiveClass);
        document.body.classList.toggle('scroll-block');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        FsNavmenu.fsNavmenu.classList.remove(FsNavmenu.fsNavmenuActiveClass);
    }
}
FsNavmenu.header = document.querySelector('header');
FsNavmenu.autoPadding = true;
FsNavmenu.burgerActiveClass = 'active';
FsNavmenu.fsNavmenuActiveClass = 'active';
