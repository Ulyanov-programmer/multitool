import ObserverTools, { ActionOnView, TypedAnimationTimeline, TypedViewTimeline, TypedScrollTimeline } from './observerTools.src.js'

new ObserverTools(
  { repeatingAnimations: true, activeAnimationClass: 'is-intersecting' },

  new ActionOnView({
    selectors: '.element_or_elements_group',
    threshold: 0,
    timeoutBeforeStart: 500,

    // functionOnView: function onView(observerEntry: IntersectionObserverEntry) {

    // },

    breakpoints: {
      768: {
        unobserve: false,
        timeoutBeforeStart: 800,

        // functionOnView: function onViewTablets(observerEntry: IntersectionObserverEntry) {

        // },
      },
    }
  }),


  // new TypedAnimationTimeline({
  //   selectors: '.element_or_elements_group',
  //   animatedProperties: {
  //     background: ['black', 'white'],
  //   },

  //   animateSettings: {
  //     timeline: new TypedViewTimeline({
  //       subject: '.wrapper',
  //     }),

  //     // timeline: new TypedScrollTimeline({
  //     //   axis: 'block',
  //     // }),

  //     timeRange: 'cover 0% 50%',
  //   }
  // })
)