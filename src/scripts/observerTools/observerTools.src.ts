import { elementsIsExist, sleep } from '../general.js'
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
  public static repeatingAnimations: boolean
  public static activeAnimationClass: string

  constructor(arg: ObserverToolsArgs, ...elements: (ActionOnView | TypedAnimationTimeline)[]) {
    ObserverTools.repeatingAnimations = arg.repeatingAnimations ?? false
    ObserverTools.activeAnimationClass = arg.activeAnimationClass ?? 'is-intersecting'

    if (elements.length <= 0) {
      console.error('[ObserverTools] No one ActionOnView or AnimationTimeline have been created.')
      return
    }
  }
}

interface ActionOnViewArgs {
  /** Selectors of the element/elements to which the active animation class will be applied. */
  selectors: string
  /**  */
  threshold: number | number[]
  root?: HTMLElement
  rootMargin?: string
  /** The delay before the animation starts in milliseconds. */
  timeoutBeforeStart: number
  breakpoints?: object
  functionOnView?: Function
}
export class ActionOnView {
  private htmlElements: NodeListOf<HTMLElement>
  private breakpoints: object
  private threshold: number | number[]
  private root: Element | Document
  private rootMargin: string
  private timeoutBeforeStart: number
  private defaultFunctionOnView: Function
  private currentFunctionOnView: Function
  private observer: IntersectionObserver

  constructor(arg: ActionOnViewArgs) {
    if (elementsIsExist(arg.selectors) == false) {
      console.log('[ActionOnView] Element is not exist!')
    }

    this.htmlElements = document.querySelectorAll(arg.selectors)

    this.threshold = arg.threshold ?? [0]
    this.root = arg.root
    this.rootMargin = arg.rootMargin ?? '0px 0px 0px 0px'

    this.timeoutBeforeStart = arg.timeoutBeforeStart ?? 0
    this.breakpoints = arg.breakpoints
    this.defaultFunctionOnView = arg.functionOnView
    this.currentFunctionOnView = arg.functionOnView

    this.createIntersectionObserver()
    this.setBreakpoints()

    window.addEventListener('resize', () => {
      this.setBreakpoints()
    }, false)
  }

  setBreakpoints() {
    let activeMediaQueryWidth = this.getNearestMaxMediaQueryOrNull()

    if (activeMediaQueryWidth != null) {
      for (let htmlElement of this.htmlElements) {
        if (this.breakpoints[activeMediaQueryWidth].unobserve) {
          this.observer.unobserve(htmlElement)
        } else {
          this.observer.observe(htmlElement)
        }

        htmlElement.setAttribute(
          'data-timeout',
          this.breakpoints[activeMediaQueryWidth].timeoutBeforeStart ?? '0'
        )

        if (this.currentFunctionOnView != this.breakpoints[activeMediaQueryWidth].functionOnView) {
          this.currentFunctionOnView = this.breakpoints[activeMediaQueryWidth].functionOnView

          if (this.currentFunctionOnView != undefined) {
            this.currentFunctionOnView(htmlElement)
          }
        }
      }
    }
    else {
      for (let htmlElement of this.htmlElements) {
        htmlElement.setAttribute('data-timeout', this.timeoutBeforeStart.toString() ?? '0')
        htmlElement.setAttribute('data-threshold', this.threshold.toString() ?? '0')
        this.observer.observe(htmlElement)

        if (this.currentFunctionOnView != this.defaultFunctionOnView) {
          this.currentFunctionOnView = this.defaultFunctionOnView

          if (this.currentFunctionOnView != undefined) {
            this.defaultFunctionOnView(htmlElement)
          }
        }
      }
    }
  }

  createIntersectionObserver() {
    let observerFunction = async function (entries: IntersectionObserverEntry[]) {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          // @ts-expect-error
          await sleep(parseInt(entry.target.dataset.timeout))
          entry.target.classList.add(ObserverTools.activeAnimationClass)

          if (this.currentFunctionOnView) {
            this.currentFunctionOnView(entry)
          }
        }
        else if (
          entry.isIntersecting == false &&
          ObserverTools.repeatingAnimations == false &&
          // if entry.target was intersecting
          entry.target.classList.contains(ObserverTools.activeAnimationClass)
        ) {
          this.observer.unobserve(entry.target)
        }
      }
    }


    this.observer = new IntersectionObserver(
      observerFunction.bind(this),
      {
        threshold: this.threshold,
        root: this.root,
        rootMargin: this.rootMargin,
      }
    )

    for (let htmlElement of this.htmlElements) {
      this.observer.observe(htmlElement)
    }
  }

  getNearestMaxMediaQueryOrNull(): number {
    if (this.breakpoints == undefined) {
      return null
    }

    let queriesActiveWidths = Object.keys(this.breakpoints).map(Number)
    let windowWidth = window.outerWidth

    let nearestMaxMediaQueryWidth = Math.min(...queriesActiveWidths.filter(num => num >= windowWidth))

    if (windowWidth > nearestMaxMediaQueryWidth || nearestMaxMediaQueryWidth == Infinity) {
      return null
    }

    return nearestMaxMediaQueryWidth
  }
}



type ScrollAxisType = 'block' | 'inline'

type TypedScrollTimelineArgs = {
  axis: ScrollAxisType
  source?: string
}
export class TypedScrollTimeline implements AnimationTimeline {
  public axis: ScrollAxisType
  public source: HTMLElement
  public currentTime: number

  constructor(arg: TypedScrollTimelineArgs) {
    this.source = document.querySelector(arg.source) ?? document.documentElement
    this.axis = arg.axis ?? 'block'
  }
}

type TypedViewTimelineArgs = {
  subject: string
  axis?: ScrollAxisType
  startOffset?: CSSUnitValue
  endOffset?: CSSUnitValue
}
export class TypedViewTimeline implements AnimationTimeline {
  public axis: ScrollAxisType
  public subject: HTMLElement
  public startOffset: CSSUnitValue
  public endOffset: CSSUnitValue
  public currentTime: number

  constructor(arg: TypedViewTimelineArgs) {
    this.subject = document.querySelector(arg.subject)
    this.axis = arg.axis ?? 'block'
    this.startOffset = arg.startOffset
    this.endOffset = arg.endOffset
  }
}


interface AnimateTimelineProperties {
  [cssPropertyName: string]: [string, string]
}
interface AnimateTimelineSettings {
  duration?: number
  fill?: FillMode
  timeline: TypedViewTimeline | TypedScrollTimeline
  /**
   * Specify the time range and how it should be perceived.
   * @example
   * timeRange: 'cover 0% 100%',
   * (hint ↓)
   * timeRange: 'fill-type scroll-block-for-start scroll-block-for-end'
   */
  timeRange?: string
}


interface AnimationTimelineArgs {
  /**
   * Selector of the block/blocks to be animated.
   */
  selectors: string
  /**
   * Properties that will be animated for objects. Specify the start and end values.
   * @example
   * background: ['black', 'white'],
   */
  animatedProperties: AnimateTimelineProperties
  /**
   * Animation settings such as ViewTimeline type and timeRange.
   */
  animateSettings: AnimateTimelineSettings
}
export class TypedAnimationTimeline {
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


    if (this.animateSettings.timeline instanceof TypedViewTimeline) {
      // @ts-expect-error
      this.animateSettings.timeline = new ViewTimeline({
        subject: this.animateSettings.timeline.subject,
        axis: this.animateSettings.timeline.axis,
        startOffset: this.animateSettings.timeline.startOffset,
        endOffset: this.animateSettings.timeline.endOffset,
      })
    }
    else if (this.animateSettings.timeline instanceof TypedScrollTimeline) {
      // @ts-expect-error
      this.animateSettings.timeline = new ScrollTimeline({
        source: this.animateSettings.timeline.source,
        axis: this.animateSettings.timeline.axis,
      })
    }

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