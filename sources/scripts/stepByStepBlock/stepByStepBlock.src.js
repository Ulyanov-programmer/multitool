export default class StepByStepBlock {
  swiper
  checkFunctions

  constructor(arg) {
    this.swiper = arg.swiperInstance
    this.checkFunctions = arg.checkFunctions

    for (let bullet of this.swiper.pagination.bullets) {
      bullet.addEventListener('click', this.bulletHandler.bind(this))
    }
    for (let button of this.swiper.navigation.nextEl) {
      button.addEventListener('click', this.nextButtonHandler.bind(this))
    }
    for (let button of this.swiper.navigation.prevEl) {
      button.addEventListener('click', this.prevButtonHandler.bind(this))
    }
  }


  nextButtonHandler() {
    let result = this.checkFunctions[this.swiper.activeIndex]?.() ?? true

    // If the result of the function is a promise
    if (typeof result != 'boolean') {
      result.then(promiseValue => {
        if (promiseValue) this.slideNextHandler()
      })
    }
    else if (result) {
      this.slideNextHandler()
    }
  }
  prevButtonHandler() {
    this.slidePrevHandler()
  }

  bulletHandler(event) {
    let clickedBulletIndex = this.swiper.pagination.bullets.findIndex(bullet => bullet == event.target)

    if (clickedBulletIndex < this.swiper.activeIndex) {
      this.slideToHandler(clickedBulletIndex)
    }
  }

  slideNextHandler() {
    this.swiper.allowSlideNext = true
    this.swiper.slideNext()
    this.swiper.allowSlideNext = false
  }
  slidePrevHandler() {
    this.swiper.allowSlidePrev = true
    this.swiper.slidePrev()
    this.swiper.allowSlidePrev = false
  }
  slideToHandler(index) {
    this.swiper.allowSlideNext = true
    this.swiper.allowSlidePrev = true

    this.swiper.slideTo(index)

    this.swiper.allowSlideNext = false
    this.swiper.allowSlidePrev = false
  }
}


