import { isNullOrWhiteSpaces } from "./general.js";

interface ParallaxArgs {
	/** Selector of a block that contains the elements to be parallaxed. */
	parallaxContainerSelector: string
	/** Parallax will only work if the window width is greater than or equal to this number.	*/
	minWorkWidth: number
}

export default class Parallax {
	private parallaxContainer: HTMLElement
	private coordProcX: number = 0
	private coordProcY: number = 0
	private parallaxElements: ParallaxElement[] = new Array()

	constructor(arg: ParallaxArgs, ...parallaxItems: ParallaxElement[]) {
		if (isNullOrWhiteSpaces(arg.parallaxContainerSelector))
			throw '[PARALLAX] Incorrect args in constructor.'

		this.parallaxContainer = document.querySelector(arg.parallaxContainerSelector);

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
		let parallaxWidth = this.parallaxContainer.clientWidth
		let parallaxheight = this.parallaxContainer.clientHeight

		let coordX = e.pageX - parallaxWidth / 2
		let coordY = e.pageY - parallaxheight / 2

		this.coordProcX = coordX / parallaxWidth * 100
		this.coordProcY = coordY / parallaxheight * 100

		for (let el of this.parallaxElements) {
			el.htmlElement.style.transform =
				`translate3d(${this.coordProcX / el.parallaxCoeff}%, ${this.coordProcY / el.parallaxCoeff}%, 0)`
		}
	}
}


interface ParallaxElementArgs {
	/** Selector of element or `HTMLElement` that will be parallaxed. */
	selectorOrElement: string
	/** The power factor of the parallax effect. The smaller, the stronger the effect. */
	parallaxCoeff: number
}

export class ParallaxElement {

	constructor(arg: ParallaxElementArgs) {
		if (typeof arg.selectorOrElement == 'string') {

			if (isNullOrWhiteSpaces(arg.selectorOrElement) || arg.parallaxCoeff < 1)
				throw '[PARALLAX] Incorrect arguments in ParallaxElement.'

			this.selector = arg.selectorOrElement
		} else {
			this.htmlElement = arg.selectorOrElement
		}

		this.parallaxCoeff = arg.parallaxCoeff
	}

	public htmlElement: HTMLElement
	public selector: string
	public parallaxCoeff: number
}