let body = document.body;

export default class ModalWindowMenu {
  static modalLinks;
  static modalClosers;
  static FS_MENU_CLASSLIST;
  // This is to prevent the new modal from opening too quickly.
  static UNLOCK = true;

  constructor() {
    ModalWindowMenu.FS_MENU_CLASSLIST = document.querySelector('.fullscreen-navmenu').classList;

    ModalWindowMenu.modalLinks = document.querySelectorAll('[data-modal-link]');
    for (let modalLink of ModalWindowMenu.modalLinks) {
      modalLink.addEventListener("click", () => {
        let popupId = modalLink.dataset.modalLink;

        if (popupId !== undefined) {
          let modal = document.getElementById(popupId);
          this.showOrHideModal(modal);
        }
      });
    }

    ModalWindowMenu.modalClosers = document.querySelectorAll('.modal-closer');
    for (const modalCloser of ModalWindowMenu.modalClosers) {
      modalCloser.addEventListener("click", () => {
        this.closeModal(modalCloser.closest('.modal-window'), true);
      });
    }
    document.addEventListener('keydown', (key) => {
      let keyCode = key.code;

      if (keyCode === 'Escape') {
        let activeModal = document.querySelector('.modal-window.active');
        this.closeModal(activeModal, true);
      }
    });
  }


  showOrHideModal(modalElement) {
    if (modalElement && ModalWindowMenu.UNLOCK) {
      let activeModal = document.querySelector('.modal-window.active');

      if (activeModal) {
        this.closeModal(activeModal, false);
      } else {
        this.toggleBodyScroll(false);
      }

      modalElement.classList.add("active");
    }
    modalElement.addEventListener("click", (e) => {

      // Checks if the pressed element has a CONTENT parent, if not, closes the modal.
      if (!e.target.closest('.modal-window__content')) {
        this.closeModal(modalElement, true);
      }
    })
  }

  closeModal(modalWindow, bodyIsScrollable) {
    if (ModalWindowMenu.UNLOCK) {
      modalWindow.classList.remove("active");

      if (bodyIsScrollable) {
        this.toggleBodyScroll(true);
      }
    }
  }

  toggleBodyScroll(toggleScrollOn) {

    if (toggleScrollOn && ModalWindowMenu.FS_MENU_CLASSLIST.contains('active') == false) {
      body.style.paddingRight = 0;
      body.classList.remove("scroll-block");
    } else {
      body.style.paddingRight = returnScrollbarWidth() + 'px';
      body.classList.add('scroll-block');
    }

    ModalWindowMenu.UNLOCK = false;
    // Prevents a new window from opening too quickly.
    setTimeout(() => {
      ModalWindowMenu.UNLOCK = true;
    }, transitionTimeout * 1000);
  }
}


// When the body loses scrolling, the page may shift.
// To fix this, it will be padded in the size of the scrollbar.
function returnScrollbarWidth() {
  let scrollbarWidth = window.innerWidth - document.querySelector('html').clientWidth;
  return scrollbarWidth;
}

// Transition time FROM modal window style (in seconds or .number).
const transitionTimeout = 0.5;



