import { isNullOrWhiteSpaces } from "./general.js";
var SwipeSide = /* @__PURE__ */ ((SwipeSide2) => {
  SwipeSide2[SwipeSide2["Top"] = 0] = "Top";
  SwipeSide2[SwipeSide2["Left"] = 1] = "Left";
  SwipeSide2[SwipeSide2["Bottom"] = 2] = "Bottom";
  SwipeSide2[SwipeSide2["Right"] = 3] = "Right";
  return SwipeSide2;
})(SwipeSide || {});
export var ChangePlane = /* @__PURE__ */ ((ChangePlane2) => {
  ChangePlane2[ChangePlane2["ToLeft"] = 0] = "ToLeft";
  ChangePlane2[ChangePlane2["ToRight"] = 1] = "ToRight";
  ChangePlane2[ChangePlane2["ToTop"] = 2] = "ToTop";
  ChangePlane2[ChangePlane2["ToBottom"] = 3] = "ToBottom";
  return ChangePlane2;
})(ChangePlane || {});
var ChangeOrientation = /* @__PURE__ */ ((ChangeOrientation2) => {
  ChangeOrientation2[ChangeOrientation2["Vertical"] = 0] = "Vertical";
  ChangeOrientation2[ChangeOrientation2["Horizontal"] = 1] = "Horizontal";
  return ChangeOrientation2;
})(ChangeOrientation || {});
export default class SwipeElement {
  constructor(arg) {
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.pointerMoveHandler = function(e) {
      this.swipableElement.style.userSelect = "none";
      this.swipeMove(e);
    }.bind(this);
    this.pointerUpHandler = function() {
      this.swipableElement.style.userSelect = "";
      this.swipeEnd(0, false, true);
    }.bind(this);
    if (isNullOrWhiteSpaces(arg.touchStartAreaSelector, arg.swipableElementSelector))
      throw new Error("[SWIPE-ELEMENT Some selector is null or white spaces!]");
    window.addEventListener(`resize`, () => {
      this.checkMaxWorkWidth();
    });
    this.touchAreaElement = document.querySelector(arg.touchStartAreaSelector);
    this.touchAreaElement.style.touchAction = "none";
    this.swipableElement = document.querySelector(arg.swipableElementSelector);
    this.elementStartX = this.getTranslateState("x");
    this.elementStartY = this.getTranslateState("y");
    this.swipeSensitivity = arg.swipeSensitivity;
    this.maxWorkWidth = arg.maxWorkWidth;
    this.baseXStateModifier = this.checkBaseStateIsNegative("x") ? -1 : 1;
    this.baseYStateModifier = this.checkBaseStateIsNegative("y") ? -1 : 1;
    this.minSwipeWidth = Math.trunc(this.swipableElement.clientWidth * this.swipeSensitivity);
    this.minSwipeHeight = Math.trunc(this.swipableElement.clientHeight * this.swipeSensitivity);
    this.changePlane = arg.changePlane;
    if (this.changePlane == 0 /* ToLeft */ || this.changePlane == 1 /* ToRight */) {
      this.changeOrientation = 1 /* Horizontal */;
    } else {
      this.changeOrientation = 0 /* Vertical */;
    }
    this.checkMaxWorkWidth();
    this.touchAreaElement.addEventListener("pointerdown", (e) => {
      if (e.button != 0)
        return;
      this.swipeStart(e);
      window.addEventListener("pointermove", this.pointerMoveHandler, false);
      window.addEventListener("pointerup", this.pointerUpHandler, false);
    }, false);
  }
  swipeStart(e) {
    this.startX = e.clientX;
    this.startY = e.clientY;
  }
  swipeMove(e) {
    if (this.changeOrientation == 1 /* Horizontal */) {
      this.deltaX = this.startX - e.clientX;
      this.currentSide = this.deltaX >= 0 ? 1 /* Left */ : 3 /* Right */;
      this.deltaX = Math.abs(this.deltaX);
      this.moveX();
    } else if (this.changeOrientation == 0 /* Vertical */) {
      this.deltaY = this.startY - e.clientY;
      this.currentSide = this.deltaY >= 0 ? 0 /* Top */ : 2 /* Bottom */;
      this.deltaY = Math.abs(this.deltaY);
      this.moveY();
    }
  }
  swipeEnd(delta, changeTo, isSwipeEnd) {
    if (this.changeOrientation == 1 /* Horizontal */ && delta > this.minSwipeWidth || this.changeOrientation == 0 /* Vertical */ && delta > this.minSwipeHeight) {
      changeTo ? this.swipableElement.classList.add("active") : this.swipableElement.classList.remove("active");
      this.touchAreaElement.classList.toggle("active");
      this.swipableElement.style.transform = ``;
      window.removeEventListener("pointermove", this.pointerMoveHandler, false);
    }
    if (isSwipeEnd) {
      this.swipableElement.style.transform = ``;
      window.removeEventListener("pointermove", this.pointerMoveHandler, false);
    }
  }
  moveX(delta = this.deltaX) {
    if (!this.checkSwipableElementContainActive()) {
      if (this.changePlane == 0 /* ToLeft */ && this.currentSide == 3 /* Right */)
        return;
      if (this.changePlane == 1 /* ToRight */ && this.currentSide == 1 /* Left */)
        return;
      let result = this.elementStartX - delta * this.baseXStateModifier;
      this.swipableElement.style.transform = `translate3d(
				${result}px, 
				${this.getTranslateState("Y")}px, 
				0)`;
      this.swipeEnd(delta, true);
    } else {
      if (this.changePlane == 0 /* ToLeft */ && this.currentSide == 1 /* Left */)
        return;
      if (this.changePlane == 1 /* ToRight */ && this.currentSide == 3 /* Right */)
        return;
      let operator = this.changePlane == 0 /* ToLeft */ ? "+" : "-";
      let result = `${operator}${delta}`;
      this.swipableElement.style.transform = `translate3d(
				${result}px,
				${this.getTranslateState("Y")}px, 
				0)`;
      this.swipeEnd(delta, false);
    }
  }
  moveY(delta = this.deltaY) {
    if (!this.checkSwipableElementContainActive()) {
      if (this.changePlane == 3 /* ToBottom */ && this.currentSide == 0 /* Top */)
        return;
      if (this.changePlane == 2 /* ToTop */ && this.currentSide == 2 /* Bottom */)
        return;
      let result = this.elementStartY - delta * this.baseYStateModifier;
      this.swipableElement.style.transform = `translate3d(
				${this.getTranslateState("x")}px, 
				${result}px, 
				0)`;
      this.swipeEnd(delta, true);
    } else {
      if (this.changePlane == 2 /* ToTop */ && this.currentSide == 0 /* Top */)
        return;
      if (this.changePlane == 3 /* ToBottom */ && this.currentSide == 2 /* Bottom */)
        return;
      let operator = this.changePlane == 3 /* ToBottom */ ? "-" : "+";
      let result = `${operator}${delta}`;
      this.swipableElement.style.transform = `translate3d(
				${this.getTranslateState("x")}px, 
				${result}px, 
				0)`;
      this.swipeEnd(delta, false);
    }
  }
  getTranslateState(xOrY = "x") {
    let valueIndex = xOrY == "x" ? 4 : 5;
    let state;
    try {
      state = parseInt(window.getComputedStyle(this.swipableElement).getPropertyValue("transform").match(/(-?[0-9\.]+)/g)[valueIndex]);
    } catch (error) {
      state = 0;
    }
    return state;
  }
  checkBaseStateIsNegative(xOrY = "x") {
    let translateX = this.getTranslateState(xOrY);
    let xStateIsNegative = translateX >= 0 ? false : true;
    return xStateIsNegative;
  }
  checkSwipableElementContainActive() {
    return this.swipableElement.classList.contains("active");
  }
  checkMaxWorkWidth() {
    if (window.innerWidth <= this.maxWorkWidth) {
      this.touchAreaElement.style.pointerEvents = "auto";
    } else {
      this.touchAreaElement.style.pointerEvents = "none";
    }
  }
}
