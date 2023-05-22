import PhotoSwipeLightbox from '../libs/photoswipe/photoswipe-lightbox.esm.min.js'
import PhotoSwipe from '../libs/photoswipe/photoswipe.esm.min.js'

new PhotoSwipeLightbox({
  gallery: '#your_gallery',
  children: 'a',
  pswpModule: PhotoSwipe,
}).init()