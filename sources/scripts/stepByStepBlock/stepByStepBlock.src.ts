import { elementIsExistWithLog } from '../general.js'

/**
 * The function that will be executed before switching steps.
 * 
 * Function syntax:
 * @example 
 * ``` js
 * * // The function works before switching from a step with index 0 to another step.
 * 0: () => {
 *   return true
 * },
 * * // Instead of the step index, you can specify the keyword 'final' - the function will be used when switching (using the next step button) the last block.
 * final: () => {
 *   return false
 * },
 * ```
 */
type checkFunctions = {
  [stepBlockIndex: number | string]: () => boolean
}
interface StepByStepArgs {
  /**
   * A container-element selector for your step-elements.
   */
  stepsContainerSelector: string
  /**
   * Selector for buttons that take a step forward.
   */
  nextButtonsSelector: string
  /**
   * Selector for buttons that take a step back.
   */
  prevButtonsSelector: string
  /**
   * Specify the value in milliseconds if you want to specify the speed at which a step will be taken.
   * @defaultValue `500` (500ms)
   */
  transitionTimeout: number
  /**
   * If you use certain elements to indicate which step is active, specify their selector.
   */
  statusBlocksSelector?: string
  /**
   * Specify the index of the block that will be active initially.
   * @remark The index starts from 0.
   */
  currentActiveBlockIndex?: number
  /**
   * The indent in % of their width between the steps, which will be visible at the moment of switching them.
   * @defaultValue `5` (5%)
   */
  gapPercent?: number
  /**
   * Adds functions that will be started before the steps are switched.
   * With their help, for example, you can cancel the switch.
   * @remark Must return `true` or `false`. If `true` is returned, the block will be switched, otherwise it will not be.
   * 
   * Function syntax:
   * @example 
   * ``` js
   * * // The function works before switching from a step with index 0 to another step.
   * 0: () => {
   *   return true
   * },
   * * // Instead of the step index, you can specify the keyword 'final' - the function will be used when switching (using the next step button) the last block.
   * final: () => {
   *   return false
   * },
   * ```
   */
  checkFunctions?: checkFunctions
  /**
   * Add if your block with steps is a form and you want a certain function to be triggered when submitting the form.
   */
  form?: Form
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
  private checkFunctions: checkFunctions


  constructor(arg: StepByStepArgs) {
    if (!elementIsExistWithLog('StepByStep', arg.stepsContainerSelector, arg.nextButtonsSelector, arg.prevButtonsSelector))
      return

    this.stepsContainer = document.querySelector(arg.stepsContainerSelector)
    this.stepBlocks = this.stepsContainer.children as HTMLCollectionOf<HTMLElement>

    this.currentActiveBlockIndex = 0
    this.currentTranslateMultiplier = this.currentActiveBlockIndex
    this.transitionTimeout = arg.transitionTimeout ?? 500
    this.gapPercent = arg.gapPercent ?? 5
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
      nextButton.addEventListener('click', this.nextButtonEventHandler.bind(this))
    }
    for (let prevButton of this.prevButtons) {
      prevButton.addEventListener('click', this.togglePrevFormBlock.bind(this))
    }

    arg.form?.formElement.addEventListener('submit', (submitEvent: SubmitEvent) =>
      arg.form?.onSubmitFunction(submitEvent)
    )

    this.statusBlocksSelector[this.currentActiveBlockIndex]?.classList.add('active')


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

  private nextButtonEventHandler() {
    // Pulls the validation function intended for the currently active block
    let func = this.getFunctionForCurrentActiveBlock()
    let result = func()

    // If the result of the function is a promise
    if (typeof (result) != 'boolean') {
      result.then(
        (promiseValue: boolean) => {
          if (promiseValue) this.toggleNextFormBlock()
        }
      )
    }
    else if (result) {
      this.toggleNextFormBlock()
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


interface FormArgs {
  /**
   * Selector of your form.
   */
  formSelector: string
  /**
   * This function will be executed at the time the form is submitted (a `submit` form event).
   * @param submitEvent A SubmitEvent object that can be processed in a function.
   */
  onSubmitFunction: (submitEvent: SubmitEvent) => any
}
export class Form {
  public formElement: HTMLElement
  public onSubmitFunction: (submitEvent: SubmitEvent) => any

  constructor(arg: FormArgs) {
    if (!elementIsExistWithLog('[StepByStep Form]', arg.formSelector))
      return

    this.formElement = document.querySelector(arg.formSelector)
    this.onSubmitFunction = arg.onSubmitFunction
  }
}
