//? If you are making a multi-page site, i recommend dividing the contents of this file
//? into several parts and connecting them to each page separately.

// fsnavmenu //
import FsNavmenu from './modules/fsNavmenu.min.mjs';

new FsNavmenu(
  '#burgerButton',
  '.fullscreen-navmenu',
);

// spoiler //
import SpoilerMenu from './modules/spoiler.min.mjs';

new SpoilerMenu(
  '.uspoiler-btn',
  '.uspoiler-content',
  2560,
  500,
);

// filter //
import Filter from './modules/filter.min.mjs';

let filter = new Filter(
  '.filter__button',
  '.filter__item',
);

// modal window //
import ModalWindowMenu from './modules/modalWindow.min.mjs';

new ModalWindowMenu();

// element-modal //
import ElementModal from './modules/elementMenu.min.mjs';

let elementMenu1 = new ElementModal(
  '.el-menu__item',
  '.el-menu__menu',
  300,
)

// element-modal //
import ScrollElement from './modules/scrollToElement.min.mjs';

// scroll-elements //

//? Use this if you have scroll buttons.
let scrollElement = new ScrollElement(
  '[data-scroll-to]',

  // If you use a fixed header, enter its selector here 
  // so that its height is taken into account when scrolling.

  // '.fixed-header',
)

// spoilers //
import * as sliders from './sliders.js';

// sidebar //
import SidebarMenu from './modules/sidebar.min.mjs';

new SidebarMenu(
  '.sidebar',
  '.sidebar__show-btn',
)

//? general //

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
