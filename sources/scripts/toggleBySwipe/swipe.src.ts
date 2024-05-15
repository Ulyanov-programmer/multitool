import { elementIsExistWithLog } from '../generalFunctions.js'

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

export type SwipeAreaArgs = {
  /**
   * The selector of the `swipe-area` element for which the swipe will be active. 
   * Attention! The `swipe-area` element must have the `for-element` attribute, with the ID of the element that will move during the swipe.
   */
  selector: string
  /** 
   *  Which way do you need to swipe in order for the element to appear.
   */
  changePlane: ChangePlane
  /** 
    Specify the swipe size for successful switching.

    Accepts strings with the following units: `'%'` `'vw'` `'vh'`
    @example '15vw' | '15%' '25vh'
  */
  swipeSensitivity: string
  /** 
   * The maximum width of the viewport when a swipe will work.
   * 
   * Default value: `100000`
   */
  maxWorkWidth?: number
  isSwipedClass?: string
  isSwipedAreaClass?: string
  /**
   * A function that will trigger when the element is switched to open by swipe.
   * @param openedElement The element that was switched by swipe.
   */
  actionOnOpening?: (openedElement: HTMLElement) => any
  /**
   * A function that will trigger when the element is switched to close by swipe.
   * @param closedElement The element that was switched by swipe.
   */
  actionOnClosing?: (closedElement: HTMLElement) => any
}
/**
 * Version of arguments for Swipe Element with some optional versions fields.
 * @remark optional fields: `forElementId`
 */
export type ExportSwipeAreaArgs = Omit<
  SwipeAreaArgs,
  'forElementId'
> & {
  forElementId?: string
}

export default class SwipeArea {
  public isSwipedClass: string
  public isSwipedAreaClass: string
  public actionOnOpening: (openedElement: HTMLElement) => any
  public actionOnClosing: (closedElement: HTMLElement) => any
  private touchAreaElement: HTMLElement
  private swipeableElement: HTMLElement | HTMLDialogElement

  private startX: number = 0
  private startY: number = 0
  private startMouseX: number = 0
  private startMouseY: number = 0
  private deltaX: number = 0
  private deltaY: number = 0
  private changePlane: ChangePlane
  private currentSide: SwipeSide
  private argSwipeSensitivity: string
  private timeStamp: Number

  private minSwipeWidth: number
  private minSwipeHeight: number
  private maxWorkWidth: number
  private isElementSwiped: boolean = false


  constructor(arg: SwipeAreaArgs) {
    if (!elementIsExistWithLog('toggleBySwipe', arg.selector)) return

    this.isSwipedClass = arg.isSwipedClass ?? 'isSwiped'
    this.isSwipedAreaClass = arg.isSwipedAreaClass ?? 'isSwiped'
    this.actionOnOpening = arg.actionOnOpening
    this.actionOnClosing = arg.actionOnClosing

    this.touchAreaElement = document.querySelector(arg.selector)

    this.changePlane = arg.changePlane

    this.swipeableElement =
      document.getElementById(this.touchAreaElement.getAttribute('for-element'))

    this.argSwipeSensitivity = arg.swipeSensitivity
    this.setSwipeSensitivity()

    this.maxWorkWidth = arg.maxWorkWidth ?? 1e5

    this.checkMaxWorkWidth()
    window.addEventListener('resize', this.checkMaxWorkWidth.bind(this))
  }

  private setSwipeSensitivity() {
    if (this.argSwipeSensitivity.includes('%')) {
      let sensitivityValue = parseFloat(this.argSwipeSensitivity.replace('%', ''))

      this.minSwipeWidth = Math.trunc(
        this.swipeableElement.clientWidth * (sensitivityValue / 100)
      )
      this.minSwipeHeight = Math.trunc(
        this.swipeableElement.clientHeight * (sensitivityValue / 100)
      )
    }
    else if (this.argSwipeSensitivity.includes('vw')) {
      let sensitivityValue = parseFloat(this.argSwipeSensitivity.replace('vw', ''))

      this.minSwipeWidth = Math.trunc(
        window.innerWidth * (sensitivityValue / 100)
      )
      this.minSwipeHeight = Math.trunc(
        window.innerWidth * (sensitivityValue / 100)
      )
    }
    else if (this.argSwipeSensitivity.includes('vh')) {
      let sensitivityValue = parseFloat(this.argSwipeSensitivity.replace('vh', ''))

      this.minSwipeWidth = Math.trunc(
        window.innerHeight * (sensitivityValue / 100)
      )
      this.minSwipeHeight = Math.trunc(
        window.innerHeight * (sensitivityValue / 100)
      )
    }
    else {
      throw new Error('[toggleBySwipe] Incorrect swipe size specified!')
    }
  }

  private pointerDownHandler = ((event: PointerEvent) => {
    if (event.button != 0) return

    this.startX = 0
    this.startY = 0
    this.startMouseX = event.clientX
    this.startMouseY = event.clientY

    this.swipeableElement.style.userSelect = 'none'
    this.touchAreaElement.style.cursor = 'grabbing'

    document.documentElement.style.cursor = 'grabbing'

    window.addEventListener('pointermove', this.pointerMoveHandler)
    window.addEventListener('pointerup', this.swipeEndHandler)
  })

  private pointerMoveHandler = ((event: PointerEvent) => {
    if (!this.timeStamp) {
      window.requestAnimationFrame(timeStamp => {
        this.timeStamp = timeStamp
        this.swipeMove(event)
      })
    }
  })

  private swipeEndHandler = ((event: PointerEvent) => {
    this.swipeEnd(this.isElementSwiped, true)
  })


  private swipeMove(e: PointerEvent) {
    if (this.changePlane == ChangePlane.ToRight || this.changePlane == ChangePlane.ToLeft) {
      this.deltaX = Math.trunc(e.clientX - this.startMouseX)

      this.currentSide = this.deltaX >= 0
        ? SwipeSide.Left
        : SwipeSide.Right

      this.moveX()
    }
    else {
      this.deltaY = Math.trunc(e.clientY - this.startMouseY)

      this.currentSide = this.deltaY >= 0
        ? SwipeSide.Top
        : SwipeSide.Bottom

      this.moveY()
    }

    this.timeStamp = null
  }
  private isDeltaMoreThanMinValue(delta: number) {
    delta = Math.abs(delta)

    if (this.changePlane == ChangePlane.ToRight || this.changePlane == ChangePlane.ToLeft) {
      return delta >= this.minSwipeWidth
    }

    return delta >= this.minSwipeHeight
  }
  private swipeEnd(changeElementStateTo: boolean, isSwipeNotFully?: boolean) {
    this.swipeableElement.style.translate = ''

    window.removeEventListener('pointermove', this.pointerMoveHandler)

    this.swipeableElement.style.userSelect = ''
    this.touchAreaElement.style.cursor = ''

    document.documentElement.style.cursor = ''
    window.removeEventListener('pointerup', this.swipeEndHandler)

    if (!isSwipeNotFully) {
      this.swipeableElement.classList.toggle(this.isSwipedClass)
      this.touchAreaElement.classList.toggle(this.isSwipedAreaClass)
      this.isElementSwiped = !this.isElementSwiped

      if (changeElementStateTo) {
        //@ts-expect-error
        this.swipeableElement.showModal?.()
        this.actionOnOpening?.(this.swipeableElement)
      }
      else {
        //@ts-expect-error
        this.swipeableElement.close?.()
        this.actionOnClosing?.(this.swipeableElement)
      }
    }
  }

  private moveX(delta: number = this.deltaX) {
    // ? If the swipe goes for a hidden element
    if (!this.checkSwipeableElementContainActive()) {
      if (!this.isSwipeDirectionCorrectXAxis(false)) return

      this.swipeableElement.style.translate = `${delta}px ${this.startY}px 0`

      if (this.isDeltaMoreThanMinValue(delta)) {
        this.swipeEnd(true)
      }
    }
    else {
      // ? If the swipe goes for a visible element
      if (!this.isSwipeDirectionCorrectXAxis(true)) return

      this.swipeableElement.style.translate = `${delta}px ${this.startY}px 0`

      if (this.isDeltaMoreThanMinValue(delta)) {
        this.swipeEnd(false)
      }
    }
  }
  private moveY(delta: number = this.deltaY) {
    // ? If the swipe goes for a hidden element
    if (!this.checkSwipeableElementContainActive()) {
      if (!this.isSwipeDirectionCorrectYAxis(false)) return

      this.swipeableElement.style.translate = `${this.startX}px ${delta}px 0`

      if (this.isDeltaMoreThanMinValue(delta)) {
        this.swipeEnd(true)
      }
    }
    else {
      // ? If the swipe goes for a visible element
      if (!this.isSwipeDirectionCorrectYAxis(true)) return

      this.swipeableElement.style.translate = `${this.startX}px ${delta}px 0`

      if (this.isDeltaMoreThanMinValue(delta)) {
        this.swipeEnd(false)
      }
    }
  }

  private checkSwipeableElementContainActive() {
    //@ts-expect-error
    if (this.swipeableElement.open != undefined) return this.swipeableElement.open

    return this.swipeableElement.classList.contains(this.isSwipedClass)
  }
  private checkMaxWorkWidth() {
    if (window.innerWidth <= this.maxWorkWidth) {
      this.touchAreaElement.addEventListener('pointerdown', this.pointerDownHandler)
      this.touchAreaElement.style.cursor = ''

      window.addEventListener('pointerup', this.swipeEndHandler)
      this.setSwipeSensitivity()
    }
    else {
      this.touchAreaElement.removeEventListener('pointerdown', this.pointerDownHandler)
      this.touchAreaElement.style.cursor = 'auto'

      window.removeEventListener('pointerup', this.swipeEndHandler)
    }
  }
  private isSwipeDirectionCorrectXAxis(isElementSwiped: boolean): boolean {
    if (isElementSwiped) {
      if (
        this.changePlane == ChangePlane.ToLeft && this.currentSide == SwipeSide.Left
        || this.changePlane == ChangePlane.ToRight && this.currentSide == SwipeSide.Right
      ) {
        return true
      }
    }
    else if (
      this.changePlane == ChangePlane.ToLeft && this.currentSide == SwipeSide.Right
      || this.changePlane == ChangePlane.ToRight && this.currentSide == SwipeSide.Left
    ) {
      return true
    }

    return false
  }
  private isSwipeDirectionCorrectYAxis(isElementSwiped: boolean): boolean {
    if (isElementSwiped) {
      if (
        this.changePlane == ChangePlane.ToBottom && this.currentSide == SwipeSide.Bottom
        || this.changePlane == ChangePlane.ToTop && this.currentSide == SwipeSide.Top
      ) {
        return true
      }
    }
    else if (
      this.changePlane == ChangePlane.ToBottom && this.currentSide == SwipeSide.Top
      || this.changePlane == ChangePlane.ToTop && this.currentSide == SwipeSide.Bottom
    ) {
      return true
    }

    return false
  }
}