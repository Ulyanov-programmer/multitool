import { elementsIsExist, sleep } from '../general.js'
import './scroll-timeline.js'


interface ObserverToolsArgs {
  /**
    Do you want the animations to be played again if the blocks they leave the screen? 
    Set it to true, but i don't recommend to use this as true in production.
    @defaultValue `false`
  */
  repeatObserve?: boolean
  /** 
   * This class will be applied when the blocks are intersected.
   * @defaultValue `'is-intersecting'`
   */
  isIntersectedClass?: string
}
export class ObserverTools {
  /**
    Do you want the action to be played again if the blocks leave the screen?
    Set it to `true`.
    @defaultValue `false`
  */
  public static repeatObserve: boolean = false
  /** 
   * This class will be applied when the blocks are intersected.
   * @defaultValue `'is-intersecting'`
   */
  public static isIntersectedClass: string = 'is-intersecting'

  constructor(arg: ObserverToolsArgs) {
    ObserverTools.repeatObserve = arg.repeatObserve ?? ObserverTools.repeatObserve
    ObserverTools.isIntersectedClass = arg.isIntersectedClass ?? ObserverTools.isIntersectedClass
  }
}


type Breakpoint = {
  [activeWidth: number]: {
    /**
     * Specify `true` if you want to disable the Observer.
     */
    unobserve: boolean
    /** 
     * The delay before the animation starts in milliseconds. 
     */
    timeoutBeforeStart?: number
    /**
      * The function that will be executed when the intersected element is on the screen.
      * @param observerEntry The IntersectionObserverEntry object for processing inside the function.
      * @remark The function should be full-fledged, `not be arrow-function`!
      */
    functionOnView?: (observerEntry: IntersectionObserverEntry) => any
  }
}
interface ActionOnViewArgs {
  /** 
   * Selectors of the element/elements to which the active animation class will be applied. 
   */
  selectors: string
  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#threshold | MDN reference on this parameter}
   */
  threshold: number | number[]
  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#root  | MDN reference on this parameter}
   */
  root?: HTMLElement
  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#rootmargin | MDN reference on this parameter}
   */
  rootMargin?: string
  /** 
   * The delay before the animation starts in milliseconds. 
   */
  timeoutBeforeStart: number
  /**
   * Allows you to change the Observer object at certain screen widths.
   */
  breakpoints?: Breakpoint
  /**
   * The function that will be executed when the intersected element is on the screen.
   * @param observerEntry The IntersectionObserverEntry object for processing inside the function.
   * @remark The function should be full-fledged, `not be arrow-function`!
   */
  functionOnView?: (observerEntry: IntersectionObserverEntry) => any
  doNotRunUntilFirstBreakpoint?: boolean
}

/**
 * Creates an instance of `IntersectionObserver` and allows you to configure it.
 */
export default class ActionOnView {
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
  private doNotRunUntilFirstBreakpoint: boolean

  constructor(arg: ActionOnViewArgs) {
    if (!elementsIsExist(arg.selectors)) {
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
    this.doNotRunUntilFirstBreakpoint = arg.doNotRunUntilFirstBreakpoint ?? false

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
        activeBreakpoint.unobserve
          ? this.observer.unobserve(htmlElement)
          : this.observer.observe(htmlElement)

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
        if (this.doNotRunUntilFirstBreakpoint) {
          this.observer.unobserve(htmlElement)
          return
        }

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
          !entry.isIntersecting &&
          !ObserverTools.repeatObserve &&
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



type ScrollAxisType = 'block' | 'inline' | 'y' | 'x'

type TypedScrollTimelineArgs = {
  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline/axis | MDN reference}
   */
  axis: ScrollAxisType
  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline/source | MDN reference}
   * 
   * @remark But you don't need to specify the element, the element selector is enough.
   */
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
  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline/subject | MDN reference}
   *
   * @remark But you don't need to specify the element, the element selector is enough.
   */
  subject: string
  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline/axis | MDN reference}
   */
  axis?: ScrollAxisType
  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline/startOffset | MDN reference}
   */
  startOffset?: CSSUnitValue
  /**
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/ViewTimeline/endOffset | MDN reference}
   */
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
  [cssPropertyName: string]: [...string[] | number[]]
}
interface AnimateTimelineSettings {
  id?: string
  duration?: number | CSSNumericValue
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
  direction?: PlaybackDirection
  easing?: string
  endDelay?: number
  iterationComposite?: IterationCompositeOperation
  iterations?: number
  iterationStart?: number
  delay?: number
}
interface AnimateBreakpointTimelineSettings {
  id?: string
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
  direction?: PlaybackDirection
  easing?: string
  endDelay?: number
  iterationComposite?: IterationCompositeOperation
  iterations?: number
  iterationStart?: number
  delay?: number
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
  private currentActiveBreakpointId: string
  private animations: Animation[]

  constructor(arg: AnimationTimelineArgs) {
    if (!elementsIsExist(arg.selectors)) {
      console.log('[AnimationTimeline] No one element is exist!')
      return
    }

    this.animatedElements = document.querySelectorAll(arg.selectors)
    this.properties = arg.properties
    this.settings = arg.settings
    this.breakpoints = arg.breakpoints
    this.animations = []

    this.setDefaultSettingsIfEmpty(this.settings)
    this.applyBreakpoints()

    window.addEventListener('resize', this.applyBreakpoints.bind(this))
  }

  private setDefaultSettingsIfEmpty(
    settings: AnimateTimelineSettings | AnimateBreakpointTimelineSettings
  ): AnimateTimelineSettings {
    if (!settings) return

    settings.fill = settings.fill ?? 'forwards'
    settings.timeRange = settings.timeRange ?? 'cover 0% 100%'
  }

  private applyBreakpoints() {
    let currentBreakpointWidth = getNearestMaxBreakpointOrInfinity(this.breakpoints).toString()

    if (currentBreakpointWidth == this.currentActiveBreakpointId) return

    if (currentBreakpointWidth != 'Infinity') {
      this.currentActiveBreakpointId = currentBreakpointWidth

      if (this.breakpoints[currentBreakpointWidth].disable) {
        this.cancelAnimationsNotCurrentBreakpoint()
      }
      else {
        this.animateElements(
          this.breakpoints[currentBreakpointWidth].properties,
          this.breakpoints[currentBreakpointWidth].settings,
          currentBreakpointWidth,
        )
      }
    }
    else {
      this.currentActiveBreakpointId = 'Infinity'

      this.animateElements(this.properties, this.settings, this.currentActiveBreakpointId)
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

  private animateElements(
    properties: AnimateTimelineProperties,
    settings: AnimateBreakpointTimelineSettings | AnimateTimelineSettings,
    animationId: string,
  ) {
    let assignedSettings = { ...this.settings, ...settings }
    assignedSettings.id = animationId

    for (let animatedHtml of this.animatedElements) {
      //@ts-expect-error
      assignedSettings.timeline = this.createTimeline(
        settings?.timeline ?? this.settings.timeline
      )

      this.animations.push(
        animatedHtml.animate(
          properties ?? this.properties,
          assignedSettings ?? this.settings,
        )
      )
    }
  }
  private cancelAnimationsNotCurrentBreakpoint() {
    for (let i = this.animations.length - 1; i >= 0; i--) {
      if (this.animations[i].id != this.currentActiveBreakpointId) {
        this.animations[i].cancel()
        this.animations.splice(i, 1)
      }
    }
  }
}


function getNearestMaxBreakpointOrInfinity(breakpoints: Breakpoint | TimelineBreakpoint): number {
  if (!breakpoints) return Infinity

  let queriesActiveWidths = Object.keys(breakpoints).map(Number)
  let windowWidth = window.innerWidth

  let nearestMaxBreakpointWidth = Math.min(...queriesActiveWidths.filter(num => num >= windowWidth))


  if (windowWidth > nearestMaxBreakpointWidth || nearestMaxBreakpointWidth == Infinity) {
    return Infinity
  }

  return nearestMaxBreakpointWidth
}