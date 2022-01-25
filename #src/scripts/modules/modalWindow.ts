import { isNullOrWhiteSpaces, returnScrollbarWidth } from "./general.js";

export default class ModalWindowMenu {
  private static modalLinks: NodeListOf<HTMLElement>
  private static modalClosers: NodeListOf<HTMLElement>
  private static fsMenuClasslist: DOMTokenList
  private static UNLOCK: boolean = true
  public static transitionTimeout: number

  /**
   * Provides functionality for modal windows.
   
   * @param modalLinksSelector
   * Selector of buttons for opening modal windows.
   * For correct operation, you need to add the attribute [data-modal-link]
   * @param modalClosersSelector
   * Selector of buttons for closing modal windows (should be in html of modal).
   * @param fsMenuSelector 
   * Selector of fullscreen navmenu (burger fs-navmenu), need for correct work with it.
   * Not required.
   * @param transitionTimeout
   * Transition time from modal window style (in seconds or .number). 
   * 
   * @remarks I recommend to use my html-construction of modal-window like this:
   * @example
   * ```html
   *<section id="modal_1" class='modal-window'>
   *  <div class="modal-window__body">
   *    <div class="modal-window__content">
   *      <button type='button' class="modal-closer"></button>
   *    </div>
   *  </div>
   *</section>
   * ```
   * 
   * @throws Some selector is null or white spaces - 
   * This error will be printed to the console if some input argument are null or white spaces.
   */
  constructor(modalLinksSelector: string, modalClosersSelector: string, transitionTimeout: number, fsMenuSelector?: string) {
    if (isNullOrWhiteSpaces(modalLinksSelector, modalClosersSelector)) {
      throw new Error('[MODALWINDOW] Incorrect arguments!');
    }

    if (fsMenuSelector) {
      ModalWindowMenu.fsMenuClasslist = document.querySelector(fsMenuSelector).classList;
    }
    ModalWindowMenu.transitionTimeout = transitionTimeout;
    ModalWindowMenu.modalLinks = document.querySelectorAll(modalLinksSelector);

    for (let modalLink of ModalWindowMenu.modalLinks) {
      modalLink.addEventListener("click", () => {
        let popupId = modalLink.dataset.modalLink;

        if (popupId !== undefined) {
          let modal = document.getElementById(popupId);
          this.showOrHideModal(modal);
        }
      });
    }

    ModalWindowMenu.modalClosers = document.querySelectorAll(modalClosersSelector);

    for (const modalCloser of ModalWindowMenu.modalClosers) {
      modalCloser.addEventListener("click", () => {
        this.closeModal(modalCloser.closest('.modal-window'), true);
      });
    }


    document.addEventListener('keydown', (key) => {
      if (key.code === 'Escape') {
        let activeModal = document.querySelector<HTMLElement>('.modal-window.active');
        this.closeModal(activeModal, true);
      }
    });
  }


  private showOrHideModal(modalElement) {
    if (modalElement && ModalWindowMenu.UNLOCK) {
      let activeModal = document.querySelector<HTMLElement>('.modal-window.active');

      activeModal ? this.closeModal(activeModal, false) : this.toggleBodyScroll(false);

      modalElement.classList.add("active");
    }
    modalElement.addEventListener("click", (e) => {

      // Checks if the pressed element has a CONTENT parent, if not, closes the modal.
      if (!e.target.closest('.modal-window__content')) {
        this.closeModal(modalElement, true);
      }
    })
  }

  private closeModal(modalWindow: HTMLElement, bodyIsScrollable: boolean) {
    if (ModalWindowMenu.UNLOCK) {
      modalWindow.classList.remove("active");

      setTimeout(() => {
        if (bodyIsScrollable) {
          this.toggleBodyScroll(true);
        }
      }, ModalWindowMenu.transitionTimeout * 2);
    }
  }

  private toggleBodyScroll(toggleScrollOn: boolean) {
    if (this.chekPossibileSwitchScroll(toggleScrollOn)) {
      document.body.style.paddingRight = '0';
      document.body.classList.remove("scroll-block");
    } else {
      document.body.style.paddingRight = returnScrollbarWidth() + 'px';
      document.body.classList.add('scroll-block');
    }

    ModalWindowMenu.UNLOCK = false;

    // Prevents a new window from opening too quickly.
    setTimeout(() => {
      ModalWindowMenu.UNLOCK = true;
    }, ModalWindowMenu.transitionTimeout * 2);
  }


  private chekPossibileSwitchScroll(toggleOnValue: boolean) {
    if (ModalWindowMenu.fsMenuClasslist) {
      if (!ModalWindowMenu.fsMenuClasslist.contains('active') && toggleOnValue) {
        return true
      } else {
        return false
      }
    } else {
      return toggleOnValue
    }
  }
}




