import Swiper from '../../assets/swiper/swiper-bundle.min.mjs'
import StepByStepBlock from './stepByStepBlock.src.js'
// import '../../assets/justValidate/just-validate.production.min.js'

new StepByStepBlock({
  swiperInstance: new Swiper('#step-by-step', {
    autoHeight: true,
    allowTouchMove: false,
    allowSlideNext: false,
    allowSlidePrev: false,

    navigation: {
      nextEl: `.swiper-button-next`,
      prevEl: `.swiper-button-prev`,
      disabledClass: 'inactive',
    },
    pagination: {
      el: `.swiper-pagination`,
      clickable: true,
    },
  }),
  checkFunctions: {
    0: () => {
      return true
    },
  },
})

