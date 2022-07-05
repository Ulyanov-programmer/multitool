import ScrollController from "./modules/scrollToElement.js";
new ScrollController({
  scrollButtonsSelector: "[data-scroll-to]",
  fixedElementSelector: ".fixed-header",
  scrollByAdressURL: true
});
