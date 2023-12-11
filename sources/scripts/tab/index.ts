import Tab, { ToggleTabsEvent } from './tab.src.js'

new Tab({
  buttonsContainerSelector: '.tab__buttons',
  tabsContainerSelector: '.tab__items',

  fadeEffect: true,
  autoHeight: true,
  animationDuration: 500,
  toggleTabsBy: ToggleTabsEvent.Click,

  buttonActiveClass: 'active',
  tabActiveClass: 'active',
})