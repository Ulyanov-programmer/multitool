import SpoilerMenu from './modules/spoiler.src.js'

new SpoilerMenu({
	btnsSelector: '.spoiler_btn',
	contentBlocksSelector: '.spoiler_content',
	maxWorkWidth: 10000,
	animationDuration: 300,
	buttonActiveClass: 'active',
	contentActiveClass: 'active',
})