import SpoilerMenu from './modules/spoiler.src.js'

new SpoilerMenu({
  buttonsSelector: '.spoiler__btn',
  contentBlocksSelector: '.spoiler__content',
  maxWorkWidth: 10000,
  animationDuration: 300,
  buttonActiveClass: 'active',
  contentActiveClass: 'active',
})