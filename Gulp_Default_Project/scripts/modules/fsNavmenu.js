import { returnScrollbarWidth, isNullOrWhiteSpaces } from "./general.js";
export default class FsNavmenu {
    constructor(args) {
        if (isNullOrWhiteSpaces(args.burgerSelector, args.fsNavmenuSelector, args.buttonsSelector))
            throw '[FSNAVMENU] Some selector is null or white spaces.';
        FsNavmenu.burger = document.querySelector(args.burgerSelector);
        FsNavmenu.fsNavmenu = document.querySelector(args.fsNavmenuSelector);
        FsNavmenu.buttons = document.querySelectorAll(args.buttonsSelector);
        FsNavmenu.autoPadding = args.autoPadding;
        if (args.autoPadding)
            FsNavmenu.fsNavmenu.style.paddingTop = `${FsNavmenu.header.clientHeight}px`;
        FsNavmenu.burger.addEventListener('click', this.toggleNavmenu);
        for (let button of FsNavmenu.buttons) {
            button.addEventListener('click', this.hideNavmenu);
        }
    }
    toggleNavmenu() {
        let scrollbarWidth = returnScrollbarWidth();
        if (FsNavmenu.fsNavmenu == undefined)
            throw new Error('[FSNAVMENU] Something wrong with fsNavmenu!');
        if (FsNavmenu.autoPadding)
            FsNavmenu.fsNavmenu.style.paddingTop = `${FsNavmenu.header.clientHeight}px`;
        FsNavmenu.burger.classList.toggle(FsNavmenu.burgerActiveClass);
        if (document.body.style.overflow != 'hidden') {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = '';
        }
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        FsNavmenu.header.style.paddingRight = `${scrollbarWidth}px`;
        FsNavmenu.fsNavmenu.classList.toggle(FsNavmenu.fsNavmenuActiveClass);
    }
    hideNavmenu() {
        let scrollbarWidth = returnScrollbarWidth();
        FsNavmenu.burger.classList.remove(FsNavmenu.burgerActiveClass);
        if (document.body.style.overflow.includes('hidden')) {
            document.body.style.overflow = '';
        }
        else {
            document.body.style.overflow = 'hidden';
        }
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        FsNavmenu.fsNavmenu.classList.remove(FsNavmenu.fsNavmenuActiveClass);
    }
}
FsNavmenu.header = document.querySelector('header');
FsNavmenu.autoPadding = true;
FsNavmenu.burgerActiveClass = 'active';
FsNavmenu.fsNavmenuActiveClass = 'active';
