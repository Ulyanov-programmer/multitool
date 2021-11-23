import * as f from './modules/modalWindow.mjs';
import * as sliders from './modules/sliders.mjs';

// ! is mobile /\

// import IsMobile from './modules/isMobile.min.mjs';

// ! fsnavmenu /\

import FsNavmenu from './modules/fsNavmenu.min.mjs';
new FsNavmenu();

// ! spoiler /\

import SpoilerMenu from './modules/spoiler.min.mjs';
new SpoilerMenu();

// ! filter /\

// import Filter from './modules/filter.min.mjs';
// const filterButtons = document.querySelectorAll('[data-filt-content]');
// const filtElements = document.querySelectorAll('[data-content-type]');

// let filter = new Filter(filterButtons, filtElements);

// ! modal window /\

import ModalWindowMenu from './modules/modalWindow.min.mjs';
new ModalWindowMenu();

// ! GENERAL /\

function showOrHideSubmenu(e) {
  const menuButton = e.target;
  const allSubmenu = document.querySelectorAll('.navmenu__submenu');
  const allMenuButtons = document.querySelectorAll('.submenu-open-button');

  // Hides all previously active menus and menu buttons.
  for (let i = 0; i < allSubmenu.length; i++) {

    if (allSubmenu[i] !== menuButton.firstElementChild &&
      allMenuButtons[i] !== menuButton) {

      allMenuButtons[i].classList.remove('show');
      allSubmenu[i].classList.remove('show');
    }
  }

  if (menuButton.firstElementChild !== undefined) {
    menuButton.classList.toggle('active');
    menuButton.firstElementChild.classList.toggle('show');
  }
}
const activateSubmenuButtons = document.querySelectorAll('.submenu-open-button');
for (let submenuButton of activateSubmenuButtons) {
  submenuButton.addEventListener('click', showOrHideSubmenu);
}

// ? Use this if you have scroll buttons.
function scrollToElement(eventData) {
  let scrollElement = document.querySelector(`.${eventData.target.dataset.scrollTo}`);

  if (scrollElement !== undefined) {
    let scrolltop = window.pageYOffset + scrollElement.getBoundingClientRect().top;

    window.scrollTo({
      // If you are using a fixed header, subtract the value of the header height 
      // from the scroll value.
      top: scrolltop - 50,
      behavior: "smooth"
    });
  }
}
let scrollButtons = document.querySelectorAll('[data-scroll-to]');
for (let scrollButton of scrollButtons) {
  scrollButton.addEventListener('click', scrollToElement);
}
