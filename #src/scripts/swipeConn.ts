import SwipeElement, { ChangePlane } from "./modules/swipe.js";

new SwipeElement({
	touchStartAreaSelector: '.swipe_window__swipe_area_right',
	swipableElementSelector: '.swipe_window__swipe_el_right',
	changePlane: ChangePlane.ToLeft,
	swipeSensitivity: 0.5,
	maxWorkWidth: 5000,
})

new SwipeElement({
	touchStartAreaSelector: '.swipe_window__swipe_area_left',
	swipableElementSelector: '.swipe_window__swipe_el_left',
	changePlane: ChangePlane.ToRight,
	swipeSensitivity: 0.5,
	maxWorkWidth: 5000,
})

new SwipeElement({
	touchStartAreaSelector: '.swipe_window__swipe_area_top',
	swipableElementSelector: '.swipe_window__swipe_el_top',
	changePlane: ChangePlane.ToBottom,
	swipeSensitivity: 0.5,
	maxWorkWidth: 5000,
})

new SwipeElement({
	touchStartAreaSelector: '.swipe_window__swipe_area_bottom',
	swipableElementSelector: '.swipe_window__swipe_el_bottom',
	changePlane: ChangePlane.ToTop,
	swipeSensitivity: 0.5,
	maxWorkWidth: 5000,
})