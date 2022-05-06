import { elementIsExistWithLog } from "./general.js";

interface ParallaxArgs {
	/** Selector of a block that contains the elements to be parallaxed. */
	parallaxContainerSelector: string
	/** Parallax will only work if the window width is greater than or equal to this number.	*/
	minWorkWidth: number
	reverse?: boolean
}

export default class Parallax {
	private parallaxContainer: HTMLElement
	private containerRect: DOMRect
	private containerCenterCoordX: number
	private containerCenterCoordY: number
	private parallaxElements: ParallaxElement[] = new Array()
	private reverse: boolean = false

	constructor(arg: ParallaxArgs, ...parallaxItems: ParallaxElement[]) {
		if (!elementIsExistWithLog('Parallax', arg.parallaxContainerSelector))
			return

		this.parallaxContainer = document.querySelector(arg.parallaxContainerSelector)
		this.containerRect = this.parallaxContainer.getBoundingClientRect()
		this.containerCenterCoordX = Math.round(this.containerRect.width / 2)
		this.containerCenterCoordY = Math.round(this.containerRect.height / 2)
		this.reverse = arg.reverse

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

		if (this.reverse) {   
			relativeCoordX *= -1  
			relativeCoordY *= -1
		}
		for (let el of this.parallaxElements) {
			el.htmlElement.style.transform =
				`translate3d(${relativeCoordX * el.parallaxCoeffX}px, ${relativeCoordY * el.parallaxCoeffY}px, 0)`
		}
	}
}


interface ParallaxElementArgs {
	/** Selector of element or `HTMLElement` that will be parallaxed. */
	selectorOrElement: string
	/** The power factor of the parallax effect. The smaller, the stronger the effect. */
	parallaxCoeffX: number
	parallaxCoeffY: number
}

export class ParallaxElement {
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
	}

	public htmlElement: HTMLElement
	public selector: string
	public parallaxCoeffX: number
	public parallaxCoeffY: number
}