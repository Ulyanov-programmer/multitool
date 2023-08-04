import { elementIsExistWithLog } from '../general.js'

interface ParallaxArgs {
  /** Selector of a block that contains the elements to be parallaxed. */
  parallaxContainerSelector: string
  /** Parallax will only work if the window width is greater than or equal to this number.	*/
  minWorkWidth: number
}

export default class Parallax {
  private parallaxContainer: HTMLElement
  private containerRect: DOMRect
  private containerCenterCoordX: number
  private containerCenterCoordY: number
  private parallaxElements: ParallaxElement[] = new Array()

  constructor(arg: ParallaxArgs, ...parallaxItems: ParallaxElement[]) {
    if (!elementIsExistWithLog('Parallax', arg.parallaxContainerSelector))
      return

    this.parallaxContainer = document.querySelector(arg.parallaxContainerSelector)
    this.containerRect = this.parallaxContainer.getBoundingClientRect()
    this.containerCenterCoordX = Math.round(this.containerRect.width / 2)
    this.containerCenterCoordY = Math.round(this.containerRect.height / 2)

    for (let parallaxItem of parallaxItems) {
      if (!parallaxItem) return

      if (!parallaxItem.htmlElement) {
        parallaxItem.htmlElement = document.querySelector(parallaxItem.selector)
      }
      this.parallaxElements.push(parallaxItem)
    }

    this.parallaxContainer.addEventListener('mousemove', (e) =>
      window.outerWidth >= arg.minWorkWidth ? this.moveElements(e) : false
    )
  }


  moveElements(e: MouseEvent) {
    let mouseX = e.pageX - this.parallaxContainer.offsetLeft
    let mouseY = e.pageY - this.parallaxContainer.offsetTop

    let relativeCoordX = mouseX - this.containerCenterCoordX
    let relativeCoordY = mouseY - this.containerCenterCoordY

    for (let el of this.parallaxElements) {
      el.parallax(relativeCoordX, relativeCoordY)
    }
  }
}


interface ParallaxElementArgs {
  /** Selector of element or `HTMLElement` that will be parallaxed. */
  selectorOrElement: string
  /** 
   * The value of the parallax power along the X-axis. 
   * If the value is 1, the element will be behind the cursor, set a lower value. 
  */
  parallaxCoeffX: number
  /**
   * The value of the parallax power along the Y-axis. 
   * If the value is 1, the element will be behind the cursor, set a lower value. 
  */
  parallaxCoeffY: number
  /** Move the mouse up - the element moves down, etc. Not required, default = false. */
  reverseMode?: boolean
}

export class ParallaxElement {
  private reverseMode: boolean = false

  constructor(arg: ParallaxElementArgs) {
    if (typeof arg.selectorOrElement == 'string') {

      if (!elementIsExistWithLog('ParallaxElement'))
        return

      this.selector = arg.selectorOrElement
    } else {
      this.htmlElement = arg.selectorOrElement
    }

    this.parallaxCoeffX = arg.parallaxCoeffX
    this.parallaxCoeffY = arg.parallaxCoeffY

    this.reverseMode = arg.reverseMode
  }

  public htmlElement: HTMLElement
  public selector: string
  public parallaxCoeffX: number
  public parallaxCoeffY: number

  public parallax(relativeCoordX: number, relativeCoordY: number) {
    if (this.reverseMode) {
      relativeCoordX *= -1
      relativeCoordY *= -1
    }

    this.htmlElement.style.transform =
      `translate3d(${relativeCoordX * this.parallaxCoeffX}px, ${relativeCoordY * this.parallaxCoeffY}px, 0)`
  }
}