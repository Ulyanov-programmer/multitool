import BurgerMenu from './modules/burgerMenu.js';
new BurgerMenu({
    burgerSelector: '#burgerButton',
    fsNavmenuSelector: '.fullscreen-navmenu',
    buttonsSelector: '.fs-element',
    autoPadding: true,
});
BurgerMenu.fsNavmenuActiveClass = 'active';
BurgerMenu.burgerActiveClass = 'active';