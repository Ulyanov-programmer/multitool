import SpoilerMenu from "./modules/spoiler.js";
new SpoilerMenu({
  btnsSelector: ".spoiler_btn",
  contentBlocksSelector: ".spoiler_content",
  maxWorkWidth: 5e3,
  animationDuration: 300,
  buttonActiveClass: "active",
  contentActiveClass: "active"
});
