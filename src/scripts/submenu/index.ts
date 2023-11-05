import Submenu, { SubmenuElementGroup, SubmenuOpenEvents } from './submenu.src.js'

new Submenu(
  { menuActiveClass: 'show', buttonActiveClass: 'active', disableOnEsc: true },

  new SubmenuElementGroup({
    buttonsSelector: '[data-submenu-button]',
    menusSelector: '[data-submenu]',
    openEvent: SubmenuOpenEvents.Click,
  }),
)