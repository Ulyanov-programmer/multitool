import { elementIsExistWithLog, sleep } from '../general.js'


interface AjarSpoilerArgs {
  /**
   * The height of the slightly open spoiler, while it is not open. 
   * It can be set in any units of measurement.
   */
  defaultHeight: string
  /**
   * Remove the button after opening the spoiler.
   * @defaultValue `false`
   */
  deleteButtonAfterOpening?: boolean
}
export class Ajar {
  defaultHeight: string
  deleteButtonAfterOpening: boolean = false

  constructor(arg: AjarSpoilerArgs) {
    this.defaultHeight = arg.defaultHeight
    this.deleteButtonAfterOpening = arg.deleteButtonAfterOpening
  }
}

interface SpoilerArgs {
  /**
   * Wrapper selector for spoilers.
   * @remark See spoiler HTML construction
   * @example
   * ``` html
   * <div class='spoiler'
   *      data-spoiler> <!-- Your wrapper -->
   *  <button type='button'
   *          class='spoiler-button'>Open the spoiler</button>
   *  <div class='spoiler-content'>
   *   <div class='spoiler-content-wrapper'>
   *     <!-- Your content -->
   *   </div>
   *  </div>
   * </div>
   * ```
   */
  wrappersSelector: string
  /**
    If the width of the viewport is greater than input width, 
    the spoilers will not be active and their styles will not be applied.
    If the viewport is smaller than input width, the spoilers will be active.
  */
  maxWorkWidth?: number
  /** 
   * Animation duration in ms, unless you want spoilers to open and close too quickly. 
   * @defaultValue `100` (100ms)
   */
  animationDuration: number
  buttonActiveClass?: string
  contentActiveClass?: string
  /**
   * If you want a spoiler to be slightly open initially, initialize the instance.
   */
  ajar?: Ajar
}
/**
 * Create an instance to create a spoiler.
 * @remark See spoiler HTML construction
 * @example
 * ``` html
 * <div class='spoiler'
 *      data-spoiler> <!-- Your wrapper -->
 *  <button type='button'
 *          class='spoiler-button'>Open the spoiler</button>
 *  <div class='spoiler-content'>
 *   <div class='spoiler-content-wrapper'>
 *     <!-- Your content -->
 *   </div>
 *  </div>
 * </div>
 * ```
 */
export default class Spoiler {
  private buttons: NodeListOf<HTMLElement>
  private contentElements: NodeListOf<HTMLElement>
  private contentWrapperElements: NodeListOf<HTMLElement>
  private maxWorkWidth?: number = 1e6
  private animationDuration?: number = 100
  private readonly spoilerClass: string = 'spoiler'
  public readonly buttonClass: string = `${this.spoilerClass}-button`
  public readonly contentClass: string = `${this.spoilerClass}-content`
  public readonly contentWrapperClass: string = `${this.contentClass}-wrapper`
  public readonly animationTogglingClass: string = '_slide_'
  public buttonActiveClass: string
  public contentActiveClass: string
  private ajar?: Ajar

  constructor(arg: SpoilerArgs) {
    if (!elementIsExistWithLog('Spoiler', arg.wrappersSelector)) {
      return
    }
    else if (arg.maxWorkWidth < 0) {
      console.log('[Spoiler] maxWorkWidth smaller than 0!')
    }
    else if (arg.animationDuration < 0) {
      console.log('[Spoiler] animationDuration smaller than 0!')
    }


    this.buttons = document.querySelectorAll(
      `${arg.wrappersSelector} .${this.buttonClass}`
    )
    this.contentElements = document.querySelectorAll(
      `${arg.wrappersSelector} .${this.contentClass}`
    )
    this.contentWrapperElements = document.querySelectorAll(
      `${arg.wrappersSelector} .${this.contentClass} .${this.contentWrapperClass}`
    )
    this.buttonActiveClass = arg.buttonActiveClass ?? 'active'
    this.contentActiveClass = arg.contentActiveClass ?? 'active'
    this.maxWorkWidth = arg.maxWorkWidth ?? this.maxWorkWidth

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.animationDuration = arg.animationDuration ?? 200
    } else {
      this.animationDuration = 0
    }


    if (arg.ajar) {
      this.ajar = arg.ajar
      this.setAjarSpoilers()

      window.addEventListener('resize', this.setAjarSpoilers.bind(this))
    }
    else {
      this.setSpoilers()
      window.addEventListener('resize', this.setSpoilers.bind(this))
    }
  }


  private setSpoilers() {
    for (let i = 0; i < this.contentElements.length; i++) {
      if (window.innerWidth <= this.maxWorkWidth) {
        this.contentElements[i].style.display = 'grid'
        this.contentElements[i].style.transitionProperty = 'grid-template-rows'
        this.contentElements[i].style.transitionDuration = `${this.animationDuration}ms`
        this.contentElements[i].style.transitionTimingFunction = 'ease'

        this.contentWrapperElements[i].style.overflow = 'hidden'

        this.buttons[i].style.cursor = ''
        this.buttons[i].addEventListener('click', this.toggleSpoiler.bind(this))

        if (this.isSpoilerContentActive(this.contentElements[i])) {
          this.toggleSpoilerState(this.contentElements[i], this.buttons[i], true)
        }
        else {
          this.toggleSpoilerState(this.contentElements[i], this.buttons[i], false)

          this.toggleSpoilerContentNodesVisibility(false, this.contentWrapperElements[i])
        }
      }
      else {
        this.contentElements[i].style.display = ''
        this.contentElements[i].style.gridTemplateRows = ''
        this.contentElements[i].style.transitionProperty = ''
        this.contentElements[i].style.transitionDuration = ``
        this.contentElements[i].style.transitionTimingFunction = ''
        this.contentElements[i].style.pointerEvents = ''
        this.contentElements[i].removeAttribute('tabindex')
        this.contentElements[i].removeAttribute('aria-hidden')

        this.contentWrapperElements[i].style.overflow = ''

        this.buttons[i].style.cursor = 'default'
        this.buttons[i].removeEventListener('click', this.toggleSpoiler.bind(this))

        this.toggleSpoilerContentNodesVisibility(true, this.contentWrapperElements[i])
      }
    }
  }

  private toggleSpoiler(event: Event) {
    let spoilerWrapper = this.getActiveSpoilerWrapper(event)
    let targetSpoilerButton = event.currentTarget as HTMLButtonElement
    let spoilerContainer = spoilerWrapper.querySelector<HTMLElement>('.' + this.contentClass)

    if (this.isSpoilerChanging(spoilerContainer)) return

    this.toggleSpoilerState(spoilerContainer, targetSpoilerButton)
  }
  private isSpoilerChanging(spoilerContainer: HTMLElement): boolean {
    if (spoilerContainer.classList.contains(this.animationTogglingClass))
      return true

    return false
  }
  private async toggleSpoilerState(container: HTMLElement, button: HTMLElement, toggleTo?: boolean) {
    let spoilerIsClosed = container.style.gridTemplateRows == '0fr'

    if (spoilerIsClosed || toggleTo) {
      container.classList.add(this.animationTogglingClass)

      container.style.gridTemplateRows = '1fr'
      container.style.pointerEvents = 'all'
      container.setAttribute('tabindex', '0')
      container.setAttribute('aria-hidden', 'false')

      if (this.contentActiveClass)
        container.classList.add(this.contentActiveClass)

      button.setAttribute('aria-expanded', 'true')

      if (this.buttonActiveClass)
        button.classList.add(this.buttonActiveClass)

      this.toggleSpoilerContentNodesVisibility(
        true,
        container.querySelector('.' + this.contentWrapperClass)
      )

      await sleep(this.animationDuration)
      container.classList.remove(this.animationTogglingClass)
    }
    else if (!spoilerIsClosed || !toggleTo) {
      container.classList.add(this.animationTogglingClass)

      container.style.gridTemplateRows = '0fr'
      container.style.pointerEvents = 'none'
      container.setAttribute('tabindex', '-1')
      container.setAttribute('aria-hidden', 'true')

      if (this.contentActiveClass)
        container.classList.remove(this.contentActiveClass)

      button.setAttribute('aria-expanded', 'false')

      if (this.buttonActiveClass)
        button.classList.remove(this.buttonActiveClass)

      await sleep(this.animationDuration)

      container.classList.remove(this.animationTogglingClass)

      this.toggleSpoilerContentNodesVisibility(
        false,
        container.querySelector(`.${this.contentWrapperClass}`)
      )
    }
  }
  private toggleSpoilerContentNodesVisibility(toggleTo: boolean, spoilerContentWrapper: HTMLElement) {
    //@ts-expect-error
    let nodes = spoilerContentWrapper.children as NodeListOf<HTMLElement>

    if (toggleTo) {
      for (let node of nodes) {
        node.style.visibility = ''
      }
    }
    else {
      for (let node of nodes) {
        node.style.visibility = 'hidden'
      }
    }
  }


  private setAjarSpoilers() {
    if (window.innerWidth <= this.maxWorkWidth) {
      this.toggleAjarFunctionality(true, this.ajar)
    }
    else {
      this.toggleAjarFunctionality(false, this.ajar)
    }
  }
  enableAjarSpoilerStateHandler = (event: Event) => {
    this.toggleAjarSpoiler(event, this.ajar, this.getActiveSpoilerWrapper(event))
  }

  private async toggleAjarSpoiler(event: Event, ajarParams: Ajar, wrapper: HTMLElement) {
    let targetSpoilerButton = wrapper.querySelector('.' + this.buttonClass)
    let container = wrapper.querySelector<HTMLElement>('.' + this.contentClass)

    if (this.isSpoilerChanging(container)) return

    let button = wrapper.querySelector<HTMLElement>('.' + this.buttonClass)

    container.classList.add(this.animationTogglingClass)

    container.style.transitionProperty = 'height'
    container.style.transitionDuration = this.animationDuration + 'ms'

    if (this.isSpoilerContentActive(container)) {
      container.style.overflow = 'hidden'
      container.style.height = container.clientHeight + 'px'
      await sleep(10)
      container.style.height = ajarParams.defaultHeight
      await sleep(this.animationDuration)

      if (this.contentActiveClass)
        container.classList.remove(this.contentActiveClass)
      container.setAttribute('tabindex', '-1')
      container.setAttribute('aria-hidden', 'true')

      button.setAttribute('aria-expanded', 'false')
    }
    else {
      container.style.height = container.scrollHeight - 1 + 'px'
      await sleep(this.animationDuration)

      container.style.height = ''

      if (this.contentActiveClass)
        container.classList.add(this.contentActiveClass)
      container.setAttribute('tabindex', '0')
      container.setAttribute('aria-hidden', 'false')

      button.setAttribute('aria-expanded', 'true')

      if (ajarParams.deleteButtonAfterOpening && targetSpoilerButton) {
        targetSpoilerButton.remove()
      }
    }

    container.classList.remove(this.animationTogglingClass)
  }
  private toggleAjarFunctionality(toggleTo: boolean, ajarParams: Ajar) {
    if (toggleTo) {
      for (let i = 0; i < this.contentElements.length; i++) {
        if (!this.isSpoilerContentActive(this.contentElements[i])) {
          this.contentElements[i].style.overflow = 'hidden'
          this.contentElements[i].style.height = ajarParams.defaultHeight
          this.contentElements[i].setAttribute('tabindex', '-1')
          this.contentElements[i].setAttribute('aria-hidden', 'true')

          this.buttons[i].setAttribute('aria-expanded', 'false')

          this.buttons[i].addEventListener('click', this.enableAjarSpoilerStateHandler, false)
        }
      }
    }
    else {
      for (let i = 0; i < this.contentElements.length; i++) {
        this.contentElements[i].style.overflow = ''
        this.contentElements[i].style.height = ''
        this.contentElements[i].removeAttribute('tabindex')
        this.contentElements[i].removeAttribute('aria-hidden')

        this.buttons[i].removeAttribute('aria-expanded')

        this.buttons[i].removeEventListener('click', this.enableAjarSpoilerStateHandler, false)
      }
    }
  }


  private getActiveSpoilerWrapper(buttonEvent: Event): HTMLElement {
    let button = buttonEvent.currentTarget as HTMLElement
    return button.parentElement
  }
  private isSpoilerContentActive(spoilerContentElement: HTMLElement): boolean {
    if (spoilerContentElement.classList.contains(this.contentActiveClass)) {
      return true
    } else {
      return false
    }
  }
}