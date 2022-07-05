import { elementIsExistWithLog, returnScrollbarWidth } from "./general.js";
const _ModalWindowMenu = class {
  constructor(arg) {
    if (!elementIsExistWithLog("ModalWindowMenu", arg.modalLinksSelector, arg.modalClosersSelector)) {
      return;
    }
    if (arg.burgerMenuSelector)
      _ModalWindowMenu.burgerMenuClasslist = document.querySelector(arg.burgerMenuSelector).classList;
    _ModalWindowMenu.modalLinks = document.querySelectorAll(arg.modalLinksSelector);
    for (let modalLink of _ModalWindowMenu.modalLinks) {
      modalLink.addEventListener("click", () => {
        let modalId = modalLink.dataset.openModalId;
        if (modalId) {
          let modal = document.getElementById(modalId);
          _ModalWindowMenu.transitionTimeout = parseFloat(getComputedStyle(modal).getPropertyValue("transition-duration")) * 1e3;
          this.showOrHideModal(modal);
        }
      });
    }
    _ModalWindowMenu.modalClosers = document.querySelectorAll(arg.modalClosersSelector);
    for (let modalCloser of _ModalWindowMenu.modalClosers) {
      modalCloser.addEventListener("click", () => this.closeModal(modalCloser.closest(".modal-window"), true));
    }
    document.addEventListener("keydown", (key) => {
      if (key.code != "Escape")
        return;
      let activeModal = document.querySelector(".modal-window.active");
      activeModal ? this.closeModal(activeModal, true) : false;
    });
  }
  showOrHideModal(modalElement) {
    if (modalElement && _ModalWindowMenu.UNLOCK) {
      let activeModal = document.querySelector(".modal-window.active");
      activeModal ? this.closeModal(activeModal, false) : this.toggleBodyScroll(false);
      modalElement.classList.add("active");
    }
    modalElement.addEventListener("click", (e) => {
      if (e.target.closest(".modal-window__content") == null) {
        this.closeModal(modalElement, true);
      }
    });
  }
  closeModal(modalWindow, bodyIsScrollable) {
    if (_ModalWindowMenu.UNLOCK == false)
      return;
    modalWindow.classList.remove("active");
    setTimeout(() => {
      bodyIsScrollable ? this.toggleBodyScroll(true) : false;
    }, _ModalWindowMenu.transitionTimeout * 2);
  }
  toggleBodyScroll(toggleScrollOn) {
    if (this.chekPossibileSwitchScroll(toggleScrollOn)) {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    } else {
      document.body.style.paddingRight = returnScrollbarWidth() + "px";
      document.body.style.overflow = "hidden";
    }
    _ModalWindowMenu.UNLOCK = false;
    setTimeout(() => {
      _ModalWindowMenu.UNLOCK = true;
    }, _ModalWindowMenu.transitionTimeout * 2);
  }
  chekPossibileSwitchScroll(toggleOnValue) {
    if (_ModalWindowMenu.burgerMenuClasslist) {
      if (!_ModalWindowMenu.burgerMenuClasslist.contains("active") && toggleOnValue) {
        return true;
      } else {
        return false;
      }
    } else {
      return toggleOnValue;
    }
  }
};
let ModalWindowMenu = _ModalWindowMenu;
ModalWindowMenu.UNLOCK = true;
export {
  ModalWindowMenu as default
};
