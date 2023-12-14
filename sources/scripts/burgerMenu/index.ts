import BurgerMenu, { AutoPaddingOptions } from './burgerMenu.src.js'

new BurgerMenu({
  burgerSelector: '#burgerButton',
  burgerMenuSelector: '.BurgerMenu',
  buttonsSelector: '.BurgerMenu a, .BurgerMenu button',

  autoPadding: new AutoPaddingOptions('.HEADER'),
  closeMenuByClickOnElement: true,

  menuActiveClass: 'active',
  burgerActiveClass: 'active',
}) 