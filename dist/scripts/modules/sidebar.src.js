import { elementIsExistWithLog } from "./general.js";
import SwipeElement from "./swipe.src.js";
const _Sidebar = class {
  constructor(arg) {
    if (!elementIsExistWithLog("Sidebar", arg.selectorOfSidebar))
      return;
    this.sidebar = document.querySelector(arg.selectorOfSidebar);
    this.sidebarButton = document.querySelector(`[data-toggle-sidebar="${this.sidebar.id}"]`);
    _Sidebar.swipeArea = document.querySelector(`[data-swipe-element="${this.sidebar.id}"]`);
    _Sidebar.buttonActiveClass = arg.buttonActiveClass ? arg.buttonActiveClass : "active";
    _Sidebar.sidebarActiveClass = arg.sidebarActiveClass ? arg.sidebarActiveClass : "active";
    this.sidebarButton.addEventListener("click", () => this.toggleSidebar(this.sidebarButton));
    this.initializeSwipe(this.sidebar.id, arg.swipeElementOptions);
  }
  toggleSidebar(eventButton) {
    let sidebar = document.getElementById(eventButton.dataset.toggleSidebar);
    eventButton.classList.toggle(_Sidebar.buttonActiveClass);
    sidebar.classList.toggle(_Sidebar.sidebarActiveClass);
    _Sidebar.swipeArea.classList.toggle("active");
  }
  initializeSwipe(sidebarId, swipeElementOptions) {
    new SwipeElement({
      touchStartAreaSelector: `[data-swipe-element="${sidebarId}"]`,
      swipableElementSelector: `#${sidebarId}`,
      changePlane: swipeElementOptions.changePlane,
      swipeSensitivity: swipeElementOptions.swipeSensitivity,
      maxWorkWidth: swipeElementOptions.maxWorkWidth
    });
  }
};
let Sidebar = _Sidebar;
Sidebar.buttonActiveClass = "active";
export {
  Sidebar as default
};
