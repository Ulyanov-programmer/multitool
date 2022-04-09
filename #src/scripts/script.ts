//? If you are making a multi-page site, i recommend dividing the contents of this file
//? into several parts and connecting them to each page separately.

//? Also, TSDoc is used here, so read the tips. Try hover on some constructor.

// fsnavmenu //
import FsNavmenu from './modules/fsNavmenu.js';

new FsNavmenu({
	burgerSelector: '#burgerButton',
	fsNavmenuSelector: '.fullscreen-navmenu',
	buttonsSelector: '.fs-element',
	autoPadding: true,
})
FsNavmenu.fsNavmenuActiveClass = 'active'
FsNavmenu.burgerActiveClass = 'active'

// spoiler //
import SpoilerMenu from './modules/spoiler.js';

new SpoilerMenu({
	btnsSelector: '.uspoiler-btn',
	contentBlocksSelector: '.uspoiler-content',
	maxWorkWidth: 5000,
	animationDuration: 500,
})
SpoilerMenu.btnActiveClass = 'active'
SpoilerMenu.contentActiveClass = 'active'

// filter //
import Filter from './modules/filter.js';
/*
	When you press the filter__button, all elements that do not have 
	a value similar to the filter__button attribute value will be hidden.
	To reset the filter through a filter__button, 
	you should use the 'all' value for the data-filt-content attribute.

	You can declare multiple filters to work separately.
*/
let someFilter = new Filter({
	filtButtonsSelector: '.filter__button',
	filtElementsSelector: '.filter__item',
})

// modal window //
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
	modalLinksSelector: '[data-modal-link]',
	modalClosersSelector: '.modal-closer',
	fsMenuSelector: '.fullscreen-navmenu',
})

// element-modal //
import ElementModal from './modules/elementModal.js';
/*
	It works like this:
	When hovering over a contentElement, 
	clones the modalElement and places it absolutely above the contentElement.
	Moving the mouse away from the contentElement deletes the pasted modalElement copy.
*/
let elementMenu = new ElementModal({
	contentElementsSelector: '.el-menu__item',
	modalElementSelector: '.el-menu__menu',
	animationDuration: 300,
})

// scroll-elements //
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
	fixedHeaderSelector: '.fixed-header', 
})

// sidebar //
import SidebarMenu from './modules/sidebar.js';

new SidebarMenu({
	selectorOfSidebars: '.sidebar',
	selectorOfSidebarButtons: '.sidebar__show-btn',
})
SidebarMenu.sidebarsActiveClass = 'active'
SidebarMenu.buttonsActiveClass = 'active'

// accordion //
import Accordion from './modules/accord.js';

/* Attention, 
	the display property for inactive accordion elements
	does not allow them to be hidden.
	If you need to use it, set it via the active element class.
*/
let someAccrod = new Accordion({
	btnsSelector: '.accordion__btn',
	contentBlocksSelector: '.accordion__item',
	animationDuration: 500,
	activeFirstElements: true,
})
someAccrod.buttonsActiveClass = 'active'
someAccrod.contentActiveClass = 'active'

// parallax //
import { Parallax, ParallaxElement } from './modules/parallax.js';

let someParallaxMenu = new Parallax(
	{ parallaxContainerSelector: '.fullscreen__body', minWorkWidth: 768, },
	
	new ParallaxElement({
		selectorOrElement: '.parallax-text',
		// The smaller, the stronger the effect.
		parallaxCoeff: 5,
	})
)

// submenu //
import Submenu, { SubmenuElementGroup, SubmenuOpenIvents } from './modules/submenu.js';
new Submenu(
	{ menuActiveClass: 'show', buttonActiveClass: 'active', disableOnEsc: true},

	new SubmenuElementGroup({
		openIvent: SubmenuOpenIvents.Hover,
		buttonsSelector: '.demo-submenu__hover-button',
		menusSelector: '.demo-submenu__hover-ul',
	}),
	new SubmenuElementGroup({
		openIvent: SubmenuOpenIvents.Click,
		buttonsSelector: '.demo-submenu__click-button',
		menusSelector: '.demo-submenu__click-ul',
	}),
)

// AnimationByScroll //
import AnimateByScroll, { AnimationElement, AnimationMediaQuery } from "./modules/animateByScroll.js";

new AnimateByScroll(
	{ repeatingAnimations: true },

	new AnimationElement({
		selector: '.animation-by-scroll__item',
		animateStartCoeff: 0.7,
		timeoutBeforeStart: 500,
	}),
	new AnimationElement({
		selector: '.animation-by-scroll__item-2',
		animateStartCoeff: 0.7,
		timeoutBeforeStart: 1000,
	},
		new AnimationMediaQuery(768, 0.8, 500),
	),
)
AnimateByScroll.activeAnimationClass = 'active'

// SwipeMenu //
import SwipeElement, { ChangePlane } from "./modules/swipeMenu.js";

new SwipeElement({
	touchAreaSelector: '.swipe-window__swipe-area_left',
	swipableElementSelector: '.swipe-window__swipe-el_left',
	changePlane: ChangePlane.ToRight,
	swipeSensitivity: 0.15,
})
new SwipeElement({
	touchAreaSelector: '.swipe-window__swipe-area_top',
	swipableElementSelector: '.swipe-window__swipe-el_top',
	changePlane: ChangePlane.ToBottom,
	swipeSensitivity: 0.2,
})
new SwipeElement({
	touchAreaSelector: '.swipe-window__swipe-area_right',
	swipableElementSelector: '.swipe-window__swipe-el_right',
	changePlane: ChangePlane.ToLeft,
	swipeSensitivity: 0.15,
})
new SwipeElement({
	touchAreaSelector: '.swipe-window__swipe-area_bottom',
	swipableElementSelector: '.swipe-window__swipe-el_bottom',
	changePlane: ChangePlane.ToTop,
	swipeSensitivity: 0.2,
})

//? your scripts //
