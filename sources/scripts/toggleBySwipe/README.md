# Instruction

Allows you to change the state of elements using swipe.

## Initialization

1. To initialize, create an `.js` file and connect it to your HTML page.

2. Write the following code in the created file:

```ts
import SwipeArea, { ChangePlane } from './your_path_to/swipe.src.js'

new SwipeArea({
  selector: `swipe-area[for-element='some-id']`,

  changePlane: ChangePlane.ToLeft,
  swipeSensitivity: 0.4,
})
```

3. In the HTML file, write the following markup:

```html
<div id="some-id"></div>
<swipe-area for-element="some-id"></swipe-area>
```

4. Style your markup using these styles:

```css
#some-id {
  --width: 30vw;
  position: fixed;
  top: 0;
  right: calc(0% - var(--width));
  width: var(--width);
  height: 100vh;
  background: gainsboro;
  transition: all 0.3s ease-in-out;

  &.isSwiped {
    right: 0;
  }
}

swipe-area {
  position: fixed;
  top: 0;
  right: 0;
  width: 20vw;
  height: 100vh;
}
```

5. Swipe your finger over the area indicated by the swipe-area element to the left.

6. ...PROFIT!

## API

To fine-tune the script, you can use the following API functions:

```ts
new SwipeArea({
  /*
    The selector of the swipe-area element for which the swipe will be active. 
    Attention! The swipe-area element must have the for-element attribute, with the ID of the element that will move during the swipe.
  */
  selector: `swipe-area[for-element='some-id']`,

  // Which way do you need to swipe in order for the element to appear.
  changePlane: ChangePlane.ToLeft,

  /*
    The higher or lower the value, the more or less you need to swipe in order 
    for the menu to appear. Usually the values range from `0.3` to `0.7`.
  */
  swipeSensitivity: 0.5,

  // The maximum width of the viewport when a swipe will work.
  // Default value: 100000.
  maxWorkWidth: 768,

  // A class for the element that will be switched by swipe, as well as for the swipe area at the time of successful switching.
  isSwipedClass: 'isSwiped',
  isSwipedAreaClass: 'isSwiped',

  // These functions will be triggered during a successful swipe to open and close, respectively.
  actionOnOpening(openedElement) {},
  actionOnClosing(closedElement) {},
})
```

## It is useful to know

1. When the user starts a swipe, he can continue it outside the swipe area, throughout the document.
2. When the width of the viewport becomes higher than the value of the maxWorkWidth parameter, the swipe stops working.
