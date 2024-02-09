# Instruction

Allows you to perform a parallax effect when moving the cursor.

## Initialization

1. To initialize, create an ts/js file and connect it to your HTML page.

2. Write the following code in the created file:

```ts
import Parallax, {
  ParallaxElement,
} from './path_to_parallax_folder/parallax.src.js'

new Parallax(
  { parallaxContainerSelector: '.parallax_wrapper', minWorkWidth: 768 },

  new ParallaxElement({
    selector: '.parallax_el',
    parallaxCoefficients: [-0.2, 0.2],
  })
)
```

## API

```ts
new Parallax(
  {
    // The selector of the element, the movement of the cursor over which will cause parallax.
    parallaxContainerSelector: '.parallax_wrapper',

    // If the screen width becomes less than the specified width, the parallax will stop working.
    minWorkWidth: 768,
  },

  // Create to specify which elements will be subject to parallax.
  // You can create infinitely many instances.
  new ParallaxElement({
    selector: '.parallax_el',

    /* 
      Parallax coefficients along the X-axis (the first value) and along the Y-axis (the second value).
      If the second value is not specified, the value of the first one will be used for the Y axis.
      It takes values in the range from -1 to 1.
    */
    parallaxCoefficients: [-0.2, 0.2],
  })
)
```
