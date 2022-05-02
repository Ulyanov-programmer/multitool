import Parallax, { ParallaxElement } from './modules/parallax.js';

new Parallax(
	{ parallaxContainerSelector: '.fullscreen__body', minWorkWidth: 768, },
	
	new ParallaxElement({
		selectorOrElement: '.parallax-text',
		// The less the stronger the effect.
		parallaxCoeff: 5,
	})
)