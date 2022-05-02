import ScrollController from './modules/scrollToElement.js';
/*
	Use if you want to use buttons for scrolling.
	How it works?
	When you press a button of scrollButtonsSelector, you scroll to the block 
	indicated in data-scroll-to attribute of this scrollButton.
*/
let scrollController = new ScrollController({
	scrollButtonsSelector: '[data-scroll-to]',
	// Use it so that a fixed header is taken into account when scrolling.
	fixedElementSelector: '.fixed-header', 
})