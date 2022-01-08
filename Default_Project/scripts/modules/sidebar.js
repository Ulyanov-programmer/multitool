import { isNullOrWhiteSpaces } from "./general.js";
export default class SidebarMenu {
    constructor(selectorOfSidebars, selectorOfSidebarButtons) {
        if (isNullOrWhiteSpaces(selectorOfSidebars, selectorOfSidebarButtons)) {
            throw '[SIDEBAR] Incorrect arguments!';
        }
        this.sidebars = document.querySelectorAll(selectorOfSidebars);
        this.sidebarButtons = document.querySelectorAll(selectorOfSidebarButtons);
        for (const sidebarBtn of this.sidebarButtons) {
            sidebarBtn.addEventListener('click', () => {
                this.toggleSidebar(sidebarBtn);
            });
        }
    }
    toggleSidebar(eventButton) {
        let parentSidebar = document.getElementById(eventButton.dataset.openSidebar);
        eventButton.classList.toggle('active');
        parentSidebar.classList.toggle('active');
    }
}
