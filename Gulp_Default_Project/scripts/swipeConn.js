import SwipeElement, { ChangePlane } from "./modules/swipe.js";
new SwipeElement({
    touchStartAreaSelector: '.swipe_window__swipe_area',
    swipableElementSelector: '.swipe_window__swipe_el',
    changePlane: ChangePlane.ToRight,
    swipeSensitivity: 0.5,
    maxWorkWidth: 5000,
});
