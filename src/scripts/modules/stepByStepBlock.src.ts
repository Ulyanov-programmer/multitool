import { elementIsExistWithLog } from './general.js'

interface StepByStepArgs {
  stepsContainerSelector: string
  nextButtonsSelector: string
  prevButtonsSelector: string
  transitionTimeout: number
  statusBlocksSelector?: string
  currentActiveBlockIndex?: number
  gapPercent?: number
  checkFunctions?: {}
}

export default class StepByStepBlock {
  private stepsContainer: HTMLElement
  private stepBlocks: HTMLCollectionOf<HTMLElement>
  private prevButtons: NodeListOf<HTMLElement>
  private nextButtons: NodeListOf<HTMLElement>
  private statusBlocksSelector: NodeListOf<HTMLElement>
  private currentActiveBlockIndex: number
  private currentTranslateMultiplier: number
  private transitionTimeout: number
  private gapPercent: number
  private checkFunctions: {}


  constructor(arg: StepByStepArgs) {
    if (!elementIsExistWithLog('StepByStep', arg.stepsContainerSelector, arg.nextButtonsSelector, arg.prevButtonsSelector))
      return

    this.stepsContainer = document.querySelector(arg.stepsContainerSelector)
    this.stepBlocks = this.stepsContainer.children as HTMLCollectionOf<HTMLElement>

    this.currentActiveBlockIndex = 0
    this.currentTranslateMultiplier = this.currentActiveBlockIndex
    this.transitionTimeout = arg.transitionTimeout ? arg.transitionTimeout : 500
    this.gapPercent = arg.gapPercent ? arg.gapPercent : 5
    this.checkFunctions = arg.checkFunctions

    this.statusBlocksSelector = document.querySelectorAll(arg.statusBlocksSelector)
    this.nextButtons = document.querySelectorAll(arg.nextButtonsSelector)
    this.prevButtons = document.querySelectorAll(arg.prevButtonsSelector)


    this.stepsContainer.style.display = 'flex'
    this.stepsContainer.style.flexFlow = 'row nowrap'
    this.stepsContainer.style.overflowX = 'hidden'

    for (let stepBlock of this.stepBlocks) {
      stepBlock.style.transition = `transform ${this.transitionTimeout}ms ease`
    }
    for (let nextButton of this.nextButtons) {
      nextButton.addEventListener('click', () => {
        // Uses the verification function set for the active block
        let func = this.getFunctionForCurrentActiveBlock()
        let result = func()

        if (typeof (result) != 'boolean') {
          result.then((promiseValue: boolean) => {
            if (promiseValue) {
              this.toggleNextFormBlock()
            }
          })
        }
        else if (result) {
          this.toggleNextFormBlock()
        }
      })
    }
    for (let prevButton of this.prevButtons) {
      prevButton.addEventListener('click', this.togglePrevFormBlock.bind(this))
    }

    if (arg.statusBlocksSelector) {
      this.statusBlocksSelector[this.currentActiveBlockIndex].classList.add('active')
    }


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
    let nextElement = this.getSecondBlock(false)
    let afterNextElement = this.getThirdBlock(false)

    let activeDependentBlock = this.statusBlocksSelector[this.currentActiveBlockIndex + 1]

    if (nextElement == undefined)
      return


    this.currentTranslateMultiplier += 1

    activeElement.style.transform = `translateX(-${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`
    if (activeDependentBlock) {
      activeDependentBlock.classList.add('active')
    }

    this.currentActiveBlockIndex += 1

    nextElement.style.transform = `translateX(-${this.currentTranslateMultiplier * 100}%)`

    if (afterNextElement) {
      afterNextElement.style.transform = `translateX(-${this.currentTranslateMultiplier * 100 - this.gapPercent}%)`
    }
  }
  private togglePrevFormBlock() {
    let activeElement = this.getActiveBlock()
    let prevElement = this.getSecondBlock(true)
    let beforePrevElement = this.getThirdBlock(true)

    let activeDependentBlock = this.statusBlocksSelector[this.currentActiveBlockIndex]

    if (prevElement == undefined)
      return

    this.currentTranslateMultiplier -= 1

    let activeElementTransform = this.currentTranslateMultiplier * 100 - this.gapPercent

    if (activeElementTransform < 0) {
      activeElementTransform = this.gapPercent
      activeElement.style.transform = `translateX(${activeElementTransform}%)`
    } else {
      activeElement.style.transform = `translateX(-${activeElementTransform}%)`
    }

    if (activeDependentBlock) {
      activeDependentBlock.classList.remove('active')
    }


    this.currentActiveBlockIndex -= 1

    prevElement.style.transform = `translateX(-${this.currentTranslateMultiplier * 100}%)`

    if (beforePrevElement) {
      beforePrevElement.style.transform = `translateX(-${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`
    }
  }


  private getActiveBlock(): HTMLElement {
    let activeElement = this.stepBlocks[this.currentActiveBlockIndex]

    return activeElement
  }
  private getSecondBlock(prevOrNextElement: boolean): HTMLElement {
    let multiplier = this.returnMultiplier(prevOrNextElement)

    let prevElement = this.stepBlocks[eval(`${this.currentActiveBlockIndex} ${multiplier} 1`)]

    return prevElement
  }
  private getThirdBlock(prevOrNextElement: boolean): HTMLElement {
    let multiplier = this.returnMultiplier(prevOrNextElement)


    let beforePrevElement = this.stepBlocks[eval(`${this.currentActiveBlockIndex} ${multiplier} 2`)]

    return beforePrevElement
  }
  private getFunctionForCurrentActiveBlock(): Function {
    if (this.currentActiveBlockIndex == this.stepBlocks.length - 1 &&
      this.checkFunctions['final']) {
      return this.checkFunctions['final']
    }
    else if (this.checkFunctions == undefined) {
      return () => true
    }
    else {
      return this.checkFunctions[this.currentActiveBlockIndex]
    }

  }

  private returnMultiplier(prevOrNextElement: boolean): string {
    if (prevOrNextElement) {
      return '-'
    } else {
      return '+'
    }
  }
}

