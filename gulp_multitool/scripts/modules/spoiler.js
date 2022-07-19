import { elementIsExistWithLog } from "./general.js";
const _SpoilerMenu = class {
  constructor(args) {
    if (!elementIsExistWithLog("SpoilerMenu", args.btnsSelector, args.contentBlocksSelector)) {
      return;
    } else if (args.maxWorkWidth < 0 || args.animationDuration < 0) {
      console.log("[SpoilerMenu] maxWorkWidth < 0 or animationDuration < 0!");
    }
    _SpoilerMenu.spoilerButtons = document.querySelectorAll(args.btnsSelector);
    _SpoilerMenu.spoilerContentElements = document.querySelectorAll(args.contentBlocksSelector);
    if (args.buttonActiveClass)
      _SpoilerMenu.btnActiveClass = args.buttonActiveClass;
    if (args.contentActiveClass)
      _SpoilerMenu.contentActiveClass = args.contentActiveClass;
    if (_SpoilerMenu.spoilerButtons.length != _SpoilerMenu.spoilerContentElements.length) {
      console.log("[SpoilerMenu] The count of buttons and content-elements is not equal!");
      return;
    }
    _SpoilerMenu.spoilerVisibleWidth = args.maxWorkWidth;
    _SpoilerMenu.animationDuration = args.animationDuration;
    this.toggleToSpoilers();
    window.addEventListener(`resize`, this.toggleToSpoilers);
  }
  toggleToSpoilers() {
    if (window.innerWidth <= _SpoilerMenu.spoilerVisibleWidth) {
      for (let i = 0; i < _SpoilerMenu.spoilerContentElements.length; i++) {
        if (_SpoilerMenu.spoilerButtons[i].classList.contains(_SpoilerMenu.btnActiveClass)) {
          _SpoilerMenu.spoilerContentElements[i].style.removeProperty("height");
          _SpoilerMenu.spoilerContentElements[i].style.height = _SpoilerMenu.spoilerContentElements[i].clientHeight + "px";
          _SpoilerMenu.spoilerContentElements[i].style.opacity = "1";
          _SpoilerMenu.spoilerContentElements[i].style.pointerEvents = "all";
        } else {
          _SpoilerMenu.spoilerContentElements[i].style.height = "0px";
          _SpoilerMenu.spoilerContentElements[i].style.opacity = "0";
          _SpoilerMenu.spoilerContentElements[i].style.pointerEvents = "none";
        }
        _SpoilerMenu.spoilerContentElements[i].style.overflow = "hidden";
        _SpoilerMenu.spoilerButtons[i].addEventListener("click", _SpoilerMenu.toggleSpoilerState);
        _SpoilerMenu.spoilerButtons[i].style.cursor = "pointer";
      }
    } else {
      for (let i = 0; i < _SpoilerMenu.spoilerContentElements.length; i++) {
        _SpoilerMenu.spoilerContentElements[i].style.removeProperty("height");
        _SpoilerMenu.spoilerContentElements[i].style.removeProperty("opacity");
        _SpoilerMenu.spoilerContentElements[i].style.removeProperty("pointer-events");
        _SpoilerMenu.spoilerContentElements[i].style.removeProperty("overflow");
        _SpoilerMenu.spoilerButtons[i].removeEventListener("click", _SpoilerMenu.toggleSpoilerState);
        _SpoilerMenu.spoilerButtons[i].style.cursor = "default";
      }
    }
  }
  static toggleSpoilerState(event) {
    let targetSpoilerButton = event.currentTarget;
    let spoilerContainer = targetSpoilerButton.nextElementSibling;
    if (spoilerContainer.classList.contains("_slide") === false) {
      toggleSpoilerAnimation(spoilerContainer, _SpoilerMenu.animationDuration);
      targetSpoilerButton.classList.toggle(_SpoilerMenu.btnActiveClass);
      spoilerContainer.classList.toggle(_SpoilerMenu.contentActiveClass);
    }
  }
};
let SpoilerMenu = _SpoilerMenu;
SpoilerMenu.btnActiveClass = "active";
SpoilerMenu.contentActiveClass = "active";
export {
  SpoilerMenu as default
};
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
