import { elementsIsExist, sleep } from '../generalFunctions.js'

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
  threshold?: number | number[]
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
  timeoutBeforeStart?: number
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


function getNearestMaxBreakpointOrInfinity(breakpoints: Breakpoint): number {
  if (!breakpoints) return Infinity

  let queriesActiveWidths = Object.keys(breakpoints).map(Number)
  let windowWidth = window.innerWidth

  let nearestMaxBreakpointWidth = Math.min(...queriesActiveWidths.filter(num => num >= windowWidth))


  if (windowWidth > nearestMaxBreakpointWidth || nearestMaxBreakpointWidth == Infinity) {
    return Infinity
  }

  return nearestMaxBreakpointWidth
}