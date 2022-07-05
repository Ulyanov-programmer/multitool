import { elementsIsExist } from "./general.js";
const _AnimateByScroll = class {
  constructor(arg, ...elements) {
    this.activeAnimationClass = "active";
    _AnimateByScroll.repeatingAnimations = arg.repeatingAnimations;
    if (elements.length <= 0) {
      console.log("[AnimateByScroll] No elements have been created.");
      return;
    }
    if (arg.activeAnimationClass)
      this.activeAnimationClass = arg.activeAnimationClass;
    _AnimateByScroll.elements = elements;
    this.checkAndToggleAnimationForElements();
    for (let element of _AnimateByScroll.elements) {
      element.mediaQueries.length > 0 ? element.setMediaProperties() : false;
    }
    window.addEventListener("scroll", () => {
      this.checkAndToggleAnimationForElements();
    }, false);
    window.addEventListener("resize", () => {
      for (let element of _AnimateByScroll.elements) {
        element.setMediaProperties();
      }
    }, false);
  }
  checkAndToggleAnimationForElements() {
    window.requestAnimationFrame(() => {
      for (let animateElement of _AnimateByScroll.elements) {
        for (const animateHtml of animateElement.htmlElements) {
          if (this.isPartiallyVisible(animateElement, animateHtml) && !animateHtml.classList.contains(this.activeAnimationClass)) {
            setTimeout(() => {
              animateHtml.classList.add(this.activeAnimationClass);
            }, parseInt(animateHtml.dataset.timeout));
          } else if (!this.isPartiallyVisible(animateElement, animateHtml) && _AnimateByScroll.repeatingAnimations) {
            animateHtml.classList.remove(this.activeAnimationClass);
          }
        }
      }
    });
  }
  isPartiallyVisible(animElement, animHtml) {
    var elementBoundary = animHtml.getBoundingClientRect();
    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    var height = elementBoundary.height;
    let heightWithCoeff = height * parseFloat(animHtml.dataset.viewStartCoeff);
    return top + heightWithCoeff >= 0 && heightWithCoeff + window.innerHeight >= bottom;
  }
};
let AnimateByScroll = _AnimateByScroll;
AnimateByScroll.repeatingAnimations = false;
export {
  AnimateByScroll as default
};
export class AnimationGroup {
  constructor(arg, ...mediaQueries) {
    if (elementsIsExist(arg.selectors) == false) {
      console.log("[AnimationGroup] Element is not exist!");
    } else if (arg.animateStartCoeff <= 0 || arg.animateStartCoeff > 1) {
      console.log("[AnimationGroup] AnimateStartCoeff <= 0 or > 1");
    }
    this.htmlElements = document.querySelectorAll(arg.selectors);
    for (let htmlElement of this.htmlElements) {
      htmlElement.setAttribute("data-timeout", arg.timeoutBeforeStart.toString());
      htmlElement.setAttribute("data-view-start-coeff", arg.animateStartCoeff.toString());
    }
    this.defTimeoutBeforeStart = arg.timeoutBeforeStart;
    this.defAnimStartCoeff = arg.animateStartCoeff;
    this.mediaQueries = mediaQueries;
  }
  setMediaProperties() {
    for (let media of this.mediaQueries) {
      if (window.innerWidth <= media.activeWitdh) {
        for (let htmlElement of this.htmlElements) {
          htmlElement.setAttribute("data-timeout", media.timeoutBeforeStart.toString());
          htmlElement.setAttribute("data-view-start-coeff", media.animateStartCoeff.toString());
        }
      } else {
        for (let htmlElement of this.htmlElements) {
          htmlElement.setAttribute("data-timeout", this.defTimeoutBeforeStart.toString());
          htmlElement.setAttribute("data-view-start-coeff", this.defAnimStartCoeff.toString());
        }
      }
    }
  }
}
export class AnimationMediaQuery {
  constructor(activeWitdh, animateStartCoeff, timeoutBeforeStart) {
    if (animateStartCoeff <= 0 || animateStartCoeff > 1) {
      console.log("[AnimationMediaQuery] AnimateStartCoeff <= 0 or > 1");
    }
    this.activeWitdh = activeWitdh;
    this.animateStartCoeff = animateStartCoeff;
    this.timeoutBeforeStart = timeoutBeforeStart;
  }
}
