import { elementIsExistWithLog } from './general.js'

interface SpoilerMenuArgs {
  /** Selector for ALL buttons that open some spoiler. */
  buttonsSelector: string
  /** 
    Selector of blocks that will appear when the spoiler is activated. 
    Blocks should be after spoiler open button in html, see example below.
  */
  contentBlocksSelector: string
  /**
    If the width of the viewport is greater than input width, 
    the spoilers will not be active and their styles will not be applied.
    If the viewport is smaller than input width, the spoilers will be active.
  */
  maxWorkWidth: number
  /** 
    Animation duration in ms, unless you want spoilers to open and close too quickly. 
  */
  animationDuration: number
  buttonActiveClass?: string
  contentActiveClass?: string
}

export default class SpoilerMenu {
  private static spoilerButtons: NodeListOf<HTMLElement>
  private static spoilerContentElements: NodeListOf<HTMLElement>
  private static spoilerVisibleWidth: number
  private static animationDuration: number
  public static readonly animationTogglingClass: string = '_slide'
  public static btnActiveClass: string
  public static contentActiveClass: string

  constructor(args: SpoilerMenuArgs) {
    if (!elementIsExistWithLog('SpoilerMenu', args.buttonsSelector, args.contentBlocksSelector)) {
      return
    } else if (args.maxWorkWidth < 0 || args.animationDuration < 0) {
      console.log('[SpoilerMenu] maxWorkWidth < 0 or animationDuration < 0!')
    }

    SpoilerMenu.spoilerButtons = document.querySelectorAll(args.buttonsSelector)
    SpoilerMenu.spoilerContentElements = document.querySelectorAll(args.contentBlocksSelector)

    SpoilerMenu.btnActiveClass = args.buttonActiveClass ? args.buttonActiveClass : 'active'
    SpoilerMenu.contentActiveClass = args.contentActiveClass ? args.contentActiveClass : 'active'

    if (SpoilerMenu.spoilerButtons.length != SpoilerMenu.spoilerContentElements.length) {
      console.log('[SpoilerMenu] The count of buttons and content-elements is not equal!')
      return
    }

    SpoilerMenu.spoilerVisibleWidth = args.maxWorkWidth
    SpoilerMenu.animationDuration = args.animationDuration

    this.toggleToSpoilers()

    //? Determines spoilers when the page is resized.
    window.addEventListener(`resize`, this.toggleToSpoilers)
  }


  private toggleToSpoilers() {
    for (let i = 0; i < SpoilerMenu.spoilerContentElements.length; i++) {
      if (window.innerWidth <= SpoilerMenu.spoilerVisibleWidth) {
        if (SpoilerMenu.spoilerButtons[i].classList.contains(SpoilerMenu.btnActiveClass)) {
          spoilerDown(SpoilerMenu.spoilerContentElements[i], SpoilerMenu.animationDuration)
        } else {
          spoilerUp(SpoilerMenu.spoilerContentElements[i], SpoilerMenu.animationDuration)
        }

        SpoilerMenu.spoilerContentElements[i].style.overflow = 'hidden'
        SpoilerMenu.spoilerButtons[i].style.cursor = ''
        SpoilerMenu.spoilerButtons[i].addEventListener('click', SpoilerMenu.toggleSpoilerState)
      }
      else {
        SpoilerMenu.spoilerContentElements[i].style.height = ''
        SpoilerMenu.spoilerContentElements[i].style.opacity = ''
        SpoilerMenu.spoilerContentElements[i].style.pointerEvents = ''
        SpoilerMenu.spoilerContentElements[i].style.overflow = ''
        SpoilerMenu.spoilerContentElements[i].style.transitionDuration = ''
        SpoilerMenu.spoilerContentElements[i].style.transitionProperty = ''

        SpoilerMenu.spoilerButtons[i].style.cursor = 'default'
        SpoilerMenu.spoilerButtons[i].removeEventListener('click', SpoilerMenu.toggleSpoilerState)

        toggleSpoilerContentNodesVisibility(true, SpoilerMenu.spoilerContentElements[i])
      }
    }
  }

  private static toggleSpoilerState(event: Event) {
    let targetSpoilerButton = event.currentTarget as HTMLElement
    let spoilerContainer = targetSpoilerButton.nextElementSibling as HTMLElement

    if (canToggleSpoiler(spoilerContainer) == false) return

    toggleSpoilerAnimation(spoilerContainer, SpoilerMenu.animationDuration)
    targetSpoilerButton.classList.toggle(SpoilerMenu.btnActiveClass)
    spoilerContainer.classList.toggle(SpoilerMenu.contentActiveClass)
  }
}


function toggleSpoilerAnimation(spoilerContainer: HTMLElement, duration: number) {
  if (spoilerContainer.style.height == '0px')
    spoilerDown(spoilerContainer, duration)
  else
    spoilerUp(spoilerContainer, duration)
}

function canToggleSpoiler(spoilerContainer: HTMLElement): boolean {
  if (spoilerContainer.classList.contains(SpoilerMenu.animationTogglingClass)) {
    return false
  }
  else {
    spoilerContainer.classList.add(SpoilerMenu.animationTogglingClass)
    return true
  }
}
function spoilerUp(spoilerContainer: HTMLElement, duration: number) {
  spoilerContainer.style.transitionProperty = 'height, opacity'
  spoilerContainer.style.transitionDuration = `${duration}ms`
  spoilerContainer.style.height = '0px'
  spoilerContainer.style.opacity = '0'
  spoilerContainer.style.pointerEvents = 'none'

  window.setTimeout(() => {
    spoilerContainer.classList.remove(SpoilerMenu.animationTogglingClass)

    toggleSpoilerContentNodesVisibility(false, spoilerContainer)
  }, duration)
}
function spoilerDown(spoilerContainer: HTMLElement, duration: number) {
  let heightOfContent = spoilerContainer.scrollHeight

  spoilerContainer.style.transitionProperty = 'height, opacity'
  spoilerContainer.style.transitionDuration = `${duration}ms`
  spoilerContainer.style.height = `${heightOfContent}px`
  spoilerContainer.style.opacity = '1'
  spoilerContainer.style.pointerEvents = 'all'

  toggleSpoilerContentNodesVisibility(true, spoilerContainer)

  window.setTimeout(() => {
    spoilerContainer.classList.remove(SpoilerMenu.animationTogglingClass)
  }, duration)
}
function toggleSpoilerContentNodesVisibility(toggleTo: boolean, spoilerContainer: HTMLElement) {
  if (toggleTo) {
    for (let nodes of spoilerContainer.children) {
      nodes.style.visibility = ''
    }
  }
  else {
    for (let nodes of spoilerContainer.children) {
      nodes.style.visibility = 'hidden'
    }
  }
}