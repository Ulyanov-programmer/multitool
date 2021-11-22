// Variables for work modal window 
// ! I don`t recommend to use references for open and close modal windows.

let body = document.body;

let modalLinks = document.querySelectorAll('[data-modal-link]');

for (let modalLink of modalLinks) {
  modalLink.addEventListener("click", () => {
    let popupId = modalLink.dataset.modalLink;

    if (popupId !== undefined) {
      let modal = document.getElementById(popupId);
      showOrHideModal(modal);
    }
  });
}

let modalClosers = document.querySelectorAll('.modal-closer');

for (const modalCloser of modalClosers) {
  modalCloser.addEventListener("click", () => {
    closeModal(modalCloser.closest('.modal-window'), true);
  });
}


// When the body loses scrolling, the page may shift.
// To fix this, it will be padded in the size of the scrollbar.
function returnScrollbarWidth() {
  let scrollbarWidth = window.innerWidth - document.querySelector('html').clientWidth;

  return scrollbarWidth;
}

// This is to prevent the new modal from opening too quickly.
let unlock = true;

// Transition time FROM modal window style (in seconds or .number).
const transitionTimeout = 0.5;


function showOrHideModal(modalElement) {
  if (modalElement && unlock) {
    let activeModal = document.querySelector('.modal-window.active');

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
    body.classList.remove("scroll-block");
  } else {
    body.style.paddingRight = returnScrollbarWidth() + 'px';
    body.classList.add('scroll-block');
  }

  unlock = false;
  // Prevents a new window from opening too quickly.
  setTimeout(() => {
    unlock = true;
  }, transitionTimeout * 1000);
}

document.addEventListener('keydown', (key) => {

  if (key.code === 'Escape') {
    let activeModal = document.querySelector('.modal-window.active');
    closeModal(activeModal, true);
  }
});

