import ElementModal from './modules/elementModal.js';
/*
    It works like this:
    When hovering over a contentElement,
    clones the modalElement and places it absolutely above the contentElement.
    Moving the mouse away from the contentElement deletes the pasted modalElement copy.
*/
new ElementModal({
    contentElementsSelector: '.el-menu__item',
    modalElementSelector: '.el-menu__menu',
    // smooth transition is calculated automatically, specify it for a modalElement
});