import Tab from './modules/tabs.js';
new Tab({
    btnsSelector: '.tab__btn',
    contentBlocksSelector: '.tab__item',
    fadeEffect: true,
    buttonsActiveClass: 'active',
    contentActiveClass: 'active',
    autoHeight: true,
    animationDuration: 500,
});