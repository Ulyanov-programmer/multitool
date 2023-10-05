import { elementsIsExist, sleep } from '../general.js'
import './scroll-timeline.js'


interface ObserverToolsArgs {
  /**
    Do you want the animations to be played again if the blocks they leave the screen? 
    Set it to true, but i don't recommend to use this as true in production.
  */
  repeatObserve?: boolean
  /** This class will be applied when the blocks are sufficiently shown on the display. */
  isIntersectedClass?: string
}
export default class ObserverTools {
  public static repeatObserve: boolean
  public static isIntersectedClass: string

  constructor(arg: ObserverToolsArgs, ...elements: (ActionOnView | TypedAnimationTimeline)[]) {
    ObserverTools.repeatObserve = arg.repeatObserve ?? false
    ObserverTools.isIntersectedClass = arg.isIntersectedClass ?? 'is-intersecting'

    if (elements.length <= 0) {
      console.error('[ObserverTools] No one ActionOnView or AnimationTimeline have been created.')
      return
    }
  }
}



type Breakpoint = {
  [activeWidth: number]: {
    unobserve: boolean
    timeoutBeforeStart?: number
    functionOnView?: Function
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
  breakpoints?: Breakpoint
  functionOnView?: Function
}
export class ActionOnView {
  private htmlElements: NodeListOf<HTMLElement>
  private breakpoints: Breakpoint
  private threshold: number | number[]
  private root: Element | Document
  private rootMargin: string
  private timeoutBeforeStart: number
  private defaultFunctionOnView: Function
  private currentFunctionOnView: Function
  private observer: IntersectionObserver
  private currentActiveBreakpointId: number | string

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
    this.applyBreakpoints()

    window.addEventListener('resize', this.applyBreakpoints.bind(this))
  }

  private applyBreakpoints() {
    let currentBreakpointWidth = getNearestMaxBreakpointOrInfinity(this.breakpoints)

    if (currentBreakpointWidth == this.currentActiveBreakpointId) return


    if (currentBreakpointWidth != Infinity) {
      this.currentActiveBreakpointId = currentBreakpointWidth
      let activeBreakpoint = this.breakpoints[currentBreakpointWidth]

      for (let htmlElement of this.htmlElements) {
        if (activeBreakpoint.unobserve) {
          this.observer.unobserve(htmlElement)
        } else {
          this.observer.observe(htmlElement)
        }

        htmlElement.setAttribute(
          'data-timeout', activeBreakpoint.timeoutBeforeStart.toString() ?? '0'
        )

        if (this.currentFunctionOnView != activeBreakpoint.functionOnView) {
          this.currentFunctionOnView = activeBreakpoint.functionOnView

          if (this.currentFunctionOnView) this.currentFunctionOnView(htmlElement)
        }
      }
    }
    else {
      this.currentActiveBreakpointId = Infinity

      for (let htmlElement of this.htmlElements) {
        htmlElement.setAttribute('data-timeout', this.timeoutBeforeStart.toString())
        htmlElement.setAttribute('data-threshold', this.threshold.toString())
        this.observer.observe(htmlElement)

        if (this.currentFunctionOnView != this.defaultFunctionOnView) {
          this.currentFunctionOnView = this.defaultFunctionOnView

          if (this.currentFunctionOnView) this.currentFunctionOnView(htmlElement)
        }
      }
    }
  }

  private createIntersectionObserver() {
    let observerFunction = async function (entries: IntersectionObserverEntry[]) {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          // @ts-expect-error
          await sleep(parseInt(entry.target.dataset.timeout))
          entry.target.classList.add(ObserverTools.isIntersectedClass)

          if (this.currentFunctionOnView) {
            this.currentFunctionOnView(entry)
          }
        }
        else if (
          entry.isIntersecting == false &&
          ObserverTools.repeatObserve == false &&
          // if entry.target was intersecting
          entry.target.classList.contains(ObserverTools.isIntersectedClass)
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
interface AnimateBreakpointTimelineSettings {
  duration?: number
  fill?: FillMode
  timeline?: TypedViewTimeline | TypedScrollTimeline
  /**
   * Specify the time range and how it should be perceived.
   * @example
   * timeRange: 'cover 0% 100%',
   * (hint ↓)
   * timeRange: 'fill-type scroll-block-for-start scroll-block-for-end'
   */
  timeRange?: string
}
type TimelineBreakpoint = {
  [activeWidth: number]: {
    properties?: AnimateTimelineProperties
    settings?: AnimateBreakpointTimelineSettings
    disable?: boolean
    fill?: FillMode
  }
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
  properties: AnimateTimelineProperties
  /**
   * Animation settings such as ViewTimeline type and timeRange.
   */
  settings: AnimateTimelineSettings
  breakpoints?: TimelineBreakpoint
}
export class TypedAnimationTimeline {
  private animatedElements: NodeListOf<HTMLElement>
  private properties: AnimateTimelineProperties
  private settings: AnimateTimelineSettings
  private breakpoints: TimelineBreakpoint
  private currentActiveBreakpointId: number | string


  constructor(arg: AnimationTimelineArgs) {
    if (elementsIsExist(arg.selectors) == false) {
      console.log('[AnimationTimeline] No one element is exist!')
    }

    this.animatedElements = document.querySelectorAll(arg.selectors)
    this.properties = arg.properties
    this.settings = arg.settings

    this.setDefaultSettingsIfNull(this.settings)


    if (arg.breakpoints) {
      for (let breakpoint of Object.values(arg.breakpoints)) {
        this.setDefaultSettingsIfNull(breakpoint.settings)
      }
      this.breakpoints = arg.breakpoints

      this.applyBreakpoints()

      window.addEventListener('resize', this.applyBreakpoints.bind(this))
    }
  }

  private setDefaultSettingsIfNull(settings: AnimateTimelineSettings | AnimateBreakpointTimelineSettings): AnimateTimelineSettings {
    if (!settings) return

    settings.fill = settings.fill ?? 'forwards'
    // settings.timeline = this.createTimeline(settings.timeline)
    settings.timeRange = settings.timeRange ?? 'cover 0% 100%'
  }

  private applyBreakpoints() {
    let currentBreakpointWidth = getNearestMaxBreakpointOrInfinity(this.breakpoints)

    if (currentBreakpointWidth == this.currentActiveBreakpointId)
      return


    if (currentBreakpointWidth != Infinity) {
      this.currentActiveBreakpointId = currentBreakpointWidth

      let breakpoint = this.breakpoints[currentBreakpointWidth]

      for (let animatedHtml of this.animatedElements) {
        animatedHtml.animate(
          breakpoint?.properties ?? this.properties,
          {
            // ! Реализовать
            duration: undefined,
            direction: undefined,
            easing: undefined,
            endDelay: undefined,
            iterationComposite: undefined,
            iterations: undefined,
            iterationStart: undefined,
            // @ts-expect-error
            timeRange: breakpoint?.settings?.timeRange ?? this.settings.timeRange,
            // ? Попробовать запихнуть ???????? в метод.
            fill: breakpoint?.settings?.fill ?? this.settings.fill,
            timeline: this.createTimeline(
              breakpoint?.settings?.timeline ?? this.settings.timeline
            ),
          }
          ?? this.settings,
        )
      }
    }
    else {
      this.currentActiveBreakpointId = Infinity

      for (let animatedHtml of this.animatedElements) {
        animatedHtml.animate(
          this.properties,
          {
            // ! Реализовать
            duration: undefined,
            direction: undefined,
            easing: undefined,
            endDelay: undefined,
            iterationComposite: undefined,
            iterations: undefined,
            iterationStart: undefined,
            fill: this.settings.fill,
            timeRange: this.settings.timeRange,
            // @ts-expect-error
            timeline: this.createTimeline(this.settings.timeline),
          }
        )
      }
    }
  }

  private createTimeline(typedTimeline: TypedViewTimeline | TypedScrollTimeline) {
    let timeline: object

    if (typedTimeline instanceof TypedViewTimeline) {
      // @ts-expect-error
      timeline = new ViewTimeline({
        subject: typedTimeline.subject,
        axis: typedTimeline.axis,
        startOffset: typedTimeline.startOffset,
        endOffset: typedTimeline.endOffset,
      })
    }
    else if (typedTimeline instanceof TypedScrollTimeline) {
      // @ts-expect-error
      timeline = new ScrollTimeline({
        source: typedTimeline.source,
        axis: typedTimeline.axis,
      })
    }

    return timeline
  }
}


function getNearestMaxBreakpointOrInfinity(breakpoints: Breakpoint | TimelineBreakpoint): number {
  if (!breakpoints) return Infinity

  let queriesActiveWidths = Object.keys(breakpoints).map(Number)
  let windowWidth = window.outerWidth

  let nearestMaxBreakpointWidth = Math.min(...queriesActiveWidths.filter(num => num >= windowWidth))


  if (windowWidth > nearestMaxBreakpointWidth || nearestMaxBreakpointWidth == Infinity) {
    return Infinity
  }

  return nearestMaxBreakpointWidth
}