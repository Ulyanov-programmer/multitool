import { elementIsExistWithLog } from "./general.js";
const _SidebarMenu = class {
  constructor(arg) {
    if (!elementIsExistWithLog("SidebarMenu", arg.selectorOfSidebars, arg.selectorOfSidebarButtons)) {
      return;
    }
    this.sidebarButtons = document.querySelectorAll(arg.selectorOfSidebarButtons);
    _SidebarMenu.swipeArea = document.querySelector(arg.swipeAreaSelector);
    if (arg.buttonsActiveClass)
      _SidebarMenu.buttonsActiveClass = arg.buttonsActiveClass;
    if (arg.sidebarsActiveClass)
      _SidebarMenu.sidebarsActiveClass = arg.sidebarsActiveClass;
    for (let sidebarBtn of this.sidebarButtons) {
      sidebarBtn.addEventListener("click", () => this.toggleSidebar(sidebarBtn));
    }
  }
  toggleSidebar(eventButton) {
    let sidebar = document.getElementById(eventButton.dataset.openSidebar);
    eventButton.classList.toggle(_SidebarMenu.buttonsActiveClass);
    sidebar.classList.toggle(_SidebarMenu.sidebarsActiveClass);
    _SidebarMenu.swipeArea.classList.toggle("active");
  }
};
let SidebarMenu = _SidebarMenu;
SidebarMenu.sidebarsActiveClass = "active";
SidebarMenu.buttonsActiveClass = "active";
export {
  SidebarMenu as default
};
