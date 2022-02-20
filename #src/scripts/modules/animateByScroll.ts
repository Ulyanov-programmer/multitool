import { isNullOrWhiteSpaces } from "./general.js";


export default class AnimateByScroll {
  private static isScrolling: boolean = true
  private static repeatingAnimations: boolean
  private static elements: AnimationElement[]
  /** This class will be applied when the blocks are sufficiently shown on the display. */
  public static activeAnimationClass: string = 'active'

  /**
   * Provides functionality for creating animations when scrolling to a block. 
   * To be more precise, it sets active animation class to the elements, so animations need to be set in css.
   * 
   * @param repeatingAnimations
   * Do you want the animations to be played again if the blocks they leave the screen? 
   * Set it to true, i don't recommend to use this in production.
   * @param elements
   * An arbitrary number of `AnimationElement`, in fact, the number of elements subject to animation.
   */
  constructor(repeatingAnimations: boolean, ...elements: AnimationElement[]) {
    AnimateByScroll.repeatingAnimations = repeatingAnimations
    AnimateByScroll.elements = elements

    this.checkAndToggleAnimationForElements()
    for (const element of AnimateByScroll.elements) {
      element.mediaQueries.length > 0 ? element.setMediaProperties() : false;
    }

    window.addEventListener('scroll', () => {
      this.checkAndToggleAnimationForElements()
    }, false)
    window.addEventListener('resize', () => {
      for (const element of AnimateByScroll.elements) {
        element.setMediaProperties()
      }
    }, false)
  }

  private checkAndToggleAnimationForElements() {
    if (AnimateByScroll.isScrolling) {

      window.requestAnimationFrame(() => {
        for (const animateElement of AnimateByScroll.elements) {

          if (this.isPartiallyVisible(animateElement)) {
            setTimeout(() => {
              animateElement.htmlElement.classList.add(AnimateByScroll.activeAnimationClass)
            }, animateElement.timeoutBeforeStart);
          }
          else if (AnimateByScroll.repeatingAnimations) {
            animateElement.htmlElement.classList.remove(AnimateByScroll.activeAnimationClass)
          }
          AnimateByScroll.isScrolling = false
        }
      })
    }

    AnimateByScroll.isScrolling = true
  }
  private isPartiallyVisible(animElement: AnimationElement) {
    /* thanks for this function: 
      en: https://www.kirupa.com/animations/creating_scroll_activated_animations.htm
      ru: http://webupblog.ru/animatsiya-pri-prokrutke-stranitsy-na-javascript-i-css/
    */

    var elementBoundary = animElement.htmlElement.getBoundingClientRect();

    var top = elementBoundary.top;
    var bottom = elementBoundary.bottom;
    var height = elementBoundary.height;
    let heightWithCoeff = height * animElement.animStartCoeff

    return ((top + heightWithCoeff >= 0) && (heightWithCoeff + window.innerHeight >= bottom));
  }
}

export class AnimationElement {
  public htmlElement: HTMLElement
  public animStartCoeff: number
  public timeoutBeforeStart: number
  public mediaQueries: AnimationMediaQuery[]
  private defAnimStartCoeff: number
  private defTimeoutBeforeStart: number

  /**
  * Contains animation settings for specific elements.
  * 
  * @param selector
  * Selector of the element to which the active animation class will be applied.
  * @param animateStartCoeff
  * For example, 1 => class is assigned as soon as the element is shown on the screen. 0.5 = as soon as it is shown at half.
  * @param timeoutBeforeStart
  * The delay before the animation starts in milliseconds.
  * @param mediaQueries
  * If you need to change the animation assignment settings at a certain width, set the objects of `AnimationMediaQuery` here.
  * 
  * @throws animateStartCoeff < 0 or > 1 - 
  * Specify the animation start factor greater than 0 and less than 1.
  * @throws Selector is null of white spaces! - 
  * This error will be printed to the console if some input argument is null or white spaces.
  */
  constructor(selector: string, animateStartCoeff: number, timeoutBeforeStart: number,
    ...mediaQueries: AnimationMediaQuery[]) {
    if (isNullOrWhiteSpaces(selector)) {
      if (animateStartCoeff <= 0 || animateStartCoeff > 1) {
        throw new RangeError('animateStartCoeff < 0 or > 1')
      }
      throw new RangeError('Selector is null of white spaces!')
    }

    this.timeoutBeforeStart = timeoutBeforeStart
    this.htmlElement = document.querySelector(selector)
    this.animStartCoeff = animateStartCoeff

    this.defTimeoutBeforeStart = timeoutBeforeStart
    this.defAnimStartCoeff = animateStartCoeff
    this.mediaQueries = mediaQueries
  }

  setMediaProperties() {
    for (let media of this.mediaQueries) {
      if (window.innerWidth <= media.activeWitdh) {
        this.animStartCoeff = media.animateStartCoeff
        this.timeoutBeforeStart = media.timeoutBeforeStart
      } else {
        this.animStartCoeff = this.defAnimStartCoeff
        this.timeoutBeforeStart = this.defTimeoutBeforeStart
      }
    }
  }
}
export class AnimationMediaQuery {
  public activeWitdh: number
  public animateStartCoeff: number
  public timeoutBeforeStart: number

  /**
  * At a certain width, it changes the settings for applying the animation class.
  * 
  * @param activeWitdh
  * If the viewport width is less than or equal to this value, new settings for applying the animation class will be applied.
  * @param animateStartCoeff
  * For example, 1 => class is assigned as soon as the element is shown on the screen. 0.5 = as soon as it is shown at half.
  * @param timeoutBeforeStart
  * The delay before the animation starts in milliseconds.
  * 
  * @throws animateStartCoeff < 0 or > 1 - 
  * Specify the animation start factor greater than 0 and less than 1.
  */
  constructor(activeWitdh: number, animateStartCoeff: number, timeoutBeforeStart: number) {
    if (animateStartCoeff <= 0 || animateStartCoeff > 1) {
      throw new RangeError('animateStartCoeff < 0 or > 1')
    }

    this.activeWitdh = activeWitdh
    this.animateStartCoeff = animateStartCoeff
    this.timeoutBeforeStart = timeoutBeforeStart
  }
}