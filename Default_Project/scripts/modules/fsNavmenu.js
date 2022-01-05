export default class FsNavmenu {
    constructor(burgerBtnSelector, fsNavmenuSelector) {
        if (burgerBtnSelector && fsNavmenuSelector) {
            FsNavmenu.burgerBtn = document.querySelector(burgerBtnSelector);
            FsNavmenu.fsNavmenu = document.querySelector(fsNavmenuSelector);
            FsNavmenu.fsNavmenu.firstElementChild.style.marginTop = `${FsNavmenu.header.clientHeight}px`;
            FsNavmenu.burgerBtn.addEventListener('click', this.showOrHideFullscreenNav);
        }
        else {
            throw '[FSNAVMENU] Set the necessary attributes for button and menu!';
        }
    }
    showOrHideFullscreenNav(e) {
        let sbWidth = window.innerWidth - document.querySelector('html').clientWidth;
        if (FsNavmenu.fsNavmenu !== undefined) {
            FsNavmenu.burgerBtn.classList.toggle('active');
            document.body.classList.toggle('scroll-block');
            document.body.style.paddingRight = sbWidth + 'px';
            FsNavmenu.header.classList.toggle('fixed-header');
            FsNavmenu.header.style.paddingRight = sbWidth + 'px';
            FsNavmenu.fsNavmenu.classList.toggle('active');
        }
    }
}
FsNavmenu.header = document.querySelector('header');
