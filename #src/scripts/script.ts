//? If you are making a multi-page site, i recommend dividing the contents of this file
//? into several parts and connecting them to each page separately.

//? Also, TSDoc is used here, so read the tips. Try hover on some constructor.

// fsnavmenu //
import FsNavmenu from './modules/fsNavmenu.js';

new FsNavmenu(
  '#burgerButton',
  '.fullscreen-navmenu',
  '.fs-element',
  true
)
FsNavmenu.fsNavmenuActiveClass = 'active'
FsNavmenu.burgerActiveClass = 'active'

// spoiler //
import SpoilerMenu from './modules/spoiler.js';

new SpoilerMenu(
  '.uspoiler-btn',
  '.uspoiler-content',
  5000,
  500,
)
SpoilerMenu.btnActiveClass = 'active'
SpoilerMenu.contentActiveClass = 'active'

// filter //
import Filter from './modules/filter.js';

/*
  For working add data-attributes [ data-filt-content="type" ] for filter buttons,
  And [ data-content-type="type" ] for content-blocks.

  When you press the filter__button, all elements that do not have 
  a value similar to the filter__button attribute value will be hidden.
  To reset the filter through a filter__button, 
  you should use the 'all' value for the filter__button attribute.

  You can declare multiple filters to work separately.
*/
let filter = new Filter(
  '.filter__button',
  '.filter__item',
)

// modal window //
import ModalWindowMenu from './modules/modalWindow.js';

/*
  It works like this:
  Finds all elements that contain data-modal-link and .modal-closer.
  The first ones trigger the event of opening the modal window, the second ones close it.
  After clicking on one of these elements, 
  it looks for a block with a name inside data-modal-link and gives it the "active" class.

  Also, when pressed, turns off the scrolling page.
*/
new ModalWindowMenu(
  '[data-modal-link]', // i recommend this value.
  '.modal-closer',
  500,
  '.fullscreen-navmenu',
)

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
  '[data-scroll-to]', // i recommend use this value.

  '.fixed-header',
)

// sidebar //
import SidebarMenu from './modules/sidebar.js';

new SidebarMenu(
  '.sidebar',
  '.sidebar__show-btn',
)
SidebarMenu.sidebarsActiveClass = 'active'
SidebarMenu.buttonsActiveClass = 'active'

// sliders //
// You can set your sliders in sliders.js. Try Ctrl + P.
//? Remove this strings if you don't need sliders
import * as sliders from './sliders.js';
let s = sliders

// accordion //
import Accordion from './modules/accord.js';

/* Attention, 
  the display property for inactive accordion elements
  does not allow them to be hidden.
  If you need to use it, set it via the active element class.
*/
let someAccrod = new Accordion(
  '.accordion__btn',
  '.accordion__item',
  500
)
someAccrod.buttonsActiveClass = 'active'
someAccrod.contentActiveClass = 'active'

// parallax //
import { Parallax, ParallaxElement } from './modules/parallax.js';

let someParallaxMenu = new Parallax(
  '.fullscreen__body',
  768,

  new ParallaxElement(
    '.parallax-text', 5),
  // another variant 
  // new ParallaxElement(
  //   document.querySelector<HTMLElement>('.fullscreen__bg-img'), 5),
)


// submenu //
import Submenu, { SubmenuElement } from './modules/submenu.js';

new Submenu(
  'show', 'active',
  new SubmenuElement(
    '.demo-submenu__button', 
    '.demo-submenu__ul',
  ),
  new SubmenuElement(
    '.demo-submenu__button-2',
    '.demo-submenu__ul-2',
  )
)

//? your scripts //
