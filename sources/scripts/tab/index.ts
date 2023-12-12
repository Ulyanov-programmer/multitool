import Tab, { ToggleTabsEvent } from './tab.src.js'

new Tab({
  buttonsContainerSelector: '.tab__buttons',
  tabsContainerSelector: '.tab__items',

  fadeEffect: true,
  autoHeight: true,
  animationDuration: 500,
  toggleTabsBy: ToggleTabsEvent.Click,

  /* 
    ? It is recommended to use styling by attribute aria-expanded, 
    for example: button[aria-expanded="true"]
  */
  // buttonActiveClass: 'active',

  /* 
   ? It is recommended to use styling by attribute aria-current, 
   for example: div[aria-current="true"]
  */
  // tabActiveClass: 'active',
})