import BurgerMenu from "./modules/burgerMenu.js";
new BurgerMenu({
  burgerSelector: "#burgerButton",
  burgerMenuSelector: ".burger-menu",
  buttonsSelector: ".fs-element",
  autoPadding: true,
  menuActiveClass: "active",
  burgerActiveClass: "active"
});
