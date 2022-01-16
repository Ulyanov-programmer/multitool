import{isNullOrWhiteSpaces,returnScrollbarWidth}from"./general.js";let body=document.body;export default class ModalWindowMenu{constructor(o,e,l,d){if(isNullOrWhiteSpaces(o,e,l))throw new Error("[MODALWINDOW] Incorrect arguments!");ModalWindowMenu.transitionTimeout=d,ModalWindowMenu.fsMenuClasslist=document.querySelector(l).classList,ModalWindowMenu.modalLinks=document.querySelectorAll(o);for(let t of ModalWindowMenu.modalLinks)t.addEventListener("click",(()=>{let o=t.dataset.modalLink;if(void 0!==o){let e=document.getElementById(o);this.showOrHideModal(e)}}));ModalWindowMenu.modalClosers=document.querySelectorAll(e);for(const t of ModalWindowMenu.modalClosers)t.addEventListener("click",(()=>{this.closeModal(t.closest(".modal-window"),!0)}));document.addEventListener("keydown",(o=>{if("Escape"===o.code){let o=document.querySelector(".modal-window.active");this.closeModal(o,!0)}}))}showOrHideModal(o){if(o&&ModalWindowMenu.UNLOCK){let e=document.querySelector(".modal-window.active");e?this.closeModal(e,!1):this.toggleBodyScroll(!1),o.classList.add("active")}o.addEventListener("click",(e=>{e.target.closest(".modal-window__content")||this.closeModal(o,!0)}))}closeModal(o,e){ModalWindowMenu.UNLOCK&&(o.classList.remove("active"),setTimeout((()=>{e&&this.toggleBodyScroll(!0)}),1e3*ModalWindowMenu.transitionTimeout))}toggleBodyScroll(o){o&&!ModalWindowMenu.fsMenuClasslist.contains("active")?(body.style.paddingRight="0",body.classList.remove("scroll-block")):(body.style.paddingRight=returnScrollbarWidth()+"px",body.classList.add("scroll-block")),ModalWindowMenu.UNLOCK=!1,setTimeout((()=>{ModalWindowMenu.UNLOCK=!0}),1e3*ModalWindowMenu.transitionTimeout)}}ModalWindowMenu.UNLOCK=!0;