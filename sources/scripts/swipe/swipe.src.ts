import { elementIsExistWithLog } from '../general.js'

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

export type SwipeElementArgs = {
  /** 
   * The selector of the element by which the swipe is supposed to be.
   */
  touchStartAreaSelector: string
  /**
   * The element that will be displayed after the full swipe.
   */
  swipeableElementSelector: string
  /** 
   * Which way you need to swipe your finger to make the element appear.
   */
  changePlane: ChangePlane
  /** 
   * The higher or lower the value, the more or less you need to swipe in order 
   * for the menu to appear. Usually the values range from `0.5` to `0.7`.
   */
  swipeSensitivity: number
  /** 
   * The maximum width of the viewport when a swipe will work.
   */
  maxWorkWidth: number
  transition?: string
  isSwipedClass?: string
  isSwipedForAreaClass?: string
  startPosition?: string
}
/**
 * Version of arguments for Swipe Element with some optional versions fields.
 * @remark optional fields: `touchStartAreaSelector` and `swipeableElementSelector`
 */
export type ExportSwipeElementArgs = Omit<
  SwipeElementArgs,
  'touchStartAreaSelector' |
  'swipeableElementSelector'
> &
{
  touchStartAreaSelector?: string
  swipeableElementSelector?: string
}

export default class SwipeElement {
  public isSwipedClass: string
  public isSwipedForAreaClass: string
  private touchAreaElement: HTMLElement
  private swipeableElement: HTMLElement

  private startX: number = 0
  private startY: number = 0
  private startMouseX: number = 0
  private startMouseY: number = 0
  private deltaX: number = 0
  private deltaY: number = 0
  private changePlane: ChangePlane
  private changeOrientation: ChangeOrientation
  private currentSide: SwipeSide

  private minSwipeWidth: number
  private minSwipeHeight: number
  private swipeSensitivity: number
  private maxWorkWidth: number


  constructor(arg: SwipeElementArgs) {
    if (!elementIsExistWithLog(arg.touchStartAreaSelector, arg.swipeableElementSelector)) {
      console.log('[SwipeElement] Some elements is not exist!')
      return
    }

    this.isSwipedClass = arg.isSwipedClass ?? 'isSwiped'
    this.isSwipedForAreaClass = arg.isSwipedForAreaClass ?? 'isSwiped'

    this.touchAreaElement = document.querySelector(arg.touchStartAreaSelector)
    this.touchAreaElement.style.touchAction = 'none'
    this.touchAreaElement.style.cursor = 'grab'
    this.touchAreaElement.style.userSelect = 'none'

    this.changePlane = arg.changePlane

    if (this.changePlane == ChangePlane.ToLeft || this.changePlane == ChangePlane.ToRight) {
      this.changeOrientation = ChangeOrientation.Horizontal
    } else {
      this.changeOrientation = ChangeOrientation.Vertical
    }

    this.swipeableElement = document.querySelector(arg.swipeableElementSelector)
    this.swipeableElement.style.transition = arg.transition ?? 'transform 300ms ease'
    this.setStartPositionStateForSwipeableElement()
    this.swipeSensitivity = arg.swipeSensitivity
    this.maxWorkWidth = arg.maxWorkWidth

    this.minSwipeWidth = Math.trunc(this.swipeableElement.clientWidth * this.swipeSensitivity)
    this.minSwipeHeight = Math.trunc(this.swipeableElement.clientHeight * this.swipeSensitivity)


    this.checkMaxWorkWidth()
    window.addEventListener('resize', this.checkMaxWorkWidth.bind(this))
  }

  private pointerDownHandler = ((event: PointerEvent) => {
    if (event.button != 0) return

    this.startX = 0
    this.startY = 0
    this.startMouseX = event.clientX
    this.startMouseY = event.clientY

    this.swipeableElement.style.userSelect = 'none'
    this.touchAreaElement.style.cursor = 'grabbing'

    window.addEventListener('pointermove', this.pointerMoveHandler)
  }).bind(this)

  private pointerMoveHandler = ((event: PointerEvent) => {
    document.documentElement.style.cursor = 'grabbing'

    this.swipeMove(event)
  }).bind(this)

  private pointerUpHandler = ((event: PointerEvent) => {
    this.swipeableElement.style.userSelect = ''
    this.touchAreaElement.style.cursor = 'grab'
    document.documentElement.style.cursor = ''

    this.checkIsSwipeEnd(0, false, true)
  }).bind(this)


  private setStartPositionStateForSwipeableElement() {
    if (this.changeOrientation == ChangeOrientation.Horizontal) {
      if (this.changePlane == ChangePlane.ToLeft) {
        this.swipeableElement.style.left = '100%'
        this.swipeableElement.style.right = 'unset'
      }
      else if (this.changePlane == ChangePlane.ToRight) {
        this.swipeableElement.style.right = '100%'
        this.swipeableElement.style.left = 'unset'
      }
    } else {
      if (this.changePlane == ChangePlane.ToBottom) {
        this.swipeableElement.style.bottom = '100%'
        this.swipeableElement.style.top = 'unset'
      }
      else if (this.changePlane == ChangePlane.ToTop) {
        this.swipeableElement.style.top = '100%'
        this.swipeableElement.style.bottom = 'unset'
      }
    }
  }
  private setEndTranslateStateForSwipeableElement() {
    if (this.changeOrientation == ChangeOrientation.Horizontal) {
      if (this.changePlane == ChangePlane.ToLeft) {
        this.swipeableElement.style.transform = 'translate3d(-100%, 0, 0)'
      }
      else if (this.changePlane == ChangePlane.ToRight) {
        this.swipeableElement.style.transform = 'translate3d(100%, 0, 0)'
      }
    } else {
      if (this.changePlane == ChangePlane.ToBottom) {
        this.swipeableElement.style.transform = 'translate3d(0, 100%, 0)'
      }
      else if (this.changePlane == ChangePlane.ToTop) {
        this.swipeableElement.style.transform = 'translate3d(0, -100%, 0)'
      }
    }
  }


  private swipeMove(e: PointerEvent) {
    if (this.changeOrientation == ChangeOrientation.Horizontal) {
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
  }
  private checkIsSwipeEnd(delta: number, changeSwipeEndStateTo: boolean, isSwipeEnd?: boolean) {
    delta = Math.abs(delta)

    if (
      this.changeOrientation == ChangeOrientation.Horizontal && delta >= this.minSwipeWidth
      || this.changeOrientation == ChangeOrientation.Vertical && delta >= this.minSwipeHeight
    ) {
      changeSwipeEndStateTo
        ? this.setEndTranslateStateForSwipeableElement()
        : this.swipeableElement.style.transform = 'translate3d(0, 0, 0)'

      this.swipeableElement.classList.toggle(this.isSwipedClass)
      this.touchAreaElement.classList.toggle(this.isSwipedForAreaClass)

      window.removeEventListener('pointermove', this.pointerMoveHandler)
    }

    if (isSwipeEnd) {
      this.swipeableElement.classList.contains(this.isSwipedClass)
        ? this.setEndTranslateStateForSwipeableElement()
        : this.swipeableElement.style.transform = ''

      window.removeEventListener('pointermove', this.pointerMoveHandler)
    }
  }

  private moveX(delta: number = this.deltaX) {
    // ? If the swipe goes for a hidden element
    if (this.checkSwipeableElementContainActive() == false) {
      if (
        this.changePlane == ChangePlane.ToLeft && this.currentSide == SwipeSide.Left
        || this.changePlane == ChangePlane.ToRight && this.currentSide == SwipeSide.Right
      ) return


      this.swipeableElement.style.transform = `translate3d(
				${delta}px, ${this.startY}px, 0)`

      this.checkIsSwipeEnd(delta, true)
    }
    else {
      // ? If the swipe goes for a visible element
      if (
        this.changePlane == ChangePlane.ToLeft && this.currentSide == SwipeSide.Right
        || this.changePlane == ChangePlane.ToRight && this.currentSide == SwipeSide.Left
      ) return

      let result: number

      this.changePlane == ChangePlane.ToRight
        ? result = delta + this.swipeableElement.clientWidth
        : result = delta - this.swipeableElement.clientWidth

      this.swipeableElement.style.transform = `translate3d(
				${result}px, ${this.startY}px, 0)`

      this.checkIsSwipeEnd(delta, false)
    }
  }
  private moveY(delta: number = this.deltaY) {
    // ? If the swipe goes for a hidden element
    if (this.checkSwipeableElementContainActive() == false) {
      if (
        this.changePlane == ChangePlane.ToBottom && this.currentSide == SwipeSide.Bottom
        || this.changePlane == ChangePlane.ToTop && this.currentSide == SwipeSide.Top
      ) return

      this.swipeableElement.style.transform = `translate3d(
				${this.startX}px, ${delta}px, 0)`

      this.checkIsSwipeEnd(delta, true)
    }
    else {
      // ? If the swipe goes for a visible element
      if (
        this.changePlane == ChangePlane.ToBottom && this.currentSide == SwipeSide.Top
        || this.changePlane == ChangePlane.ToTop && this.currentSide == SwipeSide.Bottom
      ) return

      let result: number

      this.changePlane == ChangePlane.ToBottom
        ? result = delta + this.swipeableElement.clientHeight
        : result = delta - this.swipeableElement.clientHeight

      this.swipeableElement.style.transform = `translate3d(
        ${this.startX}px, ${result}px, 0)`

      this.checkIsSwipeEnd(delta, false)
    }
  }

  private checkSwipeableElementContainActive() {
    return this.swipeableElement.classList.contains(this.isSwipedClass)
  }
  private checkMaxWorkWidth() {
    if (window.innerWidth <= this.maxWorkWidth) {
      this.touchAreaElement.addEventListener('pointerdown', this.pointerDownHandler)
      this.touchAreaElement.style.cursor = 'grab'
      window.addEventListener('pointerup', this.pointerUpHandler)
    } else {
      this.touchAreaElement.removeEventListener('pointerdown', this.pointerDownHandler)
      this.touchAreaElement.style.cursor = 'auto'

      window.removeEventListener('pointerup', this.pointerUpHandler)
    }
  }
}