# Instruction

This script allows you to create an interface element, parts of which will be shown to the user in strict sequence. <br>
This is useful, for example, for forms.
Attention! Requires the [Swiper](https://swiperjs.com/) plugin to work.

## Initialization

1. To initialize, create an `.js` file and connect it to your HTML page.

2. Write the following code in the created file:

```ts
import Swiper from './your_path_to_/swiper.js'
import StepByStepBlock from './your_path_to/stepByStepBlock.src.js'

new StepByStepBlock({
  swiperInstance: new Swiper('#step-by-step', {
    allowTouchMove: false,
    allowSlideNext: false,
    allowSlidePrev: false,

    navigation: {
      nextEl: `.swiper-button-next`,
      prevEl: `.swiper-button-prev`,
      disabledClass: 'inactive',
    },
  }),
  checkFunctions: {
    0: () => {
      return true
    },
  },
})
```

3. Create the following markup in your HTML file:

```html
<div class="swiper" id="step-by-step">
  <div class="swiper-wrapper">
    <div class="swiper-slide" style="height: 200px; background: gainsboro;">
      Slide one
    </div>
    <div class="swiper-slide" style="height: 200px; background: gainsboro;">
      Step two
    </div>
    <div class="swiper-slide" style="height: 200px; background: gainsboro;">
      Step three
    </div>
  </div>
</div>

<div class="swiper-pagination"></div>

<button type="button" class="swiper-button-prev"></button>
<button type="button" class="swiper-button-next"></button>
```

4. That's all!

## API

To fine-tune the script, you can use the following API functions:

```ts
new StepByStepBlock({
  swiperInstance: new Swiper('#step-by-step', {
    // Use these parameters to prevent skipping steps.
    allowTouchMove: false,
    allowSlideNext: false,
    allowSlidePrev: false,

    // Specify the buttons to switch the steps.
    navigation: {
      nextEl: `.swiper-button-next`,
      prevEl: `.swiper-button-prev`,
      disabledClass: 'inactive',
    },

    /* 
      Specify the pagination buttons (optional).
    
      If you specify the `clickable: true` parameter, the plugin will allow you to switch to the previous steps by clicking on the pagination buttons.
    */
    pagination: {
      el: `.swiper-pagination`,
      clickable: true,
    },
  }),

  /*
    Specify a validating function for each step.
  */
  checkFunctions: {
    /*
      Specify the step number, after trying to switch which one, this function will work.
      It is triggered only when switching to the next step.
      The function must return a <Boolean> value. If it returns <true> (or promise with true), the step will be switched, otherwise there will be no switching.
    */
    0: () => {
      return true // or promise
    },
  },
})
```
