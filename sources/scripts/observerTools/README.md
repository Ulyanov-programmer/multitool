# Instruction.

Provides API for more flexible and convenient work with the `IntersectionObserver`. <br>

## Initialization

To initialize:

1. Create a file with the following contents:

```ts
import ActionOnView from './path_to_observerTools_folder/observerTools.src.js';

new ActionOnView({
  selectors: '.element_or_elements_group',
});
```

2. Connect this file:

```html
<script type="module" src="./path_to_your_API/index.js"></script>
```

3. Now, when your element/s is displayed on the screen, it will receive the is-intersecting class.

## Additional parameters

You can use this script more fully using the following functions:

### General options

Use it in the your file to:

- Change the assigned class for the observed elements.
- Allow the Observer to be triggered not once, but every time an element is observed on the screen.

```ts
import ActionOnView, { ObserverTools } from './observerTools.src.js';

new ObserverTools({
  repeatObserve: true,
  isIntersectedClass: 'is-intersecting',
});
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

  /* 
    A function that will be executed when the item being observed is visible on the screen.
    It will work after the time specified by the timeoutBeforeStart parameter.
    ! The function name must be unique, otherwise problems may occur.
  */
  functionOnView: function onView(observerEntry: IntersectionObserverEntry) {},
});
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

      // Override the function that will be executed when the file is being observed.
      //! The function name must be unique, otherwise problems may occur.
      functionOnView: function onViewTablets(observerEntry: IntersectionObserverEntry) { },
    },

    // Make as many breakpoints as you want!
  }
});
```

### Typed timeline

At the time of creating the documentation, there is no support for @scroll-timeline (https://caniuse.com/css-scroll-timeline). To implement its functionality, this script uses the polyfill. <br>
To use it, write the following code:

```ts
import ActionOnView, {
  TypedAnimationTimeline,
  TypedViewTimeline,
  TypedScrollTimeline,
} from './observerTools.src.js';

new TypedAnimationTimeline({
  selectors: '.element_or_elements_group',

  // See the "Parameters" section below.
  properties: {
    background: ['black', 'red'],
  },

  // See the "Settings" section below.
  settings: {
    timeline:
      new TypedViewTimeline({
        subject: '.wrapper',
      })
      // or use it
      new TypedScrollTimeline({
        axis: 'block' | 'inline' | 'y' | 'x',
      }),

    timeRange: 'cover 0% 50%',
  },
});
```

#### Parameters

Specify which properties will be subject to change, and also specify the values by listing them in an array (there may be more than two). <br>
When scrolling through the element, the values will be assigned from the first to the last, changing smoothly if possible.

```ts
properties: {
  background: ['red', 'green', 'blue'],
},
```

#### Settings

```ts
settings: {
  /*
    Specify the timeline type. Depending on the value, the timeline will work differently.

    If a TypedViewTimeline is passed, the animation will work depending on how visible the element is.
    If the TypedScrollTimeline is passed, the animation will work depending on how much the element is scrolled.
  */
  timeline: new TypedViewTimeline({
    subject: '.wrapper',

    /* The following are optional parameters: */

    // https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline/subject
    subject: '',

    // https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline/axis
    axis: 'block' | 'inline' | 'y' | 'x',

    // https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline/startOffset
    startOffset: CSSUnitValue,

    // https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline/endOffset
    endOffset: CSSUnitValue,
  }),

  // or use it
  timeline: new TypedScrollTimeline({
    // https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline/axis
    axis: 'block' | 'inline' | 'y' | 'x',

    // https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline/source
    // Is optional.
    source: '',
  }),

  /*
    Specify the time range and how it should be perceived.
    hint:
    timeRange: 'fill-type scroll-block-for-start scroll-block-for-end'
  */
  timeRange: 'cover 0% 50%',
},
```

#### Breakpoint API

You can also change the behavior depending on the width of the screen.

```ts
new TypedAnimationTimeline({
  ...,

  // Attention, the PC-first style is used.
  breakpoints: {
    768: {
      // Turn off the timeline for the duration of the breakpoint
      disable: false,

      // Override used properties.
      properties: {},

      // Override used settings.
      settings: {},
    },

    // Make as many breakpoints as you want!
  },
});
```
