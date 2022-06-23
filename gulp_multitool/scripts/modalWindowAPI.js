import ModalWindowMenu from './modules/modalWindow.js';
/*
    It works like this:
    Finds all elements that contain data-modal-link and .modal-closer.
    The first ones trigger the event of opening the modal window, the second ones close it.
    After clicking on one of these elements,
    it looks for a block with a name inside data-modal-link and gives it the "active" class.

    Also, when pressed, turns off the scrolling page.
*/
new ModalWindowMenu({
    modalLinksSelector: '[data-open-modal-id]',
    modalClosersSelector: '[data-modal-close]',
    burgerMenuSelector: '.fullscreen-navmenu',
    // smooth transition is calculated automatically, specify it for a modal
});