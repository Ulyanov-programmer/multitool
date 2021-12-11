export default class FsNavmenu {
  static burgerBtn;
  static fsNavmenu;

  constructor(burgerBtnSelector, fsNavmenuSelector) {
    if (burgerBtnSelector && fsNavmenuSelector) {

      FsNavmenu.burgerBtn = document.querySelector(burgerBtnSelector);
      FsNavmenu.fsNavmenu = document.querySelector(fsNavmenuSelector);

      FsNavmenu.burgerBtn.addEventListener('click', this.showOrHideFullscreenNav);
    } else {
      throw '[FSNAVMENU] Set the necessary attributes for button and menu!'
    }
  }


  showOrHideFullscreenNav(e) {
    let sbWidth = window.innerWidth - document.querySelector('html').clientWidth;
    let header = document.querySelector('header');

    if (FsNavmenu.fsNavmenu !== undefined) {
      FsNavmenu.burgerBtn.classList.toggle('active');

      document.body.classList.toggle('scroll-block');
      document.body.style.paddingRight = sbWidth + 'px';

      header.classList.toggle('fixed-header');
      header.style.paddingRight = sbWidth + 'px';

      FsNavmenu.fsNavmenu.classList.toggle('active');
    }
  }
}
