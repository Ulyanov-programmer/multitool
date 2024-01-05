import { elementIsExistWithLog, sleep } from '../general.js'

export enum Direction {
  toRight,
  toLeft,
  toTop,
  toBottom,
}

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
  transitionDuration?: number

  transitionTimingFunction?: string
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

  direction?: Direction
  switchCurrentBlockByClickOnStatus?: boolean
}
export default class StepByStepBlock {
  private stepsContainer: HTMLElement
  private stepBlocks: HTMLCollectionOf<HTMLElement>
  private statusBlocks: NodeListOf<HTMLElement>
  private prevButtons: NodeListOf<HTMLButtonElement>
  private nextButtons: NodeListOf<HTMLButtonElement>
  private currentActiveBlockIndex: number
  private currentTranslateMultiplier: number
  private transitionDuration: number
  private gapPercent: number
  private checkFunctions: checkFunctions
  private direction: Direction
  private transitionTimingFunction: string
  private readonly activeStepClass: string = 'active-step'
  private readonly completedStepClass: string = 'completed'

  constructor(arg: StepByStepArgs) {
    if (!elementIsExistWithLog('StepByStep', arg.stepsContainerSelector, arg.nextButtonsSelector, arg.prevButtonsSelector))
      return

    this.currentActiveBlockIndex = 0
    this.currentTranslateMultiplier = this.currentActiveBlockIndex

    this.transitionDuration = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches ? 0 : arg.transitionDuration ?? 500

    this.gapPercent = arg.gapPercent ?? 5
    this.checkFunctions = arg.checkFunctions
    this.direction = arg.direction ?? Direction.toRight
    this.transitionTimingFunction = arg.transitionTimingFunction ?? 'ease-in-out'

    this.initContainer(arg)
    this.initSteps()
    this.initButtons(arg)
    this.initStatusElements(arg)

    arg.form?.formElement?.addEventListener('submit', submitEvent =>
      arg.form.onSubmitFunction(submitEvent)
    )

    this.statusBlocks[this.currentActiveBlockIndex]?.classList.add(this.activeStepClass)

    this.initStepsByDirection()
  }


  private initButtons(arg: StepByStepArgs) {
    this.nextButtons = document.querySelectorAll(arg.nextButtonsSelector)
    this.prevButtons = document.querySelectorAll(arg.prevButtonsSelector)

    for (let nextButton of this.nextButtons) {
      nextButton.addEventListener('click', this.toNextStepHandler.bind(this))
    }

    this.changeInactiveButtonsIfFirstOrLastStep()

    for (let prevButton of this.prevButtons) {
      prevButton.addEventListener('click', this.toPreviousStepHandler.bind(this))
    }
  }
  private initContainer(arg: StepByStepArgs) {
    this.stepsContainer = document.querySelector(arg.stepsContainerSelector)

    this.stepsContainer.style.display = 'flex'
    this.stepsContainer.style.width = '100%'
    this.stepsContainer.style.flexWrap = 'nowrap'

    if (this.direction == Direction.toRight || this.direction == Direction.toLeft)
      this.stepsContainer.style.overflowX = 'hidden'
    else
      this.stepsContainer.style.overflowY = 'hidden'

    switch (this.direction) {
      case Direction.toLeft:
        this.stepsContainer.style.flexDirection = 'row-reverse'
        break
      case Direction.toBottom:
        this.stepsContainer.style.flexDirection = 'column'
        break
      case Direction.toTop:
        this.stepsContainer.style.flexDirection = 'column-reverse'
        break

      default:
        this.stepsContainer.style.flexDirection = 'row'
        break
    }
  }
  private initSteps() {
    this.stepBlocks = this.stepsContainer.children as HTMLCollectionOf<HTMLElement>

    for (let step of this.stepBlocks) {
      step.style.width = '100%'
      step.style.height = '100%'
      step.style.flexShrink = '0'
      step.style.flexGrow = '1'
      step.style.transition =
        `transform ${this.transitionDuration}ms ${this.transitionTimingFunction}`

      step.setAttribute('aria-current', 'false')
    }

    this.stepBlocks[0].setAttribute('aria-current', 'true')
  }
  private initStatusElements(arg: StepByStepArgs) {
    this.statusBlocks = document.querySelectorAll(arg.statusBlocksSelector)

    if (!arg.switchCurrentBlockByClickOnStatus) return

    for (let i = 0; i < this.statusBlocks.length; i++) {
      if (!this.statusBlocks[i].dataset.controls) {
        this.statusBlocks[i].dataset.controls = i.toString()
      }

      this.statusBlocks[i].role = 'button'
      this.statusBlocks[i].addEventListener('click', this.statusButtonEventHandler.bind(this))
      this.toggleCompletedStatusBlock(this.statusBlocks[i], false)
    }
  }

  private initStepsByDirection() {
    let activeElement = this.stepBlocks[this.currentActiveBlockIndex]
    let nextElement = this.stepBlocks[this.currentActiveBlockIndex + 1]

    if (!nextElement) return

    if (this.direction == Direction.toRight || this.direction == Direction.toLeft)
      activeElement.style.transform = 'translateX(0%)'
    else
      activeElement.style.transform = 'translateY(0%)'

    switch (this.direction) {
      case Direction.toLeft:
        nextElement.style.transform = `translateX(-${this.gapPercent}%)`
        break
      case Direction.toTop:
        nextElement.style.transform = `translateY(-${this.gapPercent}%)`
        break
      case Direction.toBottom:
        nextElement.style.transform = `translateY(${this.gapPercent}%)`
        break

      default:
        nextElement.style.transform = `translateX(${this.gapPercent}%)`
        break
    }
  }

  private toggleToNextBlock() {
    let firstBlock = this.getBlock(0),
      nextBlock = this.getBlock(1, false)

    if (!nextBlock) return

    this.currentTranslateMultiplier += 1
    firstBlock.setAttribute('aria-current', 'false')
    firstBlock.classList.remove(this.activeStepClass)
    firstBlock.classList.add(this.completedStepClass)

    nextBlock.setAttribute('aria-current', 'true')
    nextBlock.classList.add(this.activeStepClass)

    this.moveSteps(firstBlock, nextBlock, this.getBlock(2, false), true)

    this.toggleCompletedStatusBlock(
      this.statusBlocks[this.currentActiveBlockIndex] ?? undefined,
      true
    )

    this.toggleActiveStatusBlock(true)
    this.changeInactiveButtonsIfFirstOrLastStep()
  }
  private toggleToPreviousBlock() {
    let activeBlock = this.getBlock(0),
      prevBlock = this.getBlock(1, true)

    if (!prevBlock) return

    this.currentTranslateMultiplier -= 1
    activeBlock.setAttribute('aria-current', 'false')
    activeBlock.classList.remove(this.activeStepClass)

    prevBlock.setAttribute('aria-current', 'true')
    prevBlock.classList.add(this.activeStepClass)
    prevBlock.classList.remove(this.completedStepClass)

    this.moveSteps(activeBlock, prevBlock, this.getBlock(2, true), false)

    this.toggleActiveStatusBlock(false)

    this.toggleCompletedStatusBlock(
      this.statusBlocks[this.currentActiveBlockIndex] ?? undefined,
      false
    )

    this.changeInactiveButtonsIfFirstOrLastStep()
  }
  private moveSteps(
    activeElement: HTMLElement,
    nextElement: HTMLElement,
    afterNextElement: HTMLElement,
    moveTo: boolean
  ) {
    let [activeItemTranslate, nextItemTranslate, nextAfterNextTranslate] =
      this.getTranslateValuesForSteps(moveTo)

    activeElement.style.transform = activeItemTranslate
    nextElement.style.transform = nextItemTranslate

    if (afterNextElement)
      afterNextElement.style.transform = nextAfterNextTranslate
  }

  private toNextStepHandler() {
    // Pulls the validation function intended for the currently active block
    let func = this.getFunctionForCurrentActiveBlock()
    let result = func ? func() : true

    // If the result of the function is a promise
    if (typeof result != 'boolean') {
      result.then(
        promiseValue => promiseValue ? this.toggleToNextBlock() : false
      )
    }
    else if (result) this.toggleToNextBlock()

    this.changeInactiveButtonsIfFirstOrLastStep()
  }
  private toPreviousStepHandler() {
    this.changeInactiveButtonsIfFirstOrLastStep()
    this.toggleToPreviousBlock()
  }
  private async statusButtonEventHandler(event: MouseEvent) {
    let target = event.target as HTMLElement
    let delta: number
    let controlsSmallerThanCurrentIndex =
      parseInt(target.dataset.controls) < this.currentActiveBlockIndex

    if (parseInt(target.dataset.controls) == this.currentActiveBlockIndex) return

    delta = controlsSmallerThanCurrentIndex
      ? this.currentActiveBlockIndex - (parseInt(target.dataset.controls))
      : delta = parseInt(target.dataset.controls) - this.currentActiveBlockIndex

    if (delta > 1) this.setNullTransitionForSteps()

    for (let i = 0; i < delta; i++) {
      controlsSmallerThanCurrentIndex
        ? this.toggleToPreviousBlock()
        : this.toNextStepHandler()
    }

    await sleep(100)
    this.setDefaultTransitionForSteps()
  }

  private changeInactiveButtonsIfFirstOrLastStep() {
    if (this.currentActiveBlockIndex == 0) {
      this.disableButtons(this.prevButtons)
    }
    else if (this.currentActiveBlockIndex == this.stepBlocks.length - 1) {
      this.disableButtons(this.nextButtons)
    }
    // if no button should be disabled but there are disabled ones
    else if (this.prevButtons[0].disabled) {
      this.enableButtons(this.prevButtons)
    }
    else if (this.nextButtons[0].disabled) {
      this.enableButtons(this.nextButtons)
    }
  }
  private enableButtons(buttons: NodeListOf<HTMLButtonElement>) {
    for (let button of buttons) {
      button.disabled = false
      button.style.pointerEvents = ''
    }
  }
  private disableButtons(buttons: NodeListOf<HTMLButtonElement>) {
    for (let button of buttons) {
      button.disabled = true
      button.style.pointerEvents = 'none'
    }
  }

  private toggleActiveStatusBlock(toggleToNextOrPrev: boolean) {
    this.statusBlocks[this.currentActiveBlockIndex]?.
      classList.remove(this.activeStepClass)

    toggleToNextOrPrev
      ? this.currentActiveBlockIndex += 1
      : this.currentActiveBlockIndex -= 1

    this.statusBlocks[this.currentActiveBlockIndex]?.
      classList.add(this.activeStepClass)
  }
  private toggleCompletedStatusBlock(block: HTMLElement, toggleTo: boolean) {
    if (!block) return

    if (toggleTo) {
      block.classList.add(this.completedStepClass)
      block.style.pointerEvents = ''

      return
    }

    block.classList.remove(this.completedStepClass)
    block.style.pointerEvents = 'none'
  }

  private getTranslateValuesForSteps(toggleTo: boolean): Array<string> {
    let activeElementTransform =
      this.currentTranslateMultiplier * 100 - this.gapPercent

    if (toggleTo) {
      switch (this.direction) {
        case Direction.toLeft:
          return [
            // translate for the active item
            `translateX(${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`,
            // translate for next item
            `translateX(${this.currentTranslateMultiplier * 100}%)`,
            // translate for the next after the next item
            `translateX(${this.currentTranslateMultiplier * 100 - this.gapPercent}%)`
          ]
          break
        case Direction.toBottom:
          return [
            // translate for the active item
            `translateY(-${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`,
            // translate for next item
            `translateY(-${this.currentTranslateMultiplier * 100}%)`,
            // translate for the next after the next item
            `translateY(-${this.currentTranslateMultiplier * 100 - this.gapPercent}%)`
          ]
          break
        case Direction.toTop:
          return [
            // translate for the active item
            `translateY(${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`,
            // translate for next item
            `translateY(${this.currentTranslateMultiplier * 100}%)`,
            // translate for the next after the next item
            `translateY(${this.currentTranslateMultiplier * 100 - this.gapPercent}%)`
          ]
          break

        default:
          return [
            `translateX(-${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`,
            `translateX(-${this.currentTranslateMultiplier * 100}%)`,
            `translateX(-${this.currentTranslateMultiplier * 100 - this.gapPercent}%)`
          ]
          break
      }
    }

    switch (this.direction) {
      case Direction.toLeft:
        return [
          activeElementTransform < 0
            ? `translateX(-${this.gapPercent}%)`
            : `translateX(${activeElementTransform}%)`,
          `translateX(${this.currentTranslateMultiplier * 100}%)`,
          `translateX(${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`
        ]
        break
      case Direction.toBottom:
        return [
          activeElementTransform < 0
            ? `translateY(${this.gapPercent}%)`
            : `translateY(-${activeElementTransform}%)`,
          `translateY(-${this.currentTranslateMultiplier * 100}%)`,
          `translateY(-${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`
        ]
        break
      case Direction.toTop:
        return [
          activeElementTransform < 0
            ? `translateY(-${this.gapPercent}%)`
            : `translateY(${activeElementTransform}%)`,
          `translateY(${this.currentTranslateMultiplier * 100}%)`,
          `translateY(${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`
        ]
        break

      default:
        return [
          activeElementTransform < 0
            ? `translateX(${this.gapPercent}%)`
            : `translateX(-${activeElementTransform}%)`,
          `translateX(-${this.currentTranslateMultiplier * 100}%)`,
          `translateX(-${this.currentTranslateMultiplier * 100 + this.gapPercent}%)`
        ]
        break
    }
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
  private setNullTransitionForSteps() {
    for (let step of this.stepBlocks) {
      step.style.transitionDuration = `0ms`
    }
  }
  private setDefaultTransitionForSteps() {
    for (let step of this.stepBlocks) {
      step.style.transitionDuration = this.transitionDuration + 'ms'
      step.style.transitionTimingFunction = this.transitionTimingFunction
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
