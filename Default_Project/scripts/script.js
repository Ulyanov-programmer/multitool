'use strict'

let doc = document;
let innerWindowWidth = () => window.innerWidth;
let innerWindowHeight = () => window.innerHeight;


// ? If you see an error here, it's normal.
// Variables for work modal window 
// ! I don`t recommend to use references for open and close modal windows.

let body = document.body;

let modalLinks = doc.querySelectorAll('[data-modal-link]');

for (let modalLink of modalLinks) {
  modalLink.addEventListener("click", () => {
    let popupId = modalLink.dataset.modalLink;

    if (popupId !== undefined) {
      let modal = doc.getElementById(popupId);
      showOrHideModal(modal);
    }
  });
}

let modalClosers = doc.querySelectorAll('.modal-closer');

for (const modalCloser of modalClosers) {
  modalCloser.addEventListener("click", () => {
    closeModal(modalCloser.closest('.modal-window'), true);
  });
}


// When the body loses scrolling, the page may shift.
// To fix this, it will be padded in the size of the scrollbar.
function returnScrollbarWidth() {
  let scrollbarWidth = innerWindowWidth() - doc.querySelector('html').clientWidth;

  return scrollbarWidth;
}

// This is to prevent the new modal from opening too quickly.
let unlock = true;

// Transition time FROM modal window style (in seconds or .number).
const transitionTimeout = 0.5;


function showOrHideModal(modalElement) {
  if (modalElement && unlock) {
    let activeModal = doc.querySelector('.modal-window.active');

    if (activeModal) {
      closeModal(activeModal, false);
    } else {
      toggleBodyScroll(false);
    }

    modalElement.classList.add("active");
  }
  modalElement.addEventListener("click", (e) => {

    // Checks if the pressed element has a CONTENT parent, if not, closes the modal.
    if (!e.target.closest('.modal-window__content')) {
      closeModal(modalElement, true);
    }
  })
}

function closeModal(modalWindow, bodyIsScrollable) {
  if (unlock) {
    modalWindow.classList.remove("active");

    if (bodyIsScrollable) {
      toggleBodyScroll(true);
    }
  }
}
function toggleBodyScroll(toggleScrollOn) {

  if (toggleScrollOn && fsMenuIsActive === false) {
    body.style.paddingRight = 0;
    body.classList.remove("fixed");
  } else {
    body.style.paddingRight = returnScrollbarWidth() + 'px';
    body.classList.add('fixed');
  }

  unlock = false;
  // Prevents a new window from opening too quickly.
  setTimeout(() => {
    unlock = true;
  }, transitionTimeout * 1000);
}

doc.addEventListener('keydown', (key) => {

  if (key.code === 'Escape') {
    let activeModal = doc.querySelector('.modal-window.active');
    closeModal(activeModal, true);
  }
});

;
function showOrHideFullscreenNav(e) {
  const fsNavmenu = doc.querySelector('.fullscreen-navmenu');
  let sbWidth = innerWindowWidth() - doc.querySelector('html').clientWidth;
  let header = doc.querySelector('header');

  if (fsNavmenu !== undefined) {
    burger.classList.toggle('active');

    body.classList.toggle('fixed');
    body.style.paddingRight = sbWidth + 'px';

    header.classList.toggle('fixed-header');
    header.style.paddingRight = sbWidth + 'px';

    fsNavmenu.classList.toggle('active');
    fsMenuIsActive = !fsMenuIsActive;
  }
}
const burger = doc.getElementById('burgerButton');
burger.addEventListener('click', showOrHideFullscreenNav);

let fsMenuIsActive = false;;
let spoilerButtons = doc.querySelectorAll('[data-spoiler-button]');
let spoilerContentElements = doc.querySelectorAll('[data-spoiler-content]');

function toggleToSpoilers(e) {
  if (spoilerContentElements.length > 0 &&
    spoilerButtons.length == spoilerContentElements.length) {
    for (let i = 0; i < spoilerContentElements.length; i++) {

      if (window.innerWidth <= 900) {
        spoilerContentElements[i].classList.add('spoiler-content');
        spoilerContentElements[i].hidden = true;
        spoilerButtons[i].classList.add('spoiler-button');
      } else {
        spoilerContentElements[i].classList.remove('spoiler-content');
        spoilerContentElements[i].hidden = false;
        spoilerButtons[i].classList.remove('spoiler-button');
      }
    }

    for (let spoilerButton of spoilerButtons) {
      spoilerButton.addEventListener('click', toggleSpoilerState);
    }
  }
}

function toggleSpoilerState(event) {
  let targetSpoilerButton = event.target;
  let spoilerContainer = targetSpoilerButton.nextElementSibling;
  let animationDuration = 500;

  if (spoilerContainer.classList.contains('_slide') === false) {
    toggleSpoilerAnimation(spoilerContainer, animationDuration);
    targetSpoilerButton.classList.toggle('active');
    spoilerContainer.classList.toggle('active');
  }
}

// Determines spoilers when the page is loaded and when it is resized.
toggleToSpoilers();
window.addEventListener(`resize`, toggleToSpoilers);

function spoilerUp(spoilerContainer, duration) {
  if (spoilerContainer.classList.contains('_slide') === false) {
    spoilerContainer.classList.add('_slide');
    let containerStyle = spoilerContainer.style;

    containerStyle.transitionProperty = 'height, margin, padding';
    containerStyle.transitionDuration = duration + 'ms';
    containerStyle.height = spoilerContainer.clientHeight + 'px';
    spoilerContainer.clientHeight;
    containerStyle.overflow = 'hidden';
    containerStyle.height = 0;
    containerStyle.paddingTop = 0;
    containerStyle.paddingBottom = 0;
    containerStyle.marginTop = 0;
    containerStyle.marginBottom = 0;

    window.setTimeout(() => {
      spoilerContainer.hidden = true;
      containerStyle.removeProperty('height');
      containerStyle.removeProperty('padding-top');
      containerStyle.removeProperty('padding-bottom');
      containerStyle.removeProperty('margin-top');
      containerStyle.removeProperty('margin-bottom');
      containerStyle.removeProperty('overflow');
      containerStyle.removeProperty('transition-duration');
      containerStyle.removeProperty('transition-property');
      spoilerContainer.classList.remove('_slide');
    }, duration);
  }
}
function spoilerDown(spoilerContainer, duration) {
  if (spoilerContainer.classList.contains('_slide') === false) {
    spoilerContainer.classList.add('_slide');

    if (spoilerContainer.hidden) {
      spoilerContainer.hidden = false;
    }
    let containerStyle = spoilerContainer.style;
    let height = spoilerContainer.clientHeight;

    containerStyle.overflow = 'hidden';
    containerStyle.height = 0;
    containerStyle.paddingTop = 0;
    containerStyle.paddingBottom = 0;
    containerStyle.marginTop = 0;
    containerStyle.marginBottom = 0;
    spoilerContainer.clientHeight;

    containerStyle.transitionProperty = 'height, margin, padding';
    containerStyle.transitionDuration = duration + 'ms';
    containerStyle.height = height + 'px';
    containerStyle.removeProperty('padding-top');
    containerStyle.removeProperty('padding-bottom');
    containerStyle.removeProperty('margin-top');
    containerStyle.removeProperty('margin-bottom');

    window.setTimeout(() => {
      containerStyle.removeProperty('height');
      containerStyle.removeProperty('overflow');
      containerStyle.removeProperty('transition-duration');
      containerStyle.removeProperty('transition-property');
      spoilerContainer.classList.remove('_slide');
    }, duration);
  }
}
function toggleSpoilerAnimation(spoilerContainer, duration) {
  if (spoilerContainer.hidden) {
    return spoilerDown(spoilerContainer, duration);
  } else {
    return spoilerUp(spoilerContainer, duration);
  }
};
function appendModalMenu(e) {
  let targetContentPreview = e.currentTarget;
  let modalElementClone = modalElement.cloneNode(true);

  modalElementClone.classList.remove('_non-active');

  targetContentPreview.append(modalElementClone);
  setTimeout(() => {
    modalElementClone.classList.add('_active');
  }, 30)
}
function removeModalMenu(e) {
  // Try to get modal block.
  let modalMenu = e.currentTarget.lastElementChild;

  if (modalMenu.classList.contains("class")) {
    modalMenu.classList.remove("_active")
    setTimeout(() => {
      modalMenu.remove();
    }, 200)
  }
}
const contentElements = doc.querySelectorAll('.container-class');
const modalElement = doc.querySelector('.modal');;
const someSwiper = new Swiper('.swiper', {
  /*

  navigation: {
    nextEl: ".nextNavButton", prevEl: ".prevNavButton",
    disabledClass: 'unactive',
  },
  pagination: { 
    el: '.swiperPagination', 
    clickable: true, 
  },

  preloadImages: true,
  lazy: {
    loadOnTransitionStart: false,
    loadPrevnext: true,
  },

  autoplay:{
    delay: 3000,
    stopOnLastSlide: false,
  },

  Infinite scrolling.
    loop: false,

  Changes the slider settings based on the width of the screen.
    breakpoints: {
      when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },

  Changes the height of the slider in runtime depending on the height of the slides.
    autoHeight: true,
    slidesPerView: 1,

  If there are no more than one slides, the slider stops working.
    watchOverflow: true,
    direction: 'horizontal' or 'vertical',

  Indent between slides.
    spaceBetween: 150,

  Enable parallax effect.
    parallax: true,
  For working add and set attributes on elements in slide:
    data-swiper-parallax="0" (xRight)
    data-swiper-parallax-duration="1000" (in ms)

  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  }

  Thumbs construction:
    const demosSwiper = new Swiper('.demos', {
      spaceBetween: 15,
      slidesPerView: 6,
      watchOverflow: true,
    });

    const mainSwiper = new Swiper('.main', {
      watchOverflow: true,

      thumbs: {
        swiper: demosSwiper,
        slideThumbActiveClass: 'active',
      },
    });
  */
  // ! PLEASE TURN ME OFF IF YOU DO NOT NEED ME!
});
;


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
