import { returnScrollbarWidth, isNullOrWhiteSpaces } from "./general.js";

export default class FsNavmenu {
  private static burgerBtn: HTMLElement
  private static fsNavmenu: HTMLElement
  private static header: HTMLElement = document.querySelector('header')

  /**
   * Provides functionality for burger and fullscreen menu.
   * @param burgerBtnSelector
   * Selctor buttons for burger menu.
   * @param fsNavmenuSelector
   * A fullscreen-menu selector that will be shown when you click on the burger.
   * @throws Some selector is null or white spaces - 
   * This error will be printed to the console if some input argument are null or white spaces.
   */
  constructor(burgerBtnSelector: string, fsNavmenuSelector: string) {
    if (isNullOrWhiteSpaces(burgerBtnSelector, fsNavmenuSelector)) {
      throw '[FSNAVMENU] Incorrect selectors for button or menu!'
    }

    FsNavmenu.burgerBtn = document.querySelector(burgerBtnSelector);
    FsNavmenu.fsNavmenu = document.querySelector(fsNavmenuSelector);

    let headerBody = FsNavmenu.fsNavmenu.firstElementChild as HTMLElement
    headerBody.style.marginTop = `${FsNavmenu.header.clientHeight}px`;

    FsNavmenu.burgerBtn.addEventListener('click', this.showOrHideFullscreenNav);
  }


  showOrHideFullscreenNav(e: Event) {
    let scrollbarWidth = returnScrollbarWidth();

    if (FsNavmenu.fsNavmenu !== undefined) {
      FsNavmenu.burgerBtn.classList.toggle('active');

      document.body.classList.toggle('scroll-block');
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      FsNavmenu.header.style.paddingRight = `${scrollbarWidth}px`;

      FsNavmenu.fsNavmenu.classList.toggle('active');
    }
  }
}
