import ObserverTools, { ActionOnView, TypedAnimationTimeline, TypedViewTimeline, TypedScrollTimeline } from './observerTools.src.js'

new ObserverTools(
  { repeatObserve: true, isIntersectedClass: 'is-intersecting' },

  new ActionOnView({
    selectors: '.element_or_elements_group',
    threshold: 0,
    timeoutBeforeStart: 500,

    // functionOnView: function onView(observerEntry: IntersectionObserverEntry) { },

    // breakpoints: {
    //   768: {
    //     unobserve: false,
    //     timeoutBeforeStart: 0,

    //     // functionOnView: function onViewTablets(observerEntry: IntersectionObserverEntry) { },
    //   },
    // }
  }),


  // new TypedAnimationTimeline({
  //   selectors: '.element_or_elements_group',

  //   properties: {
  //     background: ['black', 'white'],
  //   },

  //   settings: {
  //     timeline: new TypedViewTimeline({
  //       subject: '.wrapper',
  //     }),
  //     // timeline: new TypedScrollTimeline({
  //     //   axis: 'block',
  //     // }),

  //     timeRange: 'cover 0% 50%',
  //   },
  //   // breakpoints: {
  //   //   768: {
  //   //     disable: false,
  //   //     properties: {},
  //   //     settings: {},
  //   //   },
  //   // }
  // }),
)