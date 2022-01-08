import { isNullOrWhiteSpaces } from "./general.js";

export default class SpoilerMenu {
  private static spoilerButtons: NodeListOf<HTMLElement>
  private static spoilerContentElements: NodeListOf<HTMLElement>
  private static spoilerVisibleWidth: number
  private static animationDuration: number

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


  toggleToSpoilers() {
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

  toggleSpoilerState(event) {
    let targetSpoilerButton = event.target;
    let spoilerContainer = targetSpoilerButton.nextElementSibling;
    let animationDuration = SpoilerMenu.animationDuration;

    if (spoilerContainer.classList.contains('_slide') === false) {
      toggleSpoilerAnimation(spoilerContainer, animationDuration);
      targetSpoilerButton.classList.toggle('active');
      spoilerContainer.classList.toggle('active');
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