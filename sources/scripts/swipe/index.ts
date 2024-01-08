import SwipeArea, { ChangePlane } from './swipe.src.js'

new SwipeArea({
  selector: `[for-element='some_id']`,

  changePlane: ChangePlane.ToLeft,
  swipeSensitivity: 0.5,
  maxWorkWidth: 768,

  isSwipedClass: 'isSwiped',
  isSwipedAreaClass: 'isSwiped',

  // actionOnOpening(openedElement) {
  // },
  // actionOnClosing(closedElement) {
  // },
})
