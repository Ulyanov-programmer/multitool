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
  private statusBlocks: NodeListOf<HTMLElement>
  private currentActiveBlockIndex: number
  private currentTranslateMultiplier: number
  private transitionTimeout: number
  private gapPercent: number
  private checkFunctions: checkFunctions


  constructor(arg: StepByStepArgs) {
    if (!elementIsExistWithLog('StepByStep', arg.stepsContainerSelector, arg.nextButtonsSelector, arg.prevButtonsSelector))
      return

    this.currentActiveBlockIndex = 0
    this.currentTranslateMultiplier = this.currentActiveBlockIndex
    this.transitionTimeout = arg.transitionTimeout ?? 500
    this.gapPercent = arg.gapPercent ?? 5
    this.checkFunctions = arg.checkFunctions

    this.initContainer(arg)
    this.initSteps()
    this.initButtons(arg)
    this.initStatusElements(arg)

    arg.form?.formElement?.addEventListener('submit', submitEvent =>
      arg.form.onSubmitFunction(submitEvent)
    )

    this.statusBlocks[this.currentActiveBlockIndex]?.classList.add('active')

    this.initRow()
  }


  private initButtons(arg: StepByStepArgs) {
    for (let nextButton of document.querySelectorAll(arg.nextButtonsSelector)) {
      nextButton.addEventListener('click', this.nextButtonEventHandler.bind(this))
    }
    for (let prevButton of document.querySelectorAll(arg.prevButtonsSelector)) {
      prevButton.addEventListener('click', this.togglePrevFormBlock.bind(this))
    }
  }
  private initContainer(arg: StepByStepArgs) {
    this.stepsContainer = document.querySelector(arg.stepsContainerSelector)

    this.stepsContainer.style.display = 'flex'
    this.stepsContainer.style.flexFlow = 'row nowrap'
    this.stepsContainer.style.overflowX = 'hidden'
    this.stepsContainer.style.height = '100%'
  }
  private initSteps() {
    this.stepBlocks = this.stepsContainer.children as HTMLCollectionOf<HTMLElement>

    for (let step of this.stepBlocks) {
      step.style.width = '100%'
      step.style.height = '100%'
      step.style.flexShrink = '0'
      step.style.transition = `transform ${this.transitionTimeout}ms ease`
    }
  }
  private initStatusElements(arg: StepByStepArgs) {
    this.statusBlocks = document.querySelectorAll(arg.statusBlocksSelector)
  }

  private initRow() {
    let activeElement = this.stepBlocks[this.currentActiveBlockIndex]
    let nextElement = this.stepBlocks[this.currentActiveBlockIndex + 1]

    if (!nextElement) return

    activeElement.style.transform = 'translateX(0%)'
    nextElement.style.transform = `translateX(${this.gapPercent}%)`
  }


  private toggleNextFormBlock() {
    let activeElement = this.getBlock(0),
      nextElement = this.getBlock(1, false),
      afterNextElement = this.getBlock(2, false)

    if (!nextElement) return

    this.currentTranslateMultiplier += 1

    activeElement.style.transform =
      `translateX(-${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`

    this.statusBlocks[this.currentActiveBlockIndex + 1]?.classList.add('active')

    this.currentActiveBlockIndex += 1

    nextElement.style.transform =
      `translateX(-${this.currentTranslateMultiplier * 100}%)`

    if (afterNextElement) {
      afterNextElement.style.transform =
        `translateX(-${this.currentTranslateMultiplier * 100 - this.gapPercent}%)`
    }
  }
  private togglePrevFormBlock() {
    let activeElement = this.getBlock(0),
      prevElement = this.getBlock(1, true),
      beforePrevElement = this.getBlock(2, true)

    if (!prevElement) return

    this.currentTranslateMultiplier -= 1

    let activeElementTransform =
      this.currentTranslateMultiplier * 100 - this.gapPercent

    if (activeElementTransform < 0) {
      activeElementTransform = this.gapPercent
      activeElement.style.transform = `translateX(${activeElementTransform}%)`
    }
    else {
      activeElement.style.transform = `translateX(-${activeElementTransform}%)`
    }

    this.statusBlocks[this.currentActiveBlockIndex]?.classList.remove('active')

    this.currentActiveBlockIndex -= 1

    prevElement.style.transform =
      `translateX(-${this.currentTranslateMultiplier * 100}%)`

    if (beforePrevElement) {
      beforePrevElement.style.transform =
        `translateX(-${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`
    }
  }

  private nextButtonEventHandler() {
    // Pulls the validation function intended for the currently active block
    let func = this.getFunctionForCurrentActiveBlock()
    let result = func ? func() : true

    // If the result of the function is a promise
    if (typeof result != 'boolean') {
      result.then(
        promiseValue => promiseValue ? this.toggleNextFormBlock() : false
      )
    }
    else if (result) this.toggleNextFormBlock()
  }


  private getBlock(howManyBlocksToSkip: number, prevOrNextElement?: boolean): HTMLElement {
    let block = prevOrNextElement
      ? this.stepBlocks[this.currentActiveBlockIndex - howManyBlocksToSkip]
      : this.stepBlocks[this.currentActiveBlockIndex + howManyBlocksToSkip]

    return block
  }
  private getFunctionForCurrentActiveBlock(): Function {
    if (!this.checkFunctions) {
      return undefined
    }
    else if (this.currentActiveBlockIndex == this.stepBlocks.length - 1) {
      return this.checkFunctions['final'] ?? undefined
    }

    return this.checkFunctions[this.currentActiveBlockIndex]
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
