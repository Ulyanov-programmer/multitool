import AnimateByScroll, { AnimationGroup, AnimationMediaQuery } from "./modules/animateByScroll.js";
new AnimateByScroll({ repeatingAnimations: true }, new AnimationGroup({
    selectors: '.animation_by_scroll__item, .animation_by_scroll__item',
    animateStartCoeff: 0.8,
    timeoutBeforeStart: 500,
}, new AnimationMediaQuery(768, 0.8, 300)));
AnimateByScroll.activeAnimationClass = 'active';