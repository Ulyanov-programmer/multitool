//? If you are making a multi-page site, i recommend dividing the contents of this file
//? into several parts and connecting them to each page separately.
// fsnavmenu //
import FsNavmenu from './modules/fsNavmenu.js';
new FsNavmenu(
// burger Button Selector
'#burgerButton', 
// fs Navmenu Selector
'.fullscreen-navmenu');
// spoiler //
import SpoilerMenu from './modules/spoiler.js';
new SpoilerMenu(
// spoiler Buttons Selector
'.uspoiler-btn', 
// spoiler Content Blocks Selector
'.uspoiler-content', 
// As soon as the screen width is less than this width, 
// the spoiler(i.e. they will be given the spoiler classes).
2560, 
// animation Duration of spoilers, unless you want the spoilers to open and close too quickly.
// joke, this is a required parameter :3
500);
// filter //
import Filter from './modules/filter.js';
/*
? For working add data-attributes [ data-filt-content="type" ] for filter buttons,
? And [ data-content-type="type" ] for content-blocks.

In theory, you can declare multiple filters to work separately.
But at the moment this functionality has not been tested in practice.
*/
let filter = new Filter(
// filter Buttons Selector, should contain data-filt-content attribute.
'.filter__button', 
// filter Elements Selector, should contain data-content-type attribute.
'.filter__item');
// modal window //
import ModalWindowMenu from './modules/modalWindow.js';
/*
? It works like this:
* Finds all elements that contain data-modal-link and .modal-closer.
* The first ones trigger the event of opening the modal window, the second ones close it.
* After clicking on one of these elements,
 * it looks for a block with a name inside data-modal-link and gives it the "active" class.
Also, when pressed, turns off the scrolling body.
*/
new ModalWindowMenu();
// element-modal //
import ElementModal from './modules/elementMenu.js';
let elementMenu1 = new ElementModal(
/*
? It works like this:
* When hovering over a contentElement,
 * clones the modalElement and places it absolutely above the contentElement.
* Moving the mouse away from the contentElement deletes the pasted modalElement copy.
*/
// content Elements Selector
'.el-menu__item', 
// modal Element Selector
'.el-menu__menu', 
// animation Duration, unless you want the modal to open and close too quickly.
// joke, this is a required parameter :3
300);
// element-modal //
import ScrollElement from './modules/scrollToElement.js';
// scroll-elements //
/*
? Use this if you have scroll buttons.
How it works?
* When you press the scrollButton, you scroll to the block
 * indicated in data-scroll-to attribute of this button.
*/
let scrollElement = new ScrollElement(
// scroll Buttons Selector, should contain data-scroll-to attribute.
// I recommend use this value.
'[data-scroll-to]');
// sliders //
// You can set your sliders in sliders.js. Try Ctrl + P.
//? Remove this strings if you don't need sliders
import * as sliders from './sliders.js';
// gulp-typescript removes all unused modules 
let s = sliders;
// sidebar //
import SidebarMenu from './modules/sidebar.js';
new SidebarMenu(
// selector of Sidebar. Should contain id of this sidebar
'.sidebar', 
// selector for buttons that open the sidebar. Should contain data-open-sidebar="someSidebar"
// after clicking, they activate the "active" classes 
// for the sidebar and the button itself.
'.sidebar__show-btn');
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
