//? If you are making a multi-page site, i recommend dividing the contents of this file
//? into several parts and connecting them to each page separately.
//? Also, TSDoc is used here, so read the tips. Try hover on some property.
// sidebar //
import SidebarMenu from './modules/sidebar.js';
new SidebarMenu({
    selectorOfSidebars: '.sidebar',
    selectorOfSidebarButtons: '[data-open-sidebar]',
});
SidebarMenu.sidebarsActiveClass = 'active';
SidebarMenu.buttonsActiveClass = 'active';
//? your scripts //
