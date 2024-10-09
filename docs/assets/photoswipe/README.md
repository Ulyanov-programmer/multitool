# Just use this.

[PhotoSwipe - documentation](https://photoswipe.com/getting-started/)

### Code preparation:

```html
<script type="module" src="./assets/photoSwipe/index.js"></script>
<link rel="stylesheet" href="./assets/photoswipe/photoswipe.css" />
```

```js
import PhotoSwipeLightbox from 'your_path_to photoswipe-lightbox.esm.min.js'

new PhotoSwipeLightbox({
  gallery: '#your_gallery',
  children: 'a',
  pswpModule: () => import('your_path_to photoswipe.esm.min.js'),
}).init()
```

### Hints:

```js
arrowPrev: false,
arrowNext: false,
zoom: false,
close: false,
counter: false,

// ? set background opacity
bgOpacity: 0.6,

// ? to apply styles just to an instance of PhotoSwipe
mainClass: 'YourClass',
```
