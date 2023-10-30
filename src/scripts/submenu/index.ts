import Submenu, { SubmenuElementGroup, SubmenuOpenEvents } from './submenu.src.js'

new Submenu(
  { menuActiveClass: 'show', buttonActiveClass: 'active', disableOnEsc: true },

  new SubmenuElementGroup({
    buttonsSelector: '.submenu__click_button',
    menusSelector: '.submenu__click',
    openEvent: SubmenuOpenEvents.Click,
  }),
)