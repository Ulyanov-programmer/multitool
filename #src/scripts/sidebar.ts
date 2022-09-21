import SidebarMenu from './modules/sidebar.src.js'

new SidebarMenu({
	selectorOfSidebars: '.sidebar',
	selectorOfSidebarButtons: '[data-toggle-sidebar]',
	// swipeAreaSelector: '.swipe_window__swipe_area'
	buttonsActiveClass: 'active',
	sidebarsActiveClass: 'active',
})