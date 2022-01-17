import { isNullOrWhiteSpaces } from "./general.js";

export class Parallax {
  private parallaxContainer: HTMLElement
  private coordProcX: number = 0
  private coordProcY: number = 0
  private parallaxElements: ParallaxElement[] = new Array()

  /**
   * Provides functionality for parallax of elements.
   * 
   * @param parallaxContainerSelector
   * Selector of a block that contains the elements to be parallaxed.
   * @param parallaxItems
   * Elements that will be subject to parallax 
   * in the form of instances of the `ParallaxElement` class in an arbitrary number,
   * 
   * @throws Incorrect args in constructor - 
   * This error will be printed to the console if some input argument are null or white spaces.
   */
  constructor(parallaxContainerSelector: string, ...parallaxItems: ParallaxElement[]) {
    if (isNullOrWhiteSpaces(parallaxContainerSelector)) {
      throw '[PARALLAX] Incorrect args in constructor.'
    }

    this.parallaxContainer = document.querySelector(parallaxContainerSelector);

    for (const parallaxItem of parallaxItems) {
      if (parallaxItem) {
        if (!parallaxItem.htmlElement) {
          parallaxItem.htmlElement = document.querySelector(parallaxItem.selector);
        }
        this.parallaxElements.push(parallaxItem)
      }
    }

    this.parallaxContainer.addEventListener('mousemove', (e) => {
      this.moveElements(e);
    });
  }


  moveElements(e: MouseEvent) {
    let parallaxWidth = this.parallaxContainer.clientWidth
    let parallaxheight = this.parallaxContainer.clientHeight

    let coordX = e.pageX - parallaxWidth / 2
    let coordY = e.pageY - parallaxheight / 2

    this.coordProcX = coordX / parallaxWidth * 100
    this.coordProcY = coordY / parallaxheight * 100

    for (const el of this.parallaxElements) {
      el.htmlElement.style.transform =
        `translate(${this.coordProcX / el.parallaxCoeff}%, ${this.coordProcY / el.parallaxCoeff}%)`
    }
  }
}
export class ParallaxElement {
  /**
   * Contains data about the element that will be parallaxed.
   * 
   * @param selectorOrElement
   * Selector of element or `HTMLElement` that will be parallaxed.
   * @param parallaxCoeff
   * The power factor of the parallax effect. The smaller, the stronger the effect.
   * 
   * @throws Incorrect arguments in ParallaxElement - 
   * This error will be printed to the console 
   * if some input argument are null, white spaces or parallaxCoeff is less than 1.
   */
  constructor(selectorOrElement: string | HTMLElement, parallaxCoeff: number) {
    if (typeof selectorOrElement == 'string') {

      if (isNullOrWhiteSpaces(selectorOrElement) || parallaxCoeff < 1) {
        throw '[PARALLAX] Incorrect arguments in ParallaxElement.'
      }
      this.selector = selectorOrElement
    } else {
      this.htmlElement = selectorOrElement
    }
    
    this.parallaxCoeff = parallaxCoeff
  }

  public htmlElement: HTMLElement
  public selector: string
  public parallaxCoeff: number
}