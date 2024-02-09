# Instruction.

Provides API for more flexible and convenient work with the `IntersectionObserver`. <br>

## Initialization

To initialize:

1. Create a file with the following contents:

```ts
import ActionOnView from './path_to_observerTools_folder/observerTools.src.js'

new ActionOnView({
  selectors: '.element_or_elements_group',
})
```

2. Connect this file:

```html
<script type="module" src="./path_to_your_API/index.js"></script>
```

3. Now, when your element/s is displayed on the screen, it will receive the is-intersecting class.

## Additional parameters

You can use this script more fully using the following functions:

### General options

```ts
import ActionOnView, { ObserverTools } from './observerTools.src.js'

new ObserverTools({
  // Change the assigned class for the observed elements.
  repeatObserve: true,

  // Allow the Observer to be triggered not once, but every time an element is observed on the screen.
  isIntersectedClass: 'is-intersecting',
})
```

### Action options

Configure each Observer individually using the following functions:

```ts
new ActionOnView({
  selectors: '.element_or_elements_group',

  // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#threshold
  threshold: 0,

  // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#root
  root: document.querySelector('element'),

  // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#rootmargin
  rootMargin: '',

  // The delay before launching the Observer action in milliseconds.
  timeoutBeforeStart: 0,

  // Do not run the Observer action until at least one breakpoint has been reached.
  doNotRunUntilFirstBreakpoint: false,

  /* 
    A function that will be executed when the item being observed is visible on the screen.
    It will work after the time specified by the timeoutBeforeStart parameter.
  */
  functionOnView(observerEntry: IntersectionObserverEntry) {},
})
```

#### Breakpoint API

You can use the breakpoint API to change the behavior of the Observer at different screen widths:

```ts
new ActionOnView({
  ...,

  // Attention, the PC-first style is used.
  breakpoints: {
    768: {
      // Use it to disable this observer while this breakpoint is in effect.
      unobserve: false,

      // Override the delay before launching the Observer action in milliseconds.
      timeoutBeforeStart: 0,

      // Override the function that will be executed when the element is being observed.
      functionOnView(observerEntry: IntersectionObserverEntry) {},
    },

    // Make as many breakpoints as you want!
  }
});
```
