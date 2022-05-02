import Submenu, { SubmenuElementGroup, SubmenuOpenIvents } from './modules/submenu.js';

new Submenu(
	{ menuActiveClass: 'show', buttonActiveClass: 'active', disableOnEsc: true},

	new SubmenuElementGroup({
		openIvent: SubmenuOpenIvents.Hover,
		buttonsSelector: '.demo-submenu__hover_button',
		menusSelector: '.demo-submenu__hover_ul',
	}),
	new SubmenuElementGroup({
		openIvent: SubmenuOpenIvents.Click,
		buttonsSelector: '.demo-submenu__click_button',
		menusSelector: '.demo-submenu__click_ul',
	}),
)