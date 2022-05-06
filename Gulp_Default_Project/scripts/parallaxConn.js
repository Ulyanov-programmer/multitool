import Parallax, { ParallaxElement } from './modules/parallax.js';
new Parallax({ parallaxContainerSelector: '.par-wrapper', minWorkWidth: 768, }, new ParallaxElement({
    selectorOrElement: '.parallax_el',
    // The less the stronger the effect.
    parallaxCoeffX: 0.2,
    parallaxCoeffY: 0.2,
}), new ParallaxElement({
    selectorOrElement: '.parallax_el_2',
    // The less the stronger the effect.
    parallaxCoeffX: 0.3,
    parallaxCoeffY: 0.2,
}));
