import { isNullOrWhiteSpaces, returnScrollbarWidth } from "./general.js";
let body = document.body;
export default class ModalWindowMenu {
    constructor(modalLinksSelector, modalClosersSelector, fsMenuSelector) {
        if (isNullOrWhiteSpaces(modalLinksSelector, modalClosersSelector, fsMenuSelector)) {
            throw new Error('[MODALWINDOW] Incorrect arguments!');
        }
        ModalWindowMenu.fsMenuClasslist = document.querySelector(fsMenuSelector).classList;
        ModalWindowMenu.modalLinks = document.querySelectorAll(modalLinksSelector);
        for (let modalLink of ModalWindowMenu.modalLinks) {
            modalLink.addEventListener("click", () => {
                let popupId = modalLink.dataset.modalLink;
                if (popupId !== undefined) {
                    let modal = document.getElementById(popupId);
                    this.showOrHideModal(modal);
                }
            });
        }
        ModalWindowMenu.modalClosers = document.querySelectorAll(modalClosersSelector);
        for (const modalCloser of ModalWindowMenu.modalClosers) {
            modalCloser.addEventListener("click", () => {
                this.closeModal(modalCloser.closest('.modal-window'), true);
            });
        }
        document.addEventListener('keydown', (key) => {
            let keyCode = key.code;
            if (keyCode === 'Escape') {
                let activeModal = document.querySelector('.modal-window.active');
                this.closeModal(activeModal, true);
            }
        });
    }
    showOrHideModal(modalElement) {
        if (modalElement && ModalWindowMenu.UNLOCK) {
            let activeModal = document.querySelector('.modal-window.active');
            activeModal ? this.closeModal(activeModal, false) : this.toggleBodyScroll(false);
            modalElement.classList.add("active");
        }
        modalElement.addEventListener("click", (e) => {
            // Checks if the pressed element has a CONTENT parent, if not, closes the modal.
            if (!e.target.closest('.modal-window__content')) {
                this.closeModal(modalElement, true);
            }
        });
    }
    closeModal(modalWindow, bodyIsScrollable) {
        if (ModalWindowMenu.UNLOCK) {
            modalWindow.classList.remove("active");
            setTimeout(() => {
                if (bodyIsScrollable) {
                    this.toggleBodyScroll(true);
                }
            }, transitionTimeout * 1000);
        }
    }
    toggleBodyScroll(toggleScrollOn) {
        if (toggleScrollOn && !ModalWindowMenu.fsMenuClasslist.contains('active')) {
            body.style.paddingRight = '0';
            body.classList.remove("scroll-block");
        }
        else {
            body.style.paddingRight = returnScrollbarWidth() + 'px';
            body.classList.add('scroll-block');
        }
        ModalWindowMenu.UNLOCK = false;
        // Prevents a new window from opening too quickly.
        setTimeout(() => {
            ModalWindowMenu.UNLOCK = true;
        }, transitionTimeout * 1000);
    }
}
// This is to prevent the new modal from opening too quickly.
ModalWindowMenu.UNLOCK = true;
// Transition time FROM modal window style (in seconds or .number).
const transitionTimeout = 0.5;
