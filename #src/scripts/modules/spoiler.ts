import { isNullOrWhiteSpaces } from "./general.js";

export default class SpoilerMenu {
  private static spoilerButtons: NodeListOf<HTMLElement>
  private static spoilerContentElements: NodeListOf<HTMLElement>
  private static spoilerVisibleWidth: number
  private static animationDuration: number
  public static btnActiveClass: string = 'active'
  public static contentActiveClass: string = 'active'

  /**
   * Provides functionality for spoiler.
   * 
   * @param btnsSelector
   * Selector for ALL buttons that open some spoiler.
   * @param contentBlocksSelector
   * Selector of blocks that will appear when the spoiler is activated. 
   * Blocks should be after spoiler open button in html, see example below.
   * @param visibleWidth
   * If the width of the viewport is greater than input width, 
   * the spoilers will not be active and their styles will not be applied.
   * If the viewport is smaller than input width, the spoilers will be active.
   * @param animationDuration
   * Animation duration in ms, unless you want spoilers to open and close too quickly.
   * 
   * @example 
   * Blocks should be after spoiler button in html like this:
   * ```html
   * <div class='spoiler'>
   *   <div class='spoiler__body'>
   *     <span class='uspoiler-btn'>Spoiler button</span>
   *     <!-- spoiler block -->
   *     <ul class='uspoiler-content'>
   *       <li></li>
   *     </ul>
   *   </div>
   * </div>
   * ```
   * @throws Some selector is null or white spaces - 
   * This error will be printed to the console if some input argument are null or white spaces.
   * @throws The count of buttons and content-elements equal zero or less.
   */
  constructor(btnsSelector: string, contentBlocksSelector: string, visibleWidth: number, animationDuration: number) {
    if (isNullOrWhiteSpaces(btnsSelector, contentBlocksSelector)
      || visibleWidth < 0 || animationDuration < 0) {
      throw '[SPOILERS] Incorrect arguments!'
    }

    SpoilerMenu.spoilerButtons = document.querySelectorAll(btnsSelector);
    SpoilerMenu.spoilerContentElements = document.querySelectorAll(contentBlocksSelector);

    if (SpoilerMenu.spoilerButtons.length != SpoilerMenu.spoilerContentElements.length) {
      throw '[SPOILERS] The count of spoiler buttons and spoiler content-elements must be more than zero.'
    }

    SpoilerMenu.spoilerVisibleWidth = visibleWidth;
    SpoilerMenu.animationDuration = animationDuration;

    this.toggleToSpoilers();

    //? Determines spoilers when the page is resized.
    window.addEventListener(`resize`, this.toggleToSpoilers);
  }


  private toggleToSpoilers() {
    for (let i = 0; i < SpoilerMenu.spoilerContentElements.length; i++) {
      if (window.innerWidth <= SpoilerMenu.spoilerVisibleWidth) {
        SpoilerMenu.spoilerContentElements[i].classList.add('uspoiler-content-active');
        SpoilerMenu.spoilerContentElements[i].hidden = true;
        SpoilerMenu.spoilerButtons[i].classList.add('uspoiler-btn-active');
      } else {
        SpoilerMenu.spoilerContentElements[i].classList.remove('uspoiler-content-active');
        SpoilerMenu.spoilerContentElements[i].hidden = false;
        SpoilerMenu.spoilerButtons[i].classList.remove('uspoiler-btn-active');
      }
    }

    for (let spoilerButton of SpoilerMenu.spoilerButtons) {
      spoilerButton.addEventListener('click', this.toggleSpoilerState);
    }
  }

  private toggleSpoilerState(event: Event) {
    let targetSpoilerButton = event.target as HTMLElement;
    let spoilerContainer = targetSpoilerButton.nextElementSibling as HTMLElement;
    let animationDuration = SpoilerMenu.animationDuration;

    if (spoilerContainer.classList.contains('_slide') === false) {
      toggleSpoilerAnimation(spoilerContainer, animationDuration);
      
      targetSpoilerButton.classList.toggle(SpoilerMenu.btnActiveClass);
      spoilerContainer.classList.toggle(SpoilerMenu.contentActiveClass);
    }
  }
}

function spoilerUp(spoilerContainer: HTMLElement, duration: number) {
  if (spoilerContainer.classList.contains('_slide') === false) {
    spoilerContainer.classList.add('_slide');
    let containerStyle = spoilerContainer.style;

    containerStyle.transitionProperty = 'height, margin, padding';
    containerStyle.transitionDuration = duration + 'ms';
    containerStyle.height = spoilerContainer.clientHeight + 'px';
    spoilerContainer.clientHeight;
    containerStyle.overflow = 'hidden';
    containerStyle.height = '0';
    containerStyle.paddingTop = '0';
    containerStyle.paddingBottom = '0';
    containerStyle.marginTop = '0';
    containerStyle.marginBottom = '0';

    window.setTimeout(() => {
      spoilerContainer.hidden = true;
      containerStyle.removeProperty('height');
      containerStyle.removeProperty('padding-top');
      containerStyle.removeProperty('padding-bottom');
      containerStyle.removeProperty('margin-top');
      containerStyle.removeProperty('margin-bottom');
      containerStyle.removeProperty('overflow');
      containerStyle.removeProperty('transition-duration');
      containerStyle.removeProperty('transition-property');
      spoilerContainer.classList.remove('_slide');
    }, duration);
  }
}
function spoilerDown(spoilerContainer: HTMLElement, duration: number) {
  if (spoilerContainer.classList.contains('_slide') === false) {
    spoilerContainer.classList.add('_slide');

    if (spoilerContainer.hidden) {
      spoilerContainer.hidden = false;
    }
    let containerStyle = spoilerContainer.style;
    let height = spoilerContainer.clientHeight;

    containerStyle.overflow = 'hidden';
    containerStyle.height = '0';
    containerStyle.paddingTop = '0';
    containerStyle.paddingBottom = '0';
    containerStyle.marginTop = '0';
    containerStyle.marginBottom = '0';
    spoilerContainer.clientHeight;

    containerStyle.transitionProperty = 'height, margin, padding';
    containerStyle.transitionDuration = duration + 'ms';
    containerStyle.height = height + 'px';
    containerStyle.removeProperty('padding-top');
    containerStyle.removeProperty('padding-bottom');
    containerStyle.removeProperty('margin-top');
    containerStyle.removeProperty('margin-bottom');

    window.setTimeout(() => {
      containerStyle.removeProperty('height');
      containerStyle.removeProperty('overflow');
      containerStyle.removeProperty('transition-duration');
      containerStyle.removeProperty('transition-property');
      spoilerContainer.classList.remove('_slide');
    }, duration);
  }
}
function toggleSpoilerAnimation(spoilerContainer: HTMLElement, duration: number) {
  if (spoilerContainer.hidden) {
    return spoilerDown(spoilerContainer, duration);
  } else {
    return spoilerUp(spoilerContainer, duration);
  }
}