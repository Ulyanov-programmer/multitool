export default class SidebarMenu {
  sidebars;
  sidebarButtons;

  constructor(selectorOfSidebars, selectorOfSidebarButtons) {
    if (selectorOfSidebars && selectorOfSidebarButtons) {

      this.sidebars = document.querySelectorAll(selectorOfSidebars);
      this.sidebarButtons = document.querySelectorAll(selectorOfSidebarButtons);

      for (const sidebarBtn of this.sidebarButtons) {
        sidebarBtn.addEventListener('click', () => {
          this.toggleSidebar(sidebarBtn);
        });
      }
    } else {
      throw '[SIDEBAR] Length of sidebar elements must be more than zero.'
    }
  }

  toggleSidebar(eventButton) {
    let parentSidebar = document.getElementById(eventButton.dataset.openSidebar);
    eventButton.classList.toggle('active');
    parentSidebar.classList.toggle('active');
  }
}

