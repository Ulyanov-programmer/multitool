import { isNullOrWhiteSpaces } from "./general.js";

enum SwipeSide {
	Top,
	Left,
	Bottom,
	Right,
}
export enum ChangePlane {
	ToLeft,
	ToRight,
	ToTop,
	ToBottom,
}
enum ChangeOrientation {
	Vertical,
	Horizontal,
}

interface SwipeElementArgs {
	/** The element by which the swipe activates the opening of the menu. */
	touchStartAreaSelector: string
	/** 
		The element that will appear when swiping.
		@example
		```stylus
		Must contain the value transform: translate3d(). 
		For the menus appearing
		From Left: transform translate3d(-100%, 0, 0);
		From Right: transform translate3d(100%, 0, 0);
		From Top: transform translate3d(0, -100%, 0);
		From Bottom: transform translate3d(0, 100%, 0);
		```
	*/
	swipableElementSelector: string
	/** Which way you need to swipe to make the menu appear. */
	changePlane: ChangePlane
	/** 
		The higher or lower the value, the more or less you need to swipe in order 
		for the menu to appear. Usually the values range from 0.5 to 0.7.
	*/
	swipeSensitivity: number
}

export default class SwipeElement {
	private touchAreaElement: HTMLElement
	private swipableElement: HTMLElement

	private startX: number = 0
	private startY: number = 0
	private deltaX: number = 0
	private deltaY: number = 0
	private changePlane: ChangePlane
	private changeOrientation: ChangeOrientation
	private currentSide: SwipeSide

	private minSwipeWidth: number
	private minSwipeHeight: number
	private elementStartX: number
	private elementStartY: number
	private baseXStateModifier: number
	private baseYStateModifier: number
	private swipeSensitivity: number


	constructor(arg: SwipeElementArgs) {
		if (isNullOrWhiteSpaces(arg.touchStartAreaSelector, arg.swipableElementSelector))
			throw new Error('[SWIPE-ELEMENT Some selector is null or white spaces!]')

		this.touchAreaElement = document.querySelector(arg.touchStartAreaSelector)
		this.touchAreaElement.style.touchAction = 'none'
		this.swipableElement = document.querySelector(arg.swipableElementSelector)
		this.elementStartX = this.getTranslateState('x')
		this.elementStartY = this.getTranslateState('y')
		this.swipeSensitivity = arg.swipeSensitivity


		this.baseXStateModifier = this.checkBaseStateIsNegative('x') ? -1 : 1
		this.baseYStateModifier = this.checkBaseStateIsNegative('y') ? -1 : 1
		this.minSwipeWidth = Math.trunc(this.swipableElement.clientWidth * this.swipeSensitivity)
		this.minSwipeHeight = Math.trunc(this.swipableElement.clientHeight * this.swipeSensitivity)

		this.changePlane = arg.changePlane
		if (this.changePlane == ChangePlane.ToLeft || this.changePlane == ChangePlane.ToRight) {
			this.changeOrientation = ChangeOrientation.Horizontal
		} else {
			this.changeOrientation = ChangeOrientation.Vertical
		}


		this.touchAreaElement.addEventListener('pointerdown', (e) => {
			if (e.button != 0) return

			this.swipeStart(e)
			window.addEventListener('pointermove', this.pointerMoveHandler, false)

			window.addEventListener('pointerup', this.pointerUpHandler, false)
		}, false)
	}
	private pointerMoveHandler = (function (e: PointerEvent) {
		this.swipableElement.style.userSelect = 'none'
		this.swipeMove(e)
	}).bind(this)

	private pointerUpHandler = (function () {
		this.swipableElement.style.userSelect = ''
		this.swipeEnd(0, false, true)
	}).bind(this)


	private swipeStart(e: PointerEvent) {
		this.startX = e.clientX
		this.startY = e.clientY
	}
	private swipeMove(e: PointerEvent) {
		if (this.changeOrientation == ChangeOrientation.Horizontal) {
			this.deltaX = this.startX - e.clientX
			this.currentSide = this.deltaX >= 0 ? SwipeSide.Left : SwipeSide.Right

			this.deltaX = Math.abs(this.deltaX)

			this.moveX()
		}
		else if (this.changeOrientation == ChangeOrientation.Vertical) {
			this.deltaY = this.startY - e.clientY
			this.currentSide = this.deltaY >= 0 ? SwipeSide.Top : SwipeSide.Bottom

			this.deltaY = Math.abs(this.deltaY)

			this.moveY()
		}
	}
	private swipeEnd(delta: number, changeTo: boolean, isSwipeEnd?: boolean) {
		if (this.changeOrientation == ChangeOrientation.Horizontal && delta > this.minSwipeWidth
			|| this.changeOrientation == ChangeOrientation.Vertical && delta > this.minSwipeHeight) {

			changeTo ? this.swipableElement.classList.add('active') : this.swipableElement.classList.remove('active')

			this.touchAreaElement.classList.toggle('active')

			this.swipableElement.style.transform = ``
			window.removeEventListener('pointermove', this.pointerMoveHandler, false)
		}
		if (isSwipeEnd) {
			this.swipableElement.style.transform = ``
			window.removeEventListener('pointermove', this.pointerMoveHandler, false)
		}
	}

	private moveX(delta: number = this.deltaX) {
		if (!this.checkSwipableElementContainActive()) {
			if (this.changePlane == ChangePlane.ToLeft && this.currentSide == SwipeSide.Right) return
			if (this.changePlane == ChangePlane.ToRight && this.currentSide == SwipeSide.Left) return

			let result = this.elementStartX - delta * this.baseXStateModifier

			this.swipableElement.style.transform = `translate3d(
				${result}px, 
				${this.getTranslateState('Y')}px, 
				0)`

			this.swipeEnd(delta, true)
		}
		else {
			if (this.changePlane == ChangePlane.ToLeft && this.currentSide == SwipeSide.Left) return
			if (this.changePlane == ChangePlane.ToRight && this.currentSide == SwipeSide.Right) return

			let operator = this.changePlane == ChangePlane.ToLeft ? '+' : '-'
			let result = `${operator}${delta}`

			this.swipableElement.style.transform = `translate3d(
				${result}px,
				${this.getTranslateState('Y')}px, 
				0)`

			this.swipeEnd(delta, false)
		}
	}
	private moveY(delta: number = this.deltaY) {
		if (!this.checkSwipableElementContainActive()) {
			if (this.changePlane == ChangePlane.ToBottom && this.currentSide == SwipeSide.Top) return
			if (this.changePlane == ChangePlane.ToTop && this.currentSide == SwipeSide.Bottom) return

			let result = this.elementStartY - delta * this.baseYStateModifier

			this.swipableElement.style.transform = `translate3d(
				${this.getTranslateState('x')}px, 
				${result}px, 
				0)`

			this.swipeEnd(delta, true)
		}
		else {
			if (this.changePlane == ChangePlane.ToTop && this.currentSide == SwipeSide.Top) return
			if (this.changePlane == ChangePlane.ToBottom && this.currentSide == SwipeSide.Bottom) return

			let operator = this.changePlane == ChangePlane.ToBottom ? '-' : '+'
			let result = `${operator}${delta}`

			this.swipableElement.style.transform = `translate3d(
				${this.getTranslateState('x')}px, 
				${result}px, 
				0)`

			this.swipeEnd(delta, false)
		}
	}


	private getTranslateState(xOrY: string = 'x') {
		let valueIndex = xOrY == 'x' ? 4 : 5;

		// get a value of transformX or transformY of swipableElement
		let state = parseInt(
			window.getComputedStyle(this.swipableElement)
				.getPropertyValue("transform")
				.match(/(-?[0-9\.]+)/g)[valueIndex])

		return state
	}
	private checkBaseStateIsNegative(xOrY: string = 'x') {
		let translateX = this.getTranslateState(xOrY)

		let xStateIsNegative = translateX >= 0 ? false : true

		return xStateIsNegative
	}
	private checkSwipableElementContainActive() {
		return this.swipableElement.classList.contains('active')
	}
}