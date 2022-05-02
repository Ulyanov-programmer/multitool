import SwipeElement, { ChangePlane } from "./modules/swipe.js";

new SwipeElement({
	touchStartAreaSelector: '.swipe_window__swipe_area',
	swipableElementSelector: '.swipe_window__swipe_el',
	changePlane: ChangePlane.ToRight,
	swipeSensitivity: 0.5,
})
new SwipeElement({
	touchStartAreaSelector: '.swipe-window__swipe-area_top',
	swipableElementSelector: '.swipe-window__swipe-el_top',
	changePlane: ChangePlane.ToBottom,
	swipeSensitivity: 0.5,
})
new SwipeElement({
	touchStartAreaSelector: '.swipe-window__swipe-area_right',
	swipableElementSelector: '.swipe-window__swipe-el_right',
	changePlane: ChangePlane.ToLeft,
	swipeSensitivity: 0.5,
})
new SwipeElement({
	touchStartAreaSelector: '.swipe-window__swipe-area_bottom',
	swipableElementSelector: '.swipe-window__swipe-el_bottom',
	changePlane: ChangePlane.ToTop,
	swipeSensitivity: 0.5,
})