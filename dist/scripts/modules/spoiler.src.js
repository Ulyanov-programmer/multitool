import { elementIsExistWithLog } from "./general.js";
export default class SpoilerMenu {
  constructor(args) {
    if (!elementIsExistWithLog("SpoilerMenu", args.btnsSelector, args.contentBlocksSelector)) {
      return;
    } else if (args.maxWorkWidth < 0 || args.animationDuration < 0) {
      console.log("[SpoilerMenu] maxWorkWidth < 0 or animationDuration < 0!");
    }
    SpoilerMenu.spoilerButtons = document.querySelectorAll(args.btnsSelector);
    SpoilerMenu.spoilerContentElements = document.querySelectorAll(args.contentBlocksSelector);
    SpoilerMenu.btnActiveClass = args.buttonActiveClass ? args.buttonActiveClass : "active";
    SpoilerMenu.contentActiveClass = args.contentActiveClass ? args.contentActiveClass : "active";
    if (SpoilerMenu.spoilerButtons.length != SpoilerMenu.spoilerContentElements.length) {
      console.log("[SpoilerMenu] The count of buttons and content-elements is not equal!");
      return;
    }
    SpoilerMenu.spoilerVisibleWidth = args.maxWorkWidth;
    SpoilerMenu.animationDuration = args.animationDuration;
    this.toggleToSpoilers();
    window.addEventListener(`resize`, this.toggleToSpoilers);
  }
  toggleToSpoilers() {
    if (window.innerWidth <= SpoilerMenu.spoilerVisibleWidth) {
      for (let i = 0; i < SpoilerMenu.spoilerContentElements.length; i++) {
        if (SpoilerMenu.spoilerButtons[i].classList.contains(SpoilerMenu.btnActiveClass)) {
          SpoilerMenu.spoilerContentElements[i].style.removeProperty("height");
          SpoilerMenu.spoilerContentElements[i].style.height = SpoilerMenu.spoilerContentElements[i].clientHeight + "px";
          SpoilerMenu.spoilerContentElements[i].style.opacity = "1";
          SpoilerMenu.spoilerContentElements[i].style.pointerEvents = "all";
        } else {
          SpoilerMenu.spoilerContentElements[i].style.height = "0px";
          SpoilerMenu.spoilerContentElements[i].style.opacity = "0";
          SpoilerMenu.spoilerContentElements[i].style.pointerEvents = "none";
        }
        SpoilerMenu.spoilerContentElements[i].style.overflow = "hidden";
        SpoilerMenu.spoilerButtons[i].addEventListener("click", SpoilerMenu.toggleSpoilerState);
        SpoilerMenu.spoilerButtons[i].style.cursor = "pointer";
      }
    } else {
      for (let i = 0; i < SpoilerMenu.spoilerContentElements.length; i++) {
        SpoilerMenu.spoilerContentElements[i].style.removeProperty("height");
        SpoilerMenu.spoilerContentElements[i].style.removeProperty("opacity");
        SpoilerMenu.spoilerContentElements[i].style.removeProperty("pointer-events");
        SpoilerMenu.spoilerContentElements[i].style.removeProperty("overflow");
        SpoilerMenu.spoilerButtons[i].removeEventListener("click", SpoilerMenu.toggleSpoilerState);
        SpoilerMenu.spoilerButtons[i].style.cursor = "default";
      }
    }
  }
  static toggleSpoilerState(event) {
    let targetSpoilerButton = event.currentTarget;
    let spoilerContainer = targetSpoilerButton.nextElementSibling;
    if (spoilerContainer.classList.contains("_slide") === false) {
      toggleSpoilerAnimation(spoilerContainer, SpoilerMenu.animationDuration);
      targetSpoilerButton.classList.toggle(SpoilerMenu.btnActiveClass);
      spoilerContainer.classList.toggle(SpoilerMenu.contentActiveClass);
    }
  }
}
function canToggleSpoiler(spoilerContainer) {
  if (spoilerContainer.classList.contains("_slide")) {
    return false;
  } else {
    spoilerContainer.classList.add("_slide");
    return true;
  }
}
function spoilerUp(spoilerContainer, duration) {
  if (canToggleSpoiler(spoilerContainer) == false)
    return;
  spoilerContainer.style.transitionProperty = "height, opacity";
  spoilerContainer.style.transitionDuration = `${duration}ms`;
  spoilerContainer.style.height = "0px";
  spoilerContainer.style.opacity = "0";
  spoilerContainer.style.pointerEvents = "none";
  window.setTimeout(() => {
    spoilerContainer.classList.remove("_slide");
  }, duration);
}
function spoilerDown(spoilerContainer, duration) {
  if (canToggleSpoiler(spoilerContainer) == false)
    return;
  let heightOfContent = spoilerContainer.scrollHeight;
  spoilerContainer.style.transitionProperty = "height, opacity";
  spoilerContainer.style.transitionDuration = `${duration}ms`;
  spoilerContainer.style.height = `${heightOfContent}px`;
  spoilerContainer.style.opacity = "1";
  spoilerContainer.style.pointerEvents = "all";
  window.setTimeout(() => {
    spoilerContainer.classList.remove("_slide");
  }, duration);
}
function toggleSpoilerAnimation(spoilerContainer, duration) {
  if (spoilerContainer.style.height == "0px")
    spoilerDown(spoilerContainer, duration);
  else
    spoilerUp(spoilerContainer, duration);
}
