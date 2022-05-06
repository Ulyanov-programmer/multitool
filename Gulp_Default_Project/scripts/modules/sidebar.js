import { elementIsExistWithLog } from "./general.js";
export default class SidebarMenu {
    constructor(arg) {
        if (!elementIsExistWithLog('SidebarMenu', arg.selectorOfSidebars, arg.selectorOfSidebarButtons)) {
            return;
        }
        this.sidebarButtons = document.querySelectorAll(arg.selectorOfSidebarButtons);
        SidebarMenu.swipeArea = document.querySelector(arg.swipeAreaSelector);
        for (let sidebarBtn of this.sidebarButtons) {
            sidebarBtn.addEventListener('click', () => this.toggleSidebar(sidebarBtn));
        }
    }
    toggleSidebar(eventButton) {
        let sidebar = document.getElementById(eventButton.dataset.openSidebar);
        eventButton.classList.toggle(SidebarMenu.buttonsActiveClass);
        sidebar.classList.toggle(SidebarMenu.sidebarsActiveClass);
        SidebarMenu.swipeArea.classList.toggle('active');
    }
}
SidebarMenu.sidebarsActiveClass = 'active';
SidebarMenu.buttonsActiveClass = 'active';
