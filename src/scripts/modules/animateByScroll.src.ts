import { elementsIsExist } from './general.js'
import './scroll-timeline.js'


interface AnimateByScrollArgs {
  /**
    Do you want the animations to be played again if the blocks they leave the screen? 
    Set it to true, but i don't recommend to use this as true in production.
  */
  repeatingAnimations: boolean
  /** This class will be applied when the blocks are sufficiently shown on the display. */
  activeAnimationClass?: string
}

export default class AnimateByScroll {
  public static repeatingAnimations: boolean = false
  public static activeAnimationClass: string = 'active'

  constructor(arg: AnimateByScrollArgs, ...elements: (AnimationGroup | AnimationTimeline)[]) {
    AnimateByScroll.repeatingAnimations = arg.repeatingAnimations

    if (elements.length <= 0) {
      console.error('[AnimateByScroll] No one AnimationGroup or AnimationTimeline have been created.')
      return
    }
    if (arg.activeAnimationClass) {
      AnimateByScroll.activeAnimationClass = arg.activeAnimationClass
    }
  }
}

interface AnimationGroupArgs {
  /** Selectors of the element/elements to which the active animation class will be applied. */
  selectors: string
  /** 
    For example, 1 => class is assigned as soon as the element is shown on the screen. 
    0.5 => as soon as it is shown at half. 
  */
  animateStartCoeff: number[]
  /** The delay before the animation starts in milliseconds. */
  timeoutBeforeStart: number
}
export class AnimationGroup {
  private htmlElements: NodeListOf<HTMLElement>
  private mediaQueries: AnimationMediaQuery[]
  private defAnimStartCoeffs: number[]
  private defTimeoutBeforeStart: number

  /**
  * @param mediaQueries
  * If you need to change the animation assignment settings at a certain width, set the objects of `AnimationMediaQuery`.
  */
  constructor(arg: AnimationGroupArgs, ...mediaQueries: AnimationMediaQuery[]) {
    if (elementsIsExist(arg.selectors) == false) {
      console.log('[AnimationGroup] Element is not exist!')
    }

    this.htmlElements = document.querySelectorAll(arg.selectors)

    for (let htmlElement of this.htmlElements) {
      htmlElement.setAttribute('data-timeout', arg.timeoutBeforeStart.toString())
      htmlElement.setAttribute('data-view-start-coeff', arg.animateStartCoeff.toString())
    }


    this.defTimeoutBeforeStart = arg.timeoutBeforeStart
    this.defAnimStartCoeffs = arg.animateStartCoeff
    this.mediaQueries = mediaQueries
    this.setMediaProperties()
    this.createIntersectionObserver()

    window.addEventListener('resize', () => {
      this.setMediaProperties()
    }, false)
  }

  setMediaProperties() {
    if (this.mediaQueries.length <= 0) return

    for (let mediaQuery of this.mediaQueries) {
      if (window.outerWidth <= mediaQuery.activationWidth) {

        for (let htmlElement of this.htmlElements) {
          htmlElement.setAttribute('data-timeout', mediaQuery.timeoutBeforeStart.toString())
          htmlElement.setAttribute('data-view-start-coeff', mediaQuery.defAnimStartCoeffs.toString())
        }
      } else {
        for (let htmlElement of this.htmlElements) {
          htmlElement.setAttribute('data-timeout', this.defTimeoutBeforeStart.toString())
          htmlElement.setAttribute('data-view-start-coeff', this.defAnimStartCoeffs.toString())
        }
      }
    }
  }
  createIntersectionObserver() {
    let observerOptions = { threshold: this.defAnimStartCoeffs }

    let observerFunction = function (entries: IntersectionObserverEntry[]) {
      for (let entry of entries) {
        let animateHtml = entry.target as HTMLElement

        if (entry.isIntersecting && !animateHtml.classList.contains(AnimateByScroll.activeAnimationClass)) {
          setTimeout(() => {
            animateHtml.classList.add(AnimateByScroll.activeAnimationClass)
          }, parseInt(animateHtml.dataset.timeout))


          if (AnimateByScroll.repeatingAnimations == false) {
            observer.unobserve(entry.target)
          }
        }
        else if (entry.isIntersecting == false && AnimateByScroll.repeatingAnimations) {
          animateHtml.classList.remove(AnimateByScroll.activeAnimationClass)
        }
      }
    }

    const observer = new IntersectionObserver(observerFunction, observerOptions)
    for (let htmlElement of this.htmlElements) {
      observer.observe(htmlElement)
    }
  }
}

interface AnimationMediaQueryArgs {
  /**
    At a certain width, it changes the settings for applying the animation class.
  */
  activationWidth: number,
  /** 
    For example, 1 => class is assigned as soon as the element is shown on the screen. 0.5 = as soon as it is shown at half.
  */
  defAnimStartCoeffs: number[],
  /**
    The delay before the animation starts in milliseconds.
  */
  timeoutBeforeStart: number
}

export class AnimationMediaQuery {
  public activationWidth: number
  public defAnimStartCoeffs: number[]
  public timeoutBeforeStart: number

  constructor(arg: AnimationMediaQueryArgs) {
    this.activationWidth = arg.activationWidth
    this.defAnimStartCoeffs = arg.defAnimStartCoeffs
    this.timeoutBeforeStart = arg.timeoutBeforeStart
  }
}



interface AnimateTimelineProperties {
  [cssPropertyName: string]: [string, string]
}

interface AnimateTimelineSettings {
  duration?: number
  fill?: FillMode
  timeline: object
  timeRange?: string
}


interface AnimationTimelineArgs {
  selectors: string
  animatedProperties: AnimateTimelineProperties
  animateSettings: AnimateTimelineSettings
}
export class AnimationTimeline {
  private animatedElements: NodeListOf<HTMLElement>
  private animatedProperties: AnimateTimelineProperties
  private animateSettings: AnimateTimelineSettings

  constructor(arg: AnimationTimelineArgs) {
    if (elementsIsExist(arg.selectors) == false) {
      console.log('[AnimationTimeline] No one element is exist!')
    }

    this.animatedElements = document.querySelectorAll(arg.selectors)
    this.animatedProperties = arg.animatedProperties
    this.animateSettings = arg.animateSettings
    this.setDefaultAnimateSettingsIfNull(arg.animateSettings)


    for (let animatedHtml of this.animatedElements) {
      animatedHtml.animate(
        this.animatedProperties,
        this.animateSettings,
      )
    }
  }

  setDefaultAnimateSettingsIfNull(animateSettings: AnimateTimelineSettings) {
    if (!animateSettings.fill) {
      animateSettings.fill = 'forwards'
    }
  }
}