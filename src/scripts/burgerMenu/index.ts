import BurgerMenu, { autoPaddingOptions } from './burgerMenu.src.js'

new BurgerMenu({
  burgerSelector: '#burgerButton',
  burgerMenuSelector: '.m-burger-menu',
  buttonsSelector: '.m-burger-menu .element',
  autoPadding: new autoPaddingOptions('.l-header'),
  menuActiveClass: 'active',
  burgerActiveClass: 'active',
  closeMenuByClickOnElement: true,
}) 