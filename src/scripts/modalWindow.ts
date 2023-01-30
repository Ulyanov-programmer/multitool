import ModalWindowMenu from './modules/modalWindow.src.js'
/*
  For buttons that should open windows, assign modalLinksSelector.
  For buttons that should close windows, assign a class - modal-window__closer.
*/
new ModalWindowMenu({
  modalLinksSelector: '[data-open-modal-id]',
  burgerMenuSelector: '.burger-menu',
  disableOnEsc: true,
})