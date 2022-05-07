import Tab from './modules/tabs.js';
let someAccrod = new Tab({
    btnsSelector: '.tab__btn',
    contentBlocksSelector: '.tab__item',
    // smooth transition is calculated automatically, specify it for the contentBlocks
    activeFirstElements: true,
});
someAccrod.buttonsActiveClass = 'active';
someAccrod.contentActiveClass = 'active';
