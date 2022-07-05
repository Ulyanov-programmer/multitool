import { elementIsExistWithLog } from "./general.js";
export default class Filter {
  constructor(arg) {
    if (!elementIsExistWithLog("Filter", arg.filtButtonsSelector, arg.filtElementsSelector))
      return;
    this.filterButtons = document.querySelectorAll(arg.filtButtonsSelector);
    this.filterContentElements = document.querySelectorAll(arg.filtElementsSelector);
    for (let filtButton of this.filterButtons) {
      filtButton.addEventListener("click", () => {
        this.filtContentByType(filtButton, this.filterContentElements);
      });
    }
  }
  filtContentByType(filterButton, filterContentElements) {
    let typeOfContent = filterButton.dataset.filtContent;
    for (let filtElement of filterContentElements) {
      if (typeOfContent == "all" || filtElement.dataset.contentType.includes(typeOfContent)) {
        filtElement.style.display = "";
      } else {
        filtElement.style.display = "none";
      }
    }
    for (let btn of this.filterButtons) {
      btn == filterButton ? btn.classList.add("active") : btn.classList.remove("active");
    }
  }
}
