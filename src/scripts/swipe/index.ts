import SwipeElement, { ChangePlane } from './swipe.src.js'

new SwipeElement({
  touchStartAreaSelector: '[data-swipe-area]',
  swipeableElementSelector: '.element',
  changePlane: ChangePlane.ToLeft,
  swipeSensitivity: 0.5,
  maxWorkWidth: 5000,
})