import { isNullOrWhiteSpaces } from "./general.js";
export default class SidebarMenu {
    constructor(arg) {
        if (isNullOrWhiteSpaces(arg.selectorOfSidebars, arg.selectorOfSidebarButtons))
            throw '[SIDEBAR] Some selector is null or white spaces!';
        this.sidebarButtons = document.querySelectorAll(arg.selectorOfSidebarButtons);
        for (let sidebarBtn of this.sidebarButtons) {
            sidebarBtn.addEventListener('click', () => this.toggleSidebar(sidebarBtn));
        }
    }
    toggleSidebar(eventButton) {
        let sidebar = document.getElementById(eventButton.dataset.openSidebar);
        eventButton.classList.toggle(SidebarMenu.buttonsActiveClass);
        sidebar.classList.toggle(SidebarMenu.sidebarsActiveClass);
    }
}
SidebarMenu.sidebarsActiveClass = 'active';
SidebarMenu.buttonsActiveClass = 'active';
