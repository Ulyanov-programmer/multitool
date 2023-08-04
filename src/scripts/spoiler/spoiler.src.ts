import { elementIsExistWithLog, sleep } from '../general.js'

interface SpoilerArgs {
  wrappersSelector: string
  /**
    If the width of the viewport is greater than input width, 
    the spoilers will not be active and their styles will not be applied.
    If the viewport is smaller than input width, the spoilers will be active.
  */
  maxWorkWidth?: number
  /** 
    Animation duration in ms, unless you want spoilers to open and close too quickly. 
  */
  animationDuration: number
  buttonActiveClass?: string
  contentActiveClass?: string

  ajar?: Ajar
}
export class Ajar {
  defaultHeight: string
  deleteButtonAfterOpening: boolean = false

  constructor(args: AjarSpoilerArgs) {
    this.defaultHeight = args.defaultHeight
    this.deleteButtonAfterOpening = args.deleteButtonAfterOpening
  }
}
interface AjarSpoilerArgs {
  defaultHeight: string
  deleteButtonAfterOpening?: boolean
}

export default class Spoiler {
  private buttons: NodeListOf<HTMLElement>
  private contentElements: NodeListOf<HTMLElement>
  private contentWrapperElements: NodeListOf<HTMLElement>
  private maxWorkWidth?: number = 99999999
  private animationDuration: number
  private readonly spoilerClass: string = 'spoiler'
  public readonly buttonClass: string = `${this.spoilerClass}-button`
  public readonly contentClass: string = `${this.spoilerClass}-content`
  public readonly contentWrapperClass: string = `${this.contentClass}-wrapper`
  public readonly animationTogglingClass: string = '_slide_'
  public buttonActiveClass: string = 'active'
  public contentActiveClass: string = 'active'
  private ajar?: Ajar

  constructor(args: SpoilerArgs) {
    if (!elementIsExistWithLog('Spoiler', args.wrappersSelector)) {
      return
    }
    else if (args.maxWorkWidth < 0 || args.animationDuration < 0) {
      console.log('[Spoiler] maxWorkWidth < 0 or animationDuration < 0!')
    }


    this.buttons = document.querySelectorAll(
      `${args.wrappersSelector} .${this.buttonClass}`
    )
    this.contentElements = document.querySelectorAll(
      `${args.wrappersSelector} .${this.contentClass}`
    )
    this.contentWrapperElements = document.querySelectorAll(
      `${args.wrappersSelector} .${this.contentClass} .${this.contentWrapperClass}`
    )
    this.buttonActiveClass = args.buttonActiveClass ?? this.buttonActiveClass
    this.contentActiveClass = args.contentActiveClass ?? this.contentActiveClass
    this.maxWorkWidth = args.maxWorkWidth ?? this.maxWorkWidth
    this.animationDuration = args.animationDuration


    if (args.ajar) {
      this.ajar = args.ajar
      this.setAjarSpoilers()

      //? Determines spoilers when the page is resized.
      window.addEventListener(`resize`, this.setAjarSpoilers.bind(this))
    } else {
      this.setSpoilers()
      window.addEventListener(`resize`, this.setSpoilers.bind(this))
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
        this.buttons[i].addEventListener('click', this.toggleSpoilerStateHandler)

        if (this.isSpoilerContentActive(this.contentElements[i])) {
          this.spoilerDown(this.contentElements[i], this.animationDuration)
        }
        else {
          this.spoilerUp(this.contentElements[i], this.animationDuration)

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

        this.contentWrapperElements[i].style.overflow = ''

        this.buttons[i].style.cursor = 'default'
        this.buttons[i].removeEventListener('click', this.toggleSpoilerStateHandler)

        this.toggleSpoilerContentNodesVisibility(true, this.contentWrapperElements[i])
      }
    }
  }
  private toggleSpoilerStateHandler = function (event: PointerEvent) {
    this.toggleSpoilerState(event)
  }.bind(this)

  private toggleSpoilerState(event: PointerEvent) {
    let spoilerWrapper = this.getActiveSpoilerWrapper(event)
    let targetSpoilerButton = event.currentTarget as HTMLButtonElement
    let spoilerContainer = spoilerWrapper.querySelector(`.${this.contentClass}`) as HTMLElement

    if (this.canToggleSpoiler(spoilerContainer) == false) return

    this.toggleSpoiler(spoilerContainer, this.animationDuration)
    targetSpoilerButton.classList.toggle(this.contentActiveClass)
    spoilerContainer.classList.toggle(this.contentActiveClass)
  }
  private toggleSpoiler(spoilerContainer: HTMLElement, duration: number) {
    if (spoilerContainer.style.gridTemplateRows == '0fr') {
      this.spoilerDown(spoilerContainer, duration)
    }
    else {
      this.spoilerUp(spoilerContainer, duration)
    }
  }
  private canToggleSpoiler(spoilerContainer: HTMLElement): boolean {
    if (spoilerContainer.classList.contains(this.animationTogglingClass)) {
      return false
    }

    spoilerContainer.classList.add(this.animationTogglingClass)
    return true
  }
  private spoilerUp(spoilerContainer: HTMLElement, duration: number) {
    spoilerContainer.style.gridTemplateRows = '0fr'
    spoilerContainer.style.pointerEvents = 'none'

    window.setTimeout(() => {
      spoilerContainer.classList.remove(this.animationTogglingClass)

      this.toggleSpoilerContentNodesVisibility(
        false,
        spoilerContainer.querySelector(`.${this.contentWrapperClass}`)
      )
    }, duration)
  }
  private spoilerDown(spoilerContainer: HTMLElement, duration: number) {
    spoilerContainer.style.gridTemplateRows = '1fr'
    spoilerContainer.style.pointerEvents = 'all'

    this.toggleSpoilerContentNodesVisibility(
      true,
      spoilerContainer.querySelector(`.${this.contentWrapperClass}`)
    )

    window.setTimeout(() => {
      spoilerContainer.classList.remove(this.animationTogglingClass)
    }, duration)
  }
  private toggleSpoilerContentNodesVisibility(toggleTo: boolean, spoilerContentWrapper: HTMLElement) {
    let nodes = spoilerContentWrapper.children as unknown as NodeListOf<HTMLElement>

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
    for (let i = 0; i < this.contentElements.length; i++) {
      if (window.innerWidth <= this.maxWorkWidth) {
        this.toggleAjarFunctionality(true, this.ajar)
      }
      else {
        this.toggleAjarFunctionality(false, this.ajar)
      }
    }
  }
  enableAjarSpoilerStateHandler = (function (e: PointerEvent) {
    this.toggleAjarSpoiler(e, this.ajar, this.getActiveSpoilerWrapper(e))
  }).bind(this)

  private async toggleAjarSpoiler(event: PointerEvent, ajarParams: Ajar, spoilerWrapper: HTMLElement) {
    let targetSpoilerButton = spoilerWrapper.querySelector(`.${this.buttonClass}`)
    let spoilerContainer = spoilerWrapper.querySelector(`.${this.contentClass}`) as HTMLElement

    spoilerContainer.style.transitionProperty = 'height'
    spoilerContainer.style.transitionDuration = `${this.animationDuration}ms`

    if (this.isSpoilerContentActive(spoilerContainer) == false) {
      spoilerContainer.style.height = `${spoilerContainer.scrollHeight - 1}px`
      await sleep(this.animationDuration)

      spoilerContainer.style.height = ''
      spoilerContainer.classList.add(this.contentActiveClass)

      if (ajarParams.deleteButtonAfterOpening && targetSpoilerButton) {
        targetSpoilerButton.remove()
      }
    }
    else {
      spoilerContainer.style.overflow = 'hidden'
      spoilerContainer.style.height = `${spoilerContainer.clientHeight}px`
      await sleep(10)
      spoilerContainer.style.height = ajarParams.defaultHeight
      await sleep(this.animationDuration)

      spoilerContainer.classList.remove(this.contentActiveClass)
    }
  }
  private toggleAjarFunctionality(toggleTo: boolean, ajarParams: Ajar) {
    if (toggleTo) {
      for (let i = 0; i < this.contentElements.length; i++) {

        if (this.isSpoilerContentActive(this.contentElements[i]) == false) {
          this.contentElements[i].style.overflow = 'hidden'
          this.contentElements[i].style.height = ajarParams.defaultHeight

          this.buttons[i].addEventListener('click', this.enableAjarSpoilerStateHandler, false)
        }
      }
    }
    else {
      for (let i = 0; i < this.contentElements.length; i++) {
        this.contentElements[i].style.overflow = ''
        this.contentElements[i].style.height = ''

        this.buttons[i].removeEventListener('click', this.enableAjarSpoilerStateHandler, false)
      }
    }
  }


  private getActiveSpoilerWrapper(buttonEvent: PointerEvent) {
    let button = buttonEvent.currentTarget as HTMLElement
    return button.parentElement
  }
  private isSpoilerContentActive(spoilerContentElement: HTMLElement) {
    if (spoilerContentElement.classList.contains(this.contentActiveClass)) {
      return true
    } else {
      return false
    }
  }
}