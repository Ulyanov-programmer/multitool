import Tab, { ToggleTabsEvent } from './tab.src.js'

new Tab({
  buttonsContainerSelector: '.tabButtons',
  tabsContainerSelector: '.tabItems',

  fadeEffect: true,
  autoHeight: true,
  animationDuration: 500,
  toggleTabsBy: ToggleTabsEvent.Click,

  /* 
    ? Instead of using buttonActiveClass for styling, use the attribute aria-expanded, 
    for example: button[aria-expanded="true"]
  */

  /* 
   ? Instead of using tabActiveClass for styling, use the attribute aria-current, 
   for example: div[aria-current="true"]
  */
})