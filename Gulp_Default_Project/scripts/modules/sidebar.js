import { isNullOrWhiteSpaces } from "./general.js";
export default class SidebarMenu {
    /**
     * Provides functionality for sidebar.
     *
     * @param selectorOfSidebars
     * Selector of sidebars. Should contain id of this sidebar.
     * @param selectorOfSidebarButtons
     * Selector for buttons that open some sidebar. Should contains data-open-sidebar='sidebarSelector'.
     *
     * @throws Some selector is null or white spaces -
     * This error will be printed to the console if some input argument are null or white spaces.
     */
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
