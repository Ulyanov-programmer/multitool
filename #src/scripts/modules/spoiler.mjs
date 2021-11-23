export default class SpoilerMenu{
  static spoilerButtons = document.querySelectorAll('[data-spoiler-button]');
  static spoilerContentElements = document.querySelectorAll('[data-spoiler-content]');

  constructor() {
    if (SpoilerMenu.spoilerButtons.length > 0 && SpoilerMenu.spoilerContentElements.length > 0) {
      toggleToSpoilers();
    } else {
      throw '[SPOILERS] Set the necessary attributes for buttons and content!'
    }
  }  
}
function toggleToSpoilers(e) {
  if (SpoilerMenu.spoilerButtons.length > 0) {
    for (let i = 0; i < SpoilerMenu.spoilerContentElements.length; i++) {

      if (window.innerWidth <= 900) {
        SpoilerMenu.spoilerContentElements[i].classList.add('spoiler-content');
        SpoilerMenu.spoilerContentElements[i].hidden = true;
        SpoilerMenu.spoilerButtons[i].classList.add('spoiler-button');
      } else {
        SpoilerMenu.spoilerContentElements[i].classList.remove('spoiler-content');
        SpoilerMenu.spoilerContentElements[i].hidden = false;
        SpoilerMenu.spoilerButtons[i].classList.remove('spoiler-button');
      }
    }

    for (let spoilerButton of SpoilerMenu.spoilerButtons) {
      spoilerButton.addEventListener('click', toggleSpoilerState);
    }
  } else {
    throw 'The length of spoiler buttons and spoiler content-elements must be more than zero.'
  }
}

function toggleSpoilerState(event) {
  let targetSpoilerButton = event.target;
  let spoilerContainer = targetSpoilerButton.nextElementSibling;
  let animationDuration = 500;

  if (spoilerContainer.classList.contains('_slide') === false) {
    toggleSpoilerAnimation(spoilerContainer, animationDuration);
    targetSpoilerButton.classList.toggle('active');
    spoilerContainer.classList.toggle('active');
  }
}

// ? Determines spoilers when the page is resized.
window.addEventListener(`resize`, toggleToSpoilers);

function spoilerUp(spoilerContainer, duration) {
  if (spoilerContainer.classList.contains('_slide') === false) {
    spoilerContainer.classList.add('_slide');
    let containerStyle = spoilerContainer.style;

    containerStyle.transitionProperty = 'height, margin, padding';
    containerStyle.transitionDuration = duration + 'ms';
    containerStyle.height = spoilerContainer.clientHeight + 'px';
    spoilerContainer.clientHeight;
    containerStyle.overflow = 'hidden';
    containerStyle.height = 0;
    containerStyle.paddingTop = 0;
    containerStyle.paddingBottom = 0;
    containerStyle.marginTop = 0;
    containerStyle.marginBottom = 0;

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
function spoilerDown(spoilerContainer, duration) {
  if (spoilerContainer.classList.contains('_slide') === false) {
    spoilerContainer.classList.add('_slide');

    if (spoilerContainer.hidden) {
      spoilerContainer.hidden = false;
    }
    let containerStyle = spoilerContainer.style;
    let height = spoilerContainer.clientHeight;

    containerStyle.overflow = 'hidden';
    containerStyle.height = 0;
    containerStyle.paddingTop = 0;
    containerStyle.paddingBottom = 0;
    containerStyle.marginTop = 0;
    containerStyle.marginBottom = 0;
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
function toggleSpoilerAnimation(spoilerContainer, duration) {
  if (spoilerContainer.hidden) {
    return spoilerDown(spoilerContainer, duration);
  } else {
    return spoilerUp(spoilerContainer, duration);
  }
}