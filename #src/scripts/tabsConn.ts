import Tab from './modules/tabs.js';

let someAccrod = new Tab({
	btnsSelector: '.accordion__btn',
	contentBlocksSelector: '.accordion__item',
	// smooth transition is calculated automatically, specify it for the contentBlocks
	activeFirstElements: true,
})
someAccrod.buttonsActiveClass = 'active'
someAccrod.contentActiveClass = 'active'