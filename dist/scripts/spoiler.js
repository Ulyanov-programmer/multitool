import SpoilerMenu from "./modules/spoiler.src.js";
new SpoilerMenu({
  btnsSelector: ".spoiler_btn",
  contentBlocksSelector: ".spoiler_content",
  maxWorkWidth: 1e4,
  animationDuration: 300,
  buttonActiveClass: "active",
  contentActiveClass: "active"
});
