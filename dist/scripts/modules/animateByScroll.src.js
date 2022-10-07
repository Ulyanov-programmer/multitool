import { elementsIsExist } from "./general.js";
import "../scroll-timeline.js";
const _AnimateByScroll = class {
  constructor(arg, ...elements) {
    _AnimateByScroll.repeatingAnimations = arg.repeatingAnimations;
    if (elements.length <= 0) {
      console.error("[AnimateByScroll] No one AnimationGroup or AnimationTimeline have been created.");
      return;
    }
    if (arg.activeAnimationClass) {
      _AnimateByScroll.activeAnimationClass = arg.activeAnimationClass;
    }
  }
};
let AnimateByScroll = _AnimateByScroll;
AnimateByScroll.repeatingAnimations = false;
AnimateByScroll.activeAnimationClass = "active";
export {
  AnimateByScroll as default
};
export class AnimationGroup {
  constructor(arg, ...mediaQueries) {
    if (elementsIsExist(arg.selectors) == false) {
      console.log("[AnimationGroup] Element is not exist!");
    }
    this.htmlElements = document.querySelectorAll(arg.selectors);
    for (let htmlElement of this.htmlElements) {
      htmlElement.setAttribute("data-timeout", arg.timeoutBeforeStart.toString());
      htmlElement.setAttribute("data-view-start-coeff", arg.animateStartCoeff.toString());
    }
    this.defTimeoutBeforeStart = arg.timeoutBeforeStart;
    this.defAnimStartCoeffs = arg.animateStartCoeff;
    this.mediaQueries = mediaQueries;
    this.setMediaProperties();
    this.createIntersectionObserver();
    window.addEventListener("resize", () => {
      this.setMediaProperties();
    }, false);
  }
  setMediaProperties() {
    if (this.mediaQueries.length <= 0)
      return;
    for (let mediaQuery of this.mediaQueries) {
      if (window.outerWidth <= mediaQuery.activationWitdh) {
        for (let htmlElement of this.htmlElements) {
          htmlElement.setAttribute("data-timeout", mediaQuery.timeoutBeforeStart.toString());
          htmlElement.setAttribute("data-view-start-coeff", mediaQuery.defAnimStartCoeffs.toString());
        }
      } else {
        for (let htmlElement of this.htmlElements) {
          htmlElement.setAttribute("data-timeout", this.defTimeoutBeforeStart.toString());
          htmlElement.setAttribute("data-view-start-coeff", this.defAnimStartCoeffs.toString());
        }
      }
    }
  }
  createIntersectionObserver() {
    let observerOptions = { threshold: this.defAnimStartCoeffs };
    let observerFunction = function(entries) {
      for (let entry of entries) {
        let animateHtml = entry.target;
        if (entry.isIntersecting && !animateHtml.classList.contains(AnimateByScroll.activeAnimationClass)) {
          setTimeout(() => {
            animateHtml.classList.add(AnimateByScroll.activeAnimationClass);
          }, parseInt(animateHtml.dataset.timeout));
          if (AnimateByScroll.repeatingAnimations == false) {
            observer.unobserve(entry.target);
          }
        } else if (entry.isIntersecting == false && AnimateByScroll.repeatingAnimations) {
          animateHtml.classList.remove(AnimateByScroll.activeAnimationClass);
        }
      }
    };
    const observer = new IntersectionObserver(observerFunction, observerOptions);
    for (let htmlElement of this.htmlElements) {
      observer.observe(htmlElement);
    }
  }
}
export class AnimationMediaQuery {
  constructor(activationWitdh, defAnimStartCoeffs, timeoutBeforeStart) {
    this.activationWitdh = activationWitdh;
    this.defAnimStartCoeffs = defAnimStartCoeffs;
    this.timeoutBeforeStart = timeoutBeforeStart;
  }
}
export class AnimationTimeline {
  constructor(arg) {
    if (elementsIsExist(arg.selectors) == false) {
      console.log("[AnimationTimeline] No one element is exist!");
    }
    this.animatedElements = document.querySelectorAll(arg.selectors);
    this.animatedProperties = arg.animatedProperties;
    this.animateSettings = arg.animateSettings;
    this.setDefaultanimateSettingsIfNull(arg.animateSettings);
    for (let animatedHtml of this.animatedElements) {
      animatedHtml.animate(this.animatedProperties, this.animateSettings);
    }
  }
  setDefaultanimateSettingsIfNull(animateSettings) {
    if (!animateSettings.fill) {
      animateSettings.fill = "forwards";
    }
  }
}
