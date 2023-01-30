import PhotoSwipeLightbox from '../libs/photoswipe-lightbox.esm.min.js'
import PhotoSwipe from '../libs/photoswipe.esm.min.js'

new PhotoSwipeLightbox({
  gallery: '#your_gallery',
  children: 'a',
  pswpModule: PhotoSwipe,
}).init()