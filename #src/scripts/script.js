'use strict'

let doc = document;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;


// ? If you see an error here, it's normal.
@@include('_modalWindow.js');
@@include('_fsNavmenu.js');
@@include('_spoiler.js');
@@include('_elementMenu.js');
@@include('_sliders.js');


function showOrHideSubmenu(e) {
  const menuButton = e.target;
  const allSubmenu = doc.querySelectorAll('.navmenu__submenu');
  const allMenuButtons = doc.querySelectorAll('.submenu-open-button');

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
const activateSubmenuButtons = doc.querySelectorAll('.submenu-open-button');
for (let submenuButton of activateSubmenuButtons) {
  submenuButton.addEventListener('click', showOrHideSubmenu);
}

// ? Use this if you have scroll buttons.
function scrollToElement(eventData) {
  let scrollElement = doc.querySelector(`.${eventData.target.dataset.scrollTo}`);

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
let scrollButtons = doc.querySelectorAll('[data-scroll-to]');
for (let scrollButton of scrollButtons) {
  scrollButton.addEventListener('click', scrollToElement);
}


function headerToFixed(e) {
  // Calculating the degree of scrolling in pixels,
  // multiply the innerWindowHeight by the desired scrolling percentage as 0.percent.
  // Example:
  //  25 percent of innerWindowHeight = innerWindowHeight * 0.25
  //  5 percent of 700 = 700 * 0.05

  var scrollPercentage = innerWindowHeight * 0.15;

  if (pageYOffset > scrollPercentage) {
    burger.classList.add('burger-black');
    header.classList.add('fixed-header');
  } else {
    burger.classList.remove('burger-black');
    header.classList.remove('fixed-header');
  }
}
const header = doc.querySelector('.header__body');
window.addEventListener('scroll', headerToFixed);
