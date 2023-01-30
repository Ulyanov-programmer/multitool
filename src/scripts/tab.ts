import Tab, { ToggleTabsEvent } from './modules/tab.src.js'

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
new Tab({
  btnsSelector: '.tab__btn_2',
  contentBlocksSelector: '.tab__item_2',
  fadeEffect: false,
  buttonsActiveClass: 'active',
  contentActiveClass: 'active',
  autoHeight: true,
  animationDuration: 500,
  toggleTabsBy: ToggleTabsEvent.Hover
})