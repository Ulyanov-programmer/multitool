import Tab, { ToggleTabsEvent } from './tab.src.js'

new Tab({
  buttonsSelector: '.tab__btn',
  contentBlocksSelector: '.tab__item',
  fadeEffect: true,
  buttonsActiveClass: 'active',
  contentActiveClass: 'active',
  autoHeight: true,
  animationDuration: 500,
  toggleTabsBy: ToggleTabsEvent.Click
})