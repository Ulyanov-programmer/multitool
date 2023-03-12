import { elementIsExistWithLog, isNullOrWhiteSpaces, returnScrollbarWidth, sleep } from "./general.js";
export default class ModalWindowMenu {
  constructor(arg) {
    this.modalWindowSelector = ".modal-window";
    this.modalWindowActiveClass = "active";
    this.modalWindowCloseButtonsClass = "modal-window__closer";
    this.modalWindowActiveSelector = `.modal-window.${this.modalWindowActiveClass}`;
    this.generalTransitionDurationMs = 100;
    if (!elementIsExistWithLog("ModalWindowMenu", arg.modalLinksSelector))
      return;
    if (arg.burgerMenuSelector)
      ModalWindowMenu.burgerMenuClasslist = document.querySelector(arg.burgerMenuSelector).classList;
    ModalWindowMenu.modalLinks = document.querySelectorAll(arg.modalLinksSelector);
    for (let modalLink of ModalWindowMenu.modalLinks) {
      modalLink.addEventListener("click", () => {
        let modalId = modalLink.dataset.openModalId;
        if (modalId) {
          let modal = document.getElementById(modalId);
          this.showOrHideModal(modal);
        }
      });
    }
    ModalWindowMenu.modalElements = document.querySelectorAll(this.modalWindowSelector);
    for (let modalElement of ModalWindowMenu.modalElements) {
      let modalClosers = modalElement.querySelectorAll("." + this.modalWindowCloseButtonsClass);
      for (let modalCloser of modalClosers) {
        modalCloser.addEventListener("click", () => this.closeActiveModal(true));
      }
    }
    this.generalModalStyles = getComputedStyle(ModalWindowMenu.modalElements[0]);
    if (isNullOrWhiteSpaces(this.generalModalStyles.transitionDuration) != true) {
      this.generalTransitionDurationMs = parseFloat(this.generalModalStyles.transitionDuration) * 1e3;
    }
    if (arg.disableOnEsc) {
      document.addEventListener("keydown", (key) => {
        if (key.code != "Escape")
          return;
        let activeModal = this.getCurrentActiveModal();
        activeModal ? this.closeActiveModal() : false;
      });
    }
  }
  showOrHideModal(modalElement) {
    let activeModal = this.getCurrentActiveModal();
    activeModal ? this.closeActiveModal(false, activeModal) : this.toggleBodyScroll(false, activeModal);
    modalElement.classList.add(this.modalWindowActiveClass);
  }
  closeActiveModal(bodyIsScrollable = true, activeModal) {
    if (activeModal == void 0)
      activeModal = this.getCurrentActiveModal();
    activeModal.classList.remove(this.modalWindowActiveClass);
    if (bodyIsScrollable)
      this.toggleBodyScroll(true, activeModal);
  }
  async toggleBodyScroll(toggleScrollOn, activeModal) {
    if (this.chekPossibileSwitchScroll(toggleScrollOn)) {
      if (activeModal)
        await sleep(this.generalTransitionDurationMs);
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    } else {
      document.body.style.paddingRight = returnScrollbarWidth() + "px";
      document.body.style.overflow = "hidden";
    }
  }
  getCurrentActiveModal() {
    let activeModal = document.querySelector(this.modalWindowActiveSelector);
    return activeModal;
  }
  chekPossibileSwitchScroll(toggleOnValue) {
    if (ModalWindowMenu.burgerMenuClasslist) {
      if (!ModalWindowMenu.burgerMenuClasslist.contains(this.modalWindowActiveClass) && toggleOnValue) {
        return true;
      } else {
        return false;
      }
    } else {
      return toggleOnValue;
    }
  }
}
