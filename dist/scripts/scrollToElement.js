import ScrollController from "./modules/scrollToElement.src.js";
new ScrollController({
  scrollButtonsSelector: "[data-scroll-to]",
  fixedElementSelector: ".fixed-header",
  scrollByAdressURL: true
});
