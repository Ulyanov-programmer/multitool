// sidebar //
import SidebarMenu from './modules/sidebar.js';
new SidebarMenu({
    selectorOfSidebars: '.sidebar',
    selectorOfSidebarButtons: '[data-open-sidebar]',
});
SidebarMenu.sidebarsActiveClass = 'active';
SidebarMenu.buttonsActiveClass = 'active';
//? your scripts //
