//? If you are making a multi-page site, i recommend dividing the contents of this file
//? into several parts and connecting them to each page separately.

//? Also, TSDoc is used here, so read the tips. Try hover on some constructor.

// fsnavmenu //
import FsNavmenu from './modules/fsNavmenu.js';

new FsNavmenu(
  '#burgerButton',
  '.fullscreen-navmenu',
);

// spoiler //
import SpoilerMenu from './modules/spoiler.js';

new SpoilerMenu(
  '.uspoiler-btn',
  '.uspoiler-content',
  2560,
  500,
);

// filter //
import Filter from './modules/filter.js';

/*
  For working add data-attributes [ data-filt-content="type" ] for filter buttons,
  And [ data-content-type="type" ] for content-blocks.

  When you press the filter__button, all elements that do not have 
  a value similar to the filter__button attribute value will be hidden.
  To reset the filter through a filter__button, 
  you should use the 'all' value for the filter__button attribute.

  In theory, you can declare multiple filters to work separately. 
  But at the moment this functionality has not been tested in practice.
*/
let filter = new Filter(
  '.filter__button',
  '.filter__item',
);
// modal window //
import ModalWindowMenu from './modules/modalWindow.js';

/*
  It works like this:
  Finds all elements that contain data-modal-link and .modal-closer.
  The first ones trigger the event of opening the modal window, the second ones close it.
  After clicking on one of these elements, 
  it looks for a block with a name inside data-modal-link and gives it the "active" class.

  Also, when pressed, turns off the scrolling body.
*/
new ModalWindowMenu(
  // i recommend this value.
  '[data-modal-link]',
  '.modal-closer',
  '.fullscreen-navmenu',
  0.5
);

// element-modal //
import ElementModal from './modules/elementMenu.js';

/*
  It works like this:
  When hovering over a contentElement, 
  clones the modalElement and places it absolutely above the contentElement.
  Moving the mouse away from the contentElement deletes the pasted modalElement copy.
*/
let elementMenu1 = new ElementModal(
  '.el-menu__item',
  '.el-menu__menu',
  300,
)

// scroll-elements //
import ScrollElement from './modules/scrollToElement.js';

/*
  Use if you want to use buttons for scrolling.
  How it works? 
  When you press a scrollButton, you scroll to the block 
  indicated in data-scroll-to attribute of this scrollButton.
*/
let scrollElement = new ScrollElement(
  // I recommend use this value.
  '[data-scroll-to]',

  // '.fixed-header',
)

// sidebar //
import SidebarMenu from './modules/sidebar.js';

new SidebarMenu(
  '.sidebar',
  '.sidebar__show-btn',
)

// sliders //
// You can set your sliders in sliders.js. Try Ctrl + P.
//? Remove this strings if you don't need sliders
import * as sliders from './sliders.js';
let s = sliders

// element-modal //
import Accordion from './modules/accord.js';

let someAccrod = new Accordion(
  '.accordion__btn',
  '.accordion__item',
  500
)

// parallax //
import { Parallax, ParallaxElement} from './modules/parallax.js';

let someParallaxMenu = new Parallax(
  '.fullscreen__body',
  new ParallaxElement(
    '.fullscreen__bg-img', 5),
  
  /* another variant 
  new ParallaxElement(
    document.querySelector<HTMLElement>(
      '.fullscreen__bg-img'), 5),
  */
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
