/*
  https://photoswipe.com/getting-started/
*/

import PhotoSwipeLightbox from './photoswipe-lightbox.esm.min.js'

new PhotoSwipeLightbox({
  gallery: '#your_gallery',
  children: 'a',
  pswpModule: () => import('./photoswipe.esm.min.js'),
}).init()


/* HINTS

  arrowPrev: false,
  arrowNext: false,
  zoom: false,
  close: false,
  counter: false,

  ? set background opacity
  bgOpacity: 0.6,

  ? to apply styles just to an instance of PhotoSwipe
  mainClass: 'YourClass',

*/