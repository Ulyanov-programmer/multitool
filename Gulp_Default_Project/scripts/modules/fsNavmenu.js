import { returnScrollbarWidth, isNullOrWhiteSpaces } from "./general.js";
export default class FsNavmenu {
    /**
     * Provides functionality for burger and fullscreen menu.
     *
     * @param burgerSelector
     * Selctor buttons for burger menu.
     * @param fsNavmenuSelector
     * A fullscreen-menu selector that will be shown when you click on the burger.
     * @param buttonsSelector
     * Selector of buttons that are contained in the menu. It is necessary to close the menu when pressing the buttons.
     * @param autoPadding
     * If the value is true, set the automatic padding to the size of a header.
     *
     * @throws Some selector is null or white spaces -
     * This error will be printed to the console if some input argument are null or white spaces.
     */
    constructor(burgerSelector, fsNavmenuSelector, buttonsSelector, autoPadding = true) {
        if (isNullOrWhiteSpaces(burgerSelector, fsNavmenuSelector, buttonsSelector)) {
            throw '[FSNAVMENU] Some selector is null or white spaces.';
        }
        FsNavmenu.burger = document.querySelector(burgerSelector);
        FsNavmenu.fsNavmenu = document.querySelector(fsNavmenuSelector);
        FsNavmenu.buttons = document.querySelectorAll(buttonsSelector);
        FsNavmenu.autoPadding = autoPadding;
        if (autoPadding) {
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
FsNavmenu.burgerActiveClass = 'active';
FsNavmenu.fsNavmenuActiveClass = 'active';
