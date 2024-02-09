import { elementIsExistWithLog } from '../generalFunctions.js'

interface ParallaxArgs {
  /** 
   * The selector of the element, the movement of the cursor over which will cause parallax.
   */
  parallaxContainerSelector: string
  /** 
   * If the screen width becomes less than the specified width, the parallax will stop working.
   */
  minWorkWidth: number
}

export default class Parallax {
  private parallaxContainer: HTMLElement
  private containerRect: DOMRect
  private containerCenterCoordX: number
  private containerCenterCoordY: number
  private minWorkWidth: number
  private parallaxElements: ParallaxElement[] = new Array()

  constructor(arg: ParallaxArgs, ...parallaxItems: ParallaxElement[]) {
    if (!elementIsExistWithLog('Parallax', arg.parallaxContainerSelector)) return

    this.parallaxContainer = document.querySelector(arg.parallaxContainerSelector)
    this.parallaxElements = parallaxItems

    this.containerRect = this.parallaxContainer.getBoundingClientRect()
    this.containerCenterCoordX = Math.round(this.containerRect.width / 2)
    this.containerCenterCoordY = Math.round(this.containerRect.height / 2)

    this.minWorkWidth = arg.minWorkWidth

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.parallaxContainer.addEventListener(
        'pointermove',
        this.pointerMoveHandler.bind(this)
      )
    }
  }

  private pointerMoveHandler(event: PointerEvent) {
    if (window.outerWidth >= this.minWorkWidth)
      this.moveElements(event)
  }

  private moveElements(e: PointerEvent) {
    for (let el of this.parallaxElements) {
      el.parallax(
        e.pageX - this.parallaxContainer.offsetLeft - this.containerCenterCoordX,
        e.pageY - this.parallaxContainer.offsetTop - this.containerCenterCoordY
      )
    }
  }
}


interface ParallaxElementArgs {
  /** Selector of element that will be parallaxed. */
  selector: string
  /**
   * Parallax coefficients along the X-axis (the `first` value) and along the Y-axis (the `second` value).
   * 
   * It takes values in the range from `-1` to `1`.
   * @example
   * parallaxCoefficients: [-0.2, 0.5]
   */
  parallaxCoefficients: number[]
}
export class ParallaxElement {
  public htmlElement: HTMLElement
  public parallaxCoeffX: number
  public parallaxCoeffY: number

  constructor(arg: ParallaxElementArgs) {
    if (!elementIsExistWithLog('ParallaxElement', arg.selector)) return

    this.htmlElement = document.querySelector(arg.selector)
    this.htmlElement.style.transition = 'translate 0.1s ease'

    this.parallaxCoeffX = arg.parallaxCoefficients[0]
    this.parallaxCoeffY = arg.parallaxCoefficients[1] ?? arg.parallaxCoefficients[0]
  }

  async parallax(relativeCoordX: number, relativeCoordY: number) {
    this.htmlElement.style.translate =
      `${Math.round(relativeCoordX * this.parallaxCoeffX)}px 
      ${Math.round(relativeCoordY * this.parallaxCoeffY)}px 
      0`
  }
}