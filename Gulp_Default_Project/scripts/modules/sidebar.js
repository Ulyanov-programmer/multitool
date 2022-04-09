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
        let parentSidebar = document.getElementById(eventButton.dataset.openSidebar);
        eventButton.classList.toggle(SidebarMenu.buttonsActiveClass);
        parentSidebar.classList.toggle(SidebarMenu.sidebarsActiveClass);
    }
}
SidebarMenu.sidebarsActiveClass = 'active';
SidebarMenu.buttonsActiveClass = 'active';
