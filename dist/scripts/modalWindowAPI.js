import ModalWindowMenu from "./modules/modalWindow.js";
new ModalWindowMenu({
  modalLinksSelector: "[data-open-modal-id]",
  modalClosersSelector: "[data-modal-close]",
  burgerMenuSelector: ".burger-menu"
});
