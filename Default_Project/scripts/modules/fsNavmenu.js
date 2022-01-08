import { returnScrollbarWidth, isNullOrWhiteSpaces } from "./general.js";
export default class FsNavmenu {
    constructor(burgerBtnSelector, fsNavmenuSelector) {
        if (isNullOrWhiteSpaces(burgerBtnSelector, fsNavmenuSelector)) {
            throw '[FSNAVMENU] Incorrect selectors for button or menu!';
        }
        FsNavmenu.burgerBtn = document.querySelector(burgerBtnSelector);
        FsNavmenu.fsNavmenu = document.querySelector(fsNavmenuSelector);
        let headerBody = FsNavmenu.fsNavmenu.firstElementChild;
        headerBody.style.marginTop = `${FsNavmenu.header.clientHeight}px`;
        FsNavmenu.burgerBtn.addEventListener('click', this.showOrHideFullscreenNav);
    }
    showOrHideFullscreenNav(e) {
        let scrollbarWidth = returnScrollbarWidth();
        if (FsNavmenu.fsNavmenu !== undefined) {
            FsNavmenu.burgerBtn.classList.toggle('active');
            document.body.classList.toggle('scroll-block');
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            FsNavmenu.header.classList.toggle('fixed-header');
            FsNavmenu.header.style.paddingRight = `${scrollbarWidth}px`;
            FsNavmenu.fsNavmenu.classList.toggle('active');
        }
    }
}
FsNavmenu.header = document.querySelector('header');
