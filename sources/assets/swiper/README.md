# Just use this.

[Swiper - documentation](https://swiperjs.com/swiper-api)

### Code preparation:

```html
<link rel="stylesheet" href="./assets/swiper/swiper-bundle.min.css" />
<script type="module" src="./assets/swiper/index.js"></script>
```

```js
import Swiper from './assets/swiper/index.js'

new Swiper(`#someSlider`, {})
```

### Hints:

```js
grabCursor: true,

navigation: {
  nextEl: `next_button_selector`,
  prevEl: `prev_button_selector`,
  disabledClass: 'inactive',
},
pagination: {
  el: `pagination_selector`,
  clickable: true,
},

preloadImages: true,
lazy: {
  loadOnTransitionStart: false,
  loadPrevnext: true,
},

autoplay:{
  delay: 3000,
  stopOnLastSlide: false,
},

// ? Infinite scrolling
loop: false,

// ? Changes the slider settings based on the width of the screen
// ! Initialize the default settings!
breakpoints: {
  // ? when window width is >= 320px
  320: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
},

// ? Changes the height of the slider in runtime depending on the height of the slides
autoHeight: true,

// ? If there are no more than one slides, the slider stops working
watchOverflow: true,

direction: 'horizontal' | 'vertical',

// ? Indent between slides in px
spaceBetween: 150,

// ? Enable parallax effect
parallax: true,
// ?? For working add and set attributes on elements in slide:
data-swiper-parallax='toRight_InPixels'
data-swiper-parallax-duration='1000'

// ? Thumbs
let thumbsSwiper = new Swiper(`your_thumbs_selector`, {
  slidesPerView: 6,
})
new Swiper(`your_main_slider_selector`, {
  thumbs: {
    swiper: thumbsSwiper,
    slideThumbActiveClass: 'active',
  },
})

scrollbar: {
  el: '.swiper_scrollbar',
  draggable: true,
},
```
