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
      nextEl: `your_next_button_selector`,
      prevEl: `your_prev_button_selector`,
      disabledClass: 'inactive',
    },
    pagination: {
      el: `#your_pagination_id`,
      clickable: true,
      bulletClass: 'bullet',
      bulletActiveClass: 'current',

      // ? See https://swiperjs.com/swiper-api#param-renderBullet
      // renderBullet: function (index, className) {
      //   return ''
      // }
    },
  }),
  checkFunctions: {
    0: () => {
      return true
    },
  },
})

