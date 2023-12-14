import Parallax, { ParallaxElement } from './parallax.src.js'

new Parallax(
  { parallaxContainerSelector: '.parallax_wrapper', minWorkWidth: 768 },

  new ParallaxElement({
    selectorOrElement: '.parallax_el',

    parallaxCoeffX: 0.2,
    parallaxCoeffY: 0.2,
    reverseMode: false,
  })
)