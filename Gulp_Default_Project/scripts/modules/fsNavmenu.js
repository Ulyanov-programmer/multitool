import { returnScrollbarWidth, isNullOrWhiteSpaces } from "./general.js";
export default class FsNavmenu {
    /**
     * Provides functionality for burger and fullscreen menu.
     *
     * @param burgerSelector
     * Selctor buttons for burger menu.
     * @param fsNavmenuSelector
     * A fullscreen-menu selector that will be shown when you click on the burger.
     *
     * @throws Some selector is null or white spaces -
     * This error will be printed to the console if some input argument are null or white spaces.
     */
    constructor(burgerSelector, fsNavmenuSelector) {
        if (isNullOrWhiteSpaces(burgerSelector, fsNavmenuSelector)) {
            throw '[FSNAVMENU] Some selector is null or white spaces.';
        }
        FsNavmenu.burger = document.querySelector(burgerSelector);
        FsNavmenu.fsNavmenu = document.querySelector(fsNavmenuSelector);
        FsNavmenu.fsNavmenu.style.marginTop = `${FsNavmenu.header.clientHeight}px`;
        FsNavmenu.burger.addEventListener('click', this.showOrHideFullscreenNav);
    }
    showOrHideFullscreenNav() {
        let scrollbarWidth = returnScrollbarWidth();
        if (FsNavmenu.fsNavmenu == undefined) {
            throw new Error('[FSNAVMENU] Something wrong with fsNavmenu!');
        }
        FsNavmenu.burger.classList.toggle('active');
        document.body.classList.toggle('scroll-block');
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        FsNavmenu.header.style.paddingRight = `${scrollbarWidth}px`;
        FsNavmenu.fsNavmenu.classList.toggle('active');
    }
}
FsNavmenu.header = document.querySelector('header');
FsNavmenu.burgerActiveClass = 'active';
FsNavmenu.fsNavmenuActiveClass = 'active';
