
export default class FsNavmenu {
  static burgerBtn = document.getElementById('burgerButton');
  static fsNavmenu = document.querySelector('.fullscreen-navmenu');

  constructor() {
    if (FsNavmenu.burgerBtn !== undefined && FsNavmenu.fsNavmenu !== undefined) {
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
