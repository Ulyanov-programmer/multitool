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
      console.log("[SpoilerMenu] The count of buttons and content-elements must be equal.");
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
          _SpoilerMenu.spoilerContentElements[i].hidden = false;
        } else {
          _SpoilerMenu.spoilerContentElements[i].hidden = true;
        }
        _SpoilerMenu.spoilerButtons[i].addEventListener("click", _SpoilerMenu.toggleSpoilerState);
        _SpoilerMenu.spoilerButtons[i].style.cursor = "pointer";
      }
    } else {
      for (let i = 0; i < _SpoilerMenu.spoilerContentElements.length; i++) {
        _SpoilerMenu.spoilerContentElements[i].hidden = false;
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
function spoilerUp(spoilerContainer, duration) {
  if (spoilerContainer.classList.contains("_slide") === false) {
    spoilerContainer.classList.add("_slide");
    let containerStyle = spoilerContainer.style;
    containerStyle.transitionProperty = "height, margin, padding";
    containerStyle.transitionDuration = duration + "ms";
    containerStyle.height = spoilerContainer.clientHeight + "px";
    spoilerContainer.clientHeight;
    containerStyle.overflow = "hidden";
    containerStyle.height = "0";
    containerStyle.paddingTop = "0";
    containerStyle.paddingBottom = "0";
    containerStyle.marginTop = "0";
    containerStyle.marginBottom = "0";
    window.setTimeout(() => {
      spoilerContainer.hidden = true;
      containerStyle.removeProperty("height");
      containerStyle.removeProperty("padding-top");
      containerStyle.removeProperty("padding-bottom");
      containerStyle.removeProperty("margin-top");
      containerStyle.removeProperty("margin-bottom");
      containerStyle.removeProperty("overflow");
      containerStyle.removeProperty("transition-duration");
      containerStyle.removeProperty("transition-property");
      spoilerContainer.classList.remove("_slide");
    }, duration);
  }
}
function spoilerDown(spoilerContainer, duration) {
  if (spoilerContainer.classList.contains("_slide") === false) {
    spoilerContainer.classList.add("_slide");
    if (spoilerContainer.hidden) {
      spoilerContainer.hidden = false;
    }
    let containerStyle = spoilerContainer.style;
    let height = spoilerContainer.clientHeight;
    containerStyle.overflow = "hidden";
    containerStyle.height = "0";
    containerStyle.paddingTop = "0";
    containerStyle.paddingBottom = "0";
    containerStyle.marginTop = "0";
    containerStyle.marginBottom = "0";
    spoilerContainer.clientHeight;
    containerStyle.transitionProperty = "height, margin, padding";
    containerStyle.transitionDuration = duration + "ms";
    containerStyle.height = height + "px";
    containerStyle.removeProperty("padding-top");
    containerStyle.removeProperty("padding-bottom");
    containerStyle.removeProperty("margin-top");
    containerStyle.removeProperty("margin-bottom");
    window.setTimeout(() => {
      containerStyle.removeProperty("height");
      containerStyle.removeProperty("overflow");
      containerStyle.removeProperty("transition-duration");
      containerStyle.removeProperty("transition-property");
      spoilerContainer.classList.remove("_slide");
    }, duration);
  }
}
function toggleSpoilerAnimation(spoilerContainer, duration) {
  if (spoilerContainer.hidden) {
    return spoilerDown(spoilerContainer, duration);
  } else {
    return spoilerUp(spoilerContainer, duration);
  }
}
