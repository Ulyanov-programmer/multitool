import SwipeArea, { ChangePlane } from './swipe.src.js'

new SwipeArea({
  selector: `swipe-area[for-element='some-id']`,

  changePlane: ChangePlane.ToLeft,
  swipeSensitivity: '15vh',
  maxWorkWidth: 768
})
