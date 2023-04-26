import Submenu, { SubmenuElementGroup, SubmenuOpenEvents } from './modules/submenu.src.js'

new Submenu(
  { menuActiveClass: 'show', buttonActiveClass: 'active', disableOnEsc: true },

  new SubmenuElementGroup({
    openEvent: SubmenuOpenEvents.Hover,
    buttonsSelector: '.demo-submenu__hover_button',
    menusSelector: '.demo-submenu__hover',
  }),
  new SubmenuElementGroup({
    openEvent: SubmenuOpenEvents.Click,
    buttonsSelector: '.demo-submenu__click_button',
    menusSelector: '.demo-submenu__click',
  }),
)