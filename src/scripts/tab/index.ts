import Tab, { ToggleTabsEvent } from './tab.src.js'

new Tab({
  btnsSelector: '.tab__btn_1',
  contentBlocksSelector: '.tab__item_1',
  fadeEffect: true,
  buttonsActiveClass: 'active',
  contentActiveClass: 'active',
  autoHeight: true,
  animationDuration: 500,
  toggleTabsBy: ToggleTabsEvent.Click
})