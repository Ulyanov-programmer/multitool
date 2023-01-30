import Parallax, { ParallaxElement } from './modules/parallax.src.js'

new Parallax(
  { parallaxContainerSelector: '.par-wrapper', minWorkWidth: 768 },

  new ParallaxElement({
    selectorOrElement: '.parallax_el',
    parallaxCoeffX: 0.2,
    parallaxCoeffY: 0.2,
    reverseMode: false,
  }),
  new ParallaxElement({
    selectorOrElement: '.parallax_el_2',
    parallaxCoeffX: 0.3,
    parallaxCoeffY: 0.2,
  })
)