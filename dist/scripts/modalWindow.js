import ModalWindowMenu from "./modules/modalWindow.src.js";
new ModalWindowMenu({
  modalLinksSelector: "[data-open-modal-id]",
  burgerMenuSelector: ".burger-menu",
  disableOnEsc: true
});
