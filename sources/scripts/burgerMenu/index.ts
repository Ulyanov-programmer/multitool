import BurgerMenu, { autoPaddingOptions } from './burgerMenu.src.js'

new BurgerMenu({
  burgerSelector: '#burgerButton',
  burgerMenuSelector: '.BurgerMenu',
  buttonsSelector: '.BurgerMenu a, .BurgerMenu button',
  autoPadding: new autoPaddingOptions('.HEADER'),
  menuActiveClass: 'active',
  burgerActiveClass: 'active',
  closeMenuByClickOnElement: true,
}) 