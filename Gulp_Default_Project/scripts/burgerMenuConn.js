import FsNavmenu from './modules/burgerMenu.js';
new FsNavmenu({
    burgerSelector: '#burgerButton',
    fsNavmenuSelector: '.fullscreen-navmenu',
    buttonsSelector: '.fs-element',
    autoPadding: true,
});
FsNavmenu.fsNavmenuActiveClass = 'active';
FsNavmenu.burgerActiveClass = 'active';
