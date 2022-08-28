import SwipeElement, { ChangePlane } from "./modules/swipe.src.js"

new SwipeElement({
	touchStartAreaSelector: '.swipe_window__swipe_area_right',
	swipableElementSelector: '.swipe_window__swipe_el_right',
	changePlane: ChangePlane.ToLeft,
	swipeSensitivity: 0.5,
	maxWorkWidth: 5000,
})