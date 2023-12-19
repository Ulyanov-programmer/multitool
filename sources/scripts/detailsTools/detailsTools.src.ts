import { sleep } from '../general.js'

export default class DetailsMain {
  private static detailsArray: Details[]

  constructor(...detailsArray: Details[]) {
    DetailsMain.detailsArray = detailsArray
    let selectors = []

    if (!detailsArray || detailsArray.length == 0) {
      detailsArray.push(new Details({}))
    }

    for (let details of DetailsMain.detailsArray) {
      selectors.push(details.detailsSelector)
    }

    for (let detailsOption of DetailsMain.detailsArray) {
      let selectorForDetails = detailsOption.detailsSelector + ':not('

      // All this masquerade is needed in order not to duplicate the elements in the options
      for (let selector of selectors) {
        if (selector != 'details' && selector != detailsOption.detailsSelector)
          selectorForDetails += selector + ','
      }

      selectorForDetails = selectorForDetails.replace(/,$/, '')
      selectorForDetails += ')'

      if (selectorForDetails == 'details:not()')
        selectorForDetails = detailsOption.detailsSelector

      detailsOption.details = document.querySelectorAll(selectorForDetails)
      detailsOption.summaryItems = document.querySelectorAll(selectorForDetails + ' summary:first-child')

      for (let detailsItem of detailsOption.details) {
        if (detailsItem.open &&
          // protection is necessary due to the asynchrony of the code
          !detailsItem.classList.contains(detailsOption.animationTogglingClass)
        ) {
          detailsItem.setAttribute(detailsOption.preOpen, '')
        }
      }

      // Initialization
      detailsOption.setDetails()

      window.addEventListener('resize', () => {
        // Protection against re-triggering the window resizing event.
        clearTimeout(detailsOption.timeoutId)

        detailsOption.timeoutId = setTimeout(
          detailsOption.setDetails.bind(detailsOption), 50
        )
      })
    }
  }
}

interface AjarDetailsArgs {
  /**
   * The height of the slightly open spoiler, while it is not open. 
   * It can be set in any units of measurement.
   */
  defaultHeight: string
  hideButtonAfterOpening?: boolean
}
export class Ajar {
  defaultHeight: string
  hideButtonAfterOpening: boolean = false
  static readonly defaultHeightDataAttr: string = 'data-ajar-default-height'
  static readonly hideButtonAttr: string = 'data-ajar-hide-button-on-enable'

  constructor(arg: AjarDetailsArgs) {
    this.defaultHeight = arg.defaultHeight
    this.hideButtonAfterOpening = arg.hideButtonAfterOpening
  }
}

interface DetailsArgs {
  detailsSelector?: string
  /**
    If the width of the viewport is greater than input width, 
    the spoilers will not be active and their styles will not be applied.
    If the viewport is smaller than input width, the spoilers will be active.
  */
  maxWorkWidth?: number
  /** 
   * Animation duration in ms, unless you want spoilers to open and close too quickly. 
   * @defaultValue `200` (200ms)
   */
  animationDuration?: number
  buttonActiveClass?: string
  contentActiveClass?: string
  /**
   * If you want a spoiler to be slightly open initially, initialize the instance.
   */
  ajar?: Ajar
}
/**
 * 
 * @remark See spoiler HTML construction
 * @example
 * ``` html
 * ```
 */
export class Details {
  public summaryItems: NodeListOf<HTMLElement>
  public details: NodeListOf<HTMLDetailsElement>
  private maxWorkWidth?: number = 1e6
  private animationDuration?: number
  public readonly animationTogglingClass: string = '_slide_'
  public readonly preOpen: string = 'data-originally-opened'
  public summaryActiveClass: string
  public detailsActiveClass: string
  public timeoutId: number = null
  public detailsSelector: string
  private ajar: Ajar

  constructor(arg: DetailsArgs) {
    if (arg.maxWorkWidth < 0) {
      console.error('[Details] maxWorkWidth smaller than 0!')
    }
    else if (arg.animationDuration < 0) {
      console.error('[Details] animationDuration smaller than 0!')
    }

    arg.detailsSelector = arg.detailsSelector ?? 'details'
    this.detailsSelector = arg.detailsSelector

    this.summaryActiveClass = arg.buttonActiveClass ?? 'active'
    this.detailsActiveClass = arg.contentActiveClass ?? 'active'
    this.maxWorkWidth = arg.maxWorkWidth ?? this.maxWorkWidth


    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.animationDuration = arg.animationDuration ?? 200
    } else {
      this.animationDuration = 0
    }

    this.ajar = arg.ajar
  }


  setDetails() {
    for (let i = 0; i < this.details.length; i++) {
      if (this.currentInnerWidthIsCorrect()) {
        this.details[i].style.overflow = 'hidden'
        this.details[i].style.transitionProperty = 'height'
        this.details[i].style.transitionTimingFunction = 'ease'
        this.details[i].style.transitionDuration = '0ms'

        let isNotActive =
          this.summaryItems[i].style.cursor == '' ||
          this.summaryItems[i].style.cursor == 'default'
        let preOpen = this.details[i].getAttribute(this.preOpen) != null

        if (isNotActive) {
          if (preOpen)
            this.openDetails(this.details[i], this.summaryItems[i])
          else
            this.closeDetails(this.details[i], this.summaryItems[i])
        }
        else if (
          !this.ajar && this.details[i].open ||
          this.ajar && this.details[i].style.height == ''
        )
          this.openDetails(this.details[i], this.summaryItems[i])
        else
          this.closeDetails(this.details[i], this.summaryItems[i])


        this.summaryItems[i].style.cursor = 'pointer'

        setTimeout(() => {
          this.details[i].style.transitionDuration = this.animationDuration + 'ms'
        }, this.animationDuration)
      }
      else {
        this.disableDetails(this.details[i], this.summaryItems[i])
      }

      this.summaryItems[i].addEventListener('click', this.toggleDetails.bind(this))
    }
  }

  private toggleDetails(event: Event) {
    event.preventDefault()

    if (!this.currentInnerWidthIsCorrect()) return

    let details = this.getParentDetails(event)
    let targetSummary = event.currentTarget as HTMLButtonElement

    if (this.isDetailsChanging(details)) return

    if (
      this.ajar && targetSummary.getAttribute('aria-expanded') == 'true' ||
      !this.ajar && details.open
    ) {
      this.closeDetails(details, targetSummary)
    }
    else {
      this.openDetails(details, targetSummary)
    }
  }

  private async openDetails(details: HTMLDetailsElement, summary: HTMLElement) {
    details.classList.add(this.animationTogglingClass)

    details.style.height = details.clientHeight + 'px'

    details.open = true
    details.style.height = details.scrollHeight - 1 + 'px'

    details.classList.add(this.detailsActiveClass)

    summary.setAttribute('aria-expanded', 'true')
    summary.classList.add(this.summaryActiveClass)


    await sleep(this.animationDuration)

    details.style.height = ''
    details.classList.remove(this.animationTogglingClass)

    if (this.ajar?.hideButtonAfterOpening)
      this.hideSummary(summary)
  }
  private async closeDetails(details: HTMLDetailsElement, summary: HTMLElement) {
    details.classList.add(this.animationTogglingClass)

    details.style.height = details.scrollHeight + 'px'

    if (this.ajar) {
      details.style.height = `calc(${summary.clientHeight + 'px'} + ${this.ajar.defaultHeight})`
    } else {
      details.style.height = summary.clientHeight + 'px'
    }


    details.classList.remove(this.detailsActiveClass)

    summary.setAttribute('aria-expanded', 'false')

    summary.classList.remove(this.summaryActiveClass)
    details.open = true


    await sleep(this.animationDuration)

    if (!this.ajar) {
      details.style.height = ''
      details.open = false
    }

    details.classList.remove(this.animationTogglingClass)
  }


  private isDetailsChanging(details: HTMLDetailsElement): boolean {
    if (details.classList.contains(this.animationTogglingClass))
      return true

    return false
  }
  private getParentDetails(buttonEvent: Event): HTMLDetailsElement {
    let button = buttonEvent.currentTarget as HTMLElement
    return button.parentElement as HTMLDetailsElement
  }
  private disableDetails(details: HTMLDetailsElement, summary: HTMLElement) {
    details.style.overflow = ''
    details.style.transitionProperty = ''
    details.style.transitionDuration = ''
    details.style.transitionTimingFunction = ''
    details.style.height = ''
    details.open = true

    summary.style.cursor = 'default'
    summary.removeAttribute('aria-expanded')
  }
  private hideSummary(summary: HTMLElement) {
    summary.style.position = 'absolute'
    summary.style.overflow = 'hidden'
    summary.style.width = '1px'
    summary.style.height = '1px'
    summary.style.whiteSpace = 'nowrap'
    summary.style.clipPath = 'inset(50%)'
    summary.style.height = '1px'
  }
  private currentInnerWidthIsCorrect(): boolean {
    return window.innerWidth <= this.maxWorkWidth
  }
}