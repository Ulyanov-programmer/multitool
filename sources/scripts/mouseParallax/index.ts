import Parallax, { ParallaxElement } from './parallax.src.js'

new Parallax(
  { parallaxContainerSelector: '.parallax_wrapper', minWorkWidth: 768 },

  new ParallaxElement({
    selector: '.parallax_el',
    parallaxCoefficients: [-0.2, 0.2],
  }),
)