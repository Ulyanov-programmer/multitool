import { elementIsExistWithLog } from "./general.js"

interface StepByStepArgs {
	stepsContainerSelector: string
	nextButtonsSelector: string
	prevButtonsSelector: string
	dependentBlocksSelector: string
	currentActiveBlockIndex?: number
	transitionTimeout: number
	gapPercent?: number
}

export default class StepByStepBlock {
	private stepsContainer: HTMLElement
	private stepBlocks: HTMLCollectionOf<HTMLElement>
	private prevButtons: NodeListOf<HTMLElement>
	private nextButtons: NodeListOf<HTMLElement>
	private dependentBlocks: NodeListOf<HTMLElement>
	private currentActiveBlockIndex: number
	private currentTranslateMultipler: number
	private transitionTimeout: number
	private gapPercent: number


	constructor(arg: StepByStepArgs) {
		if (!elementIsExistWithLog('StepByStep', arg.stepsContainerSelector, arg.nextButtonsSelector, arg.prevButtonsSelector))
			return

		this.stepsContainer = document.querySelector(arg.stepsContainerSelector)
		this.stepBlocks = this.stepsContainer.children as HTMLCollectionOf<HTMLElement>

		this.currentActiveBlockIndex = 0
		this.currentTranslateMultipler = this.currentActiveBlockIndex
		this.transitionTimeout = arg.transitionTimeout ? arg.transitionTimeout : 500
		this.gapPercent = arg.gapPercent ? arg.gapPercent : 5

		this.dependentBlocks = document.querySelectorAll(arg.dependentBlocksSelector)
		this.nextButtons = document.querySelectorAll(arg.nextButtonsSelector)
		this.prevButtons = document.querySelectorAll(arg.prevButtonsSelector)


		this.stepsContainer.style.display = 'flex'
		this.stepsContainer.style.flexFlow = 'row nowrap'
		this.stepsContainer.style.overflowX = 'hidden'

		for (let stepBlock of this.stepBlocks) {
			stepBlock.style.transition = `transform ${this.transitionTimeout}ms ease`
		}
		for (let nextButton of this.nextButtons) {
			nextButton.addEventListener('click', this.toggleNextFormBlock)
		}
		for (let prevButton of this.prevButtons) {
			prevButton.addEventListener('click', this.togglePrevFormBlock)
		}

		this.dependentBlocks[this.currentActiveBlockIndex].classList.add('active')


		this.initFormBlocksRow()
	}

	private initFormBlocksRow() {
		let activeElement = this.stepBlocks[this.currentActiveBlockIndex]
		let nextElement = this.stepBlocks[this.currentActiveBlockIndex + 1]

		if (nextElement == undefined)
			return

		activeElement.style.transform = `translateX(0%)`
		nextElement.style.transform = `translateX(${this.gapPercent}%)`
	}


	private toggleNextFormBlock() {
		let activeElement = this.getActiveBlock()
		let nextElement = this.getSecondBlock(true)
		let afterNextElement = this.getThriedBlock(true)

		let activeDependentBlock = this.dependentBlocks[this.currentActiveBlockIndex + 1]

		if (nextElement == undefined)
			return


		this.currentTranslateMultipler += 1

		activeElement.style.transform = `translateX(-${this.currentTranslateMultipler * 100 + this.gapPercent}%)`
		if (activeDependentBlock) {
			activeDependentBlock.classList.add('active')
		}

		this.currentActiveBlockIndex += 1

		nextElement.style.transform = `translateX(-${this.currentTranslateMultipler * 100}%)`

		if (afterNextElement) {
			afterNextElement.style.transform = `translateX(-${this.currentTranslateMultipler * 100 - this.gapPercent}%)`
		}
	}
	private togglePrevFormBlock() {
		let activeElement = this.getActiveBlock()
		let prevElement = this.getSecondBlock(false)
		let beforePrevElement = this.getThriedBlock(false)

		let activeDependentBlock = this.dependentBlocks[this.currentActiveBlockIndex + 1]

		if (prevElement == undefined)
			return

		this.currentTranslateMultipler -= 1

		let activeElementTransform = this.currentTranslateMultipler * 100 - this.gapPercent

		if (activeElementTransform < 0) {
			activeElementTransform = 5
			activeElement.style.transform = `translateX(${activeElementTransform}%)`
		} else {
			activeElement.style.transform = `translateX(-${activeElementTransform}%)`
		}

		if (activeDependentBlock) {
			activeDependentBlock.classList.remove('active')
		}


		this.currentActiveBlockIndex -= 1

		prevElement.style.transform = `translateX(-${this.currentTranslateMultipler * 100}%)`

		if (beforePrevElement) {
			beforePrevElement.style.transform = `translateX(-${this.currentTranslateMultipler * 100 + this.gapPercent}%)`
		}
	}


	private getActiveBlock(): HTMLElement {
		let activeElement = this.stepBlocks[this.currentActiveBlockIndex]

		return activeElement
	}
	private getSecondBlock(prevOrNextElement: boolean): HTMLElement {
		let multipler = this.returnMultipler(prevOrNextElement)

		let prevElement = this.stepBlocks[eval(`${this.currentActiveBlockIndex} ${multipler} 1`)]

		return prevElement
	}
	private getThriedBlock(prevOrNextElement: boolean): HTMLElement {
		let multipler = this.returnMultipler(prevOrNextElement)


		let beforePrevElement = this.stepBlocks[eval(`${this.currentActiveBlockIndex} ${multipler} 2`)]

		return beforePrevElement
	}

	private returnMultipler(prevOrNextElement: boolean): string {
		if (prevOrNextElement) {
			return '-'
		} else {
			return '+'
		}
	}
}

