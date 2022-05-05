import SidebarMenu from './modules/sidebar.js';
new SidebarMenu({
    selectorOfSidebars: '.sidebar',
    selectorOfSidebarButtons: '[data-open-sidebar]',
    // swipeAreaSelector: '.swipe_window__swipe_area'
});
SidebarMenu.sidebarsActiveClass = 'active';
SidebarMenu.buttonsActiveClass = 'active';
