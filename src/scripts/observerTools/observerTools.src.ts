import { elementsIsExist } from '../general.js'
import './scroll-timeline.js'


interface ObserverToolsArgs {
  /**
    Do you want the animations to be played again if the blocks they leave the screen? 
    Set it to true, but i don't recommend to use this as true in production.
  */
  repeatingAnimations: boolean
  /** This class will be applied when the blocks are sufficiently shown on the display. */
  activeAnimationClass?: string
}

export default class ObserverTools {
  public static repeatingAnimations: boolean = false
  public static activeAnimationClass: string = 'active'

  constructor(arg: ObserverToolsArgs, ...elements: (ActionOnView | AnimationTimeline)[]) {
    ObserverTools.repeatingAnimations = arg.repeatingAnimations

    if (elements.length <= 0) {
      console.error('[ObserverTools] No one ActionOnView or AnimationTimeline have been created.')
      return
    }
    if (arg.activeAnimationClass) {
      ObserverTools.activeAnimationClass = arg.activeAnimationClass
    }
  }
}

interface ActionOnViewArgs {
  /** Selectors of the element/elements to which the active animation class will be applied. */
  selectors: string
  /** 
    For example, 1 => class is assigned as soon as the element is shown on the screen. 
    0.5 => as soon as it is shown at half.
  */
  startActionPaddingIndex: number[]
  /** The delay before the animation starts in milliseconds. */
  timeoutBeforeStart: number
}
export class ActionOnView {
  private htmlElements: NodeListOf<HTMLElement>
  private mediaQueries: ActionMediaQuery[]
  private startActionPaddingIndex: number[]
  private timeoutBeforeStart: number

  /**
    @param mediaQueries
    If you need to change the animation assignment settings at a certain width, set the objects of `ActionMediaQuery`.
  */
  constructor(arg: ActionOnViewArgs, ...mediaQueries: ActionMediaQuery[]) {
    if (elementsIsExist(arg.selectors) == false) {
      console.log('[ActionOnView] Element is not exist!')
    }

    this.htmlElements = document.querySelectorAll(arg.selectors)

    for (let htmlElement of this.htmlElements) {
      htmlElement.setAttribute('data-timeout', arg.timeoutBeforeStart.toString())
      htmlElement.setAttribute('data-view-start-coeff', arg.startActionPaddingIndex.toString())
    }


    this.timeoutBeforeStart = arg.timeoutBeforeStart
    this.startActionPaddingIndex = arg.startActionPaddingIndex
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
          htmlElement.setAttribute('data-view-start-coeff', mediaQuery.startActionPaddingIndex.toString())
        }
      } else {
        for (let htmlElement of this.htmlElements) {
          htmlElement.setAttribute('data-timeout', this.timeoutBeforeStart.toString())
          htmlElement.setAttribute('data-view-start-coeff', this.startActionPaddingIndex.toString())
        }
      }
    }
  }
  createIntersectionObserver() {
    let observerOptions = { threshold: this.startActionPaddingIndex }

    let observerFunction = function (entries: IntersectionObserverEntry[]) {
      for (let entry of entries) {
        let animateHtml = entry.target as HTMLElement

        if (entry.isIntersecting && !animateHtml.classList.contains(ObserverTools.activeAnimationClass)) {
          setTimeout(() => {
            animateHtml.classList.add(ObserverTools.activeAnimationClass)
          }, parseInt(animateHtml.dataset.timeout))


          if (ObserverTools.repeatingAnimations == false) {
            observer.unobserve(entry.target)
          }
        }
        else if (entry.isIntersecting == false && ObserverTools.repeatingAnimations) {
          animateHtml.classList.remove(ObserverTools.activeAnimationClass)
        }
      }
    }

    const observer = new IntersectionObserver(observerFunction, observerOptions)
    for (let htmlElement of this.htmlElements) {
      observer.observe(htmlElement)
    }
  }
}

interface ActionMediaQueryArgs {
  /**
    At a certain width, it changes the settings for applying the animation class.
  */
  activationWidth: number,
  /** 
    For example, 1 => class is assigned as soon as the element is shown on the screen. 0.5 = as soon as it is shown at half.
  */
  startActionPaddingIndex: number[],
  /**
    The delay before the animation starts in milliseconds.
  */
  timeoutBeforeStart: number
}

export class ActionMediaQuery {
  public activationWidth: number
  public startActionPaddingIndex: number[]
  public timeoutBeforeStart: number

  constructor(arg: ActionMediaQueryArgs) {
    this.activationWidth = arg.activationWidth
    this.startActionPaddingIndex = arg.startActionPaddingIndex
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