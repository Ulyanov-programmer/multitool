import SidebarMenu from "./modules/sidebar.js";
new SidebarMenu({
  selectorOfSidebars: ".sidebar",
  selectorOfSidebarButtons: "[data-open-sidebar]",
  buttonsActiveClass: "active",
  sidebarsActiveClass: "active"
});
