import AnimateByScroll, { AnimationElement, AnimationMediaQuery } from "./modules/animateByScroll.js";

new AnimateByScroll(
	{ repeatingAnimations: true },

	new AnimationElement({
		selector: '.animation_by_scroll__item',
		animateStartCoeff: 0.7,
		timeoutBeforeStart: 500,
	}),
	new AnimationElement({
		selector: '.animation_by_scroll__item_2',
		animateStartCoeff: 0.7,
		timeoutBeforeStart: 1000,
	},
		new AnimationMediaQuery(768, 0.8, 500),
	),
)
AnimateByScroll.activeAnimationClass = 'active'