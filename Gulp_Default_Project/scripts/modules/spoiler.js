import { elementIsExistWithLog } from "./general.js";
export default class SpoilerMenu {
    constructor(args) {
        if (!elementIsExistWithLog('SpoilerMenu', args.btnsSelector, args.contentBlocksSelector)) {
            return;
        }
        else if (args.maxWorkWidth < 0 || args.animationDuration < 0) {
            console.log('[SpoilerMenu] maxWorkWidth < 0 or animationDuration < 0!');
        }
        SpoilerMenu.spoilerButtons = document.querySelectorAll(args.btnsSelector);
        SpoilerMenu.spoilerContentElements = document.querySelectorAll(args.contentBlocksSelector);
        if (args.buttonActiveClass)
            SpoilerMenu.btnActiveClass = args.buttonActiveClass;
        if (args.contentActiveClass)
            SpoilerMenu.contentActiveClass = args.contentActiveClass;
        if (SpoilerMenu.spoilerButtons.length != SpoilerMenu.spoilerContentElements.length) {
            console.log('[SpoilerMenu] The count of buttons and content-elements must be equal.');
            return;
        }
        SpoilerMenu.spoilerVisibleWidth = args.maxWorkWidth;
        SpoilerMenu.animationDuration = args.animationDuration;
        this.toggleToSpoilers();
        //? Determines spoilers when the page is resized.
        window.addEventListener(`resize`, this.toggleToSpoilers);
    }
    toggleToSpoilers() {
        if (window.innerWidth <= SpoilerMenu.spoilerVisibleWidth) {
            for (let i = 0; i < SpoilerMenu.spoilerContentElements.length; i++) {
                if (SpoilerMenu.spoilerButtons[i].classList.contains(SpoilerMenu.btnActiveClass)) {
                    SpoilerMenu.spoilerContentElements[i].hidden = false;
                }
                else {
                    SpoilerMenu.spoilerContentElements[i].hidden = true;
                }
                SpoilerMenu.spoilerButtons[i].addEventListener('click', SpoilerMenu.toggleSpoilerState);
                SpoilerMenu.spoilerButtons[i].style.cursor = 'pointer';
            }
        }
        else {
            for (let i = 0; i < SpoilerMenu.spoilerContentElements.length; i++) {
                SpoilerMenu.spoilerContentElements[i].hidden = false;
                SpoilerMenu.spoilerButtons[i].removeEventListener('click', SpoilerMenu.toggleSpoilerState);
                SpoilerMenu.spoilerButtons[i].style.cursor = 'default';
            }
        }
    }
    static toggleSpoilerState(event) {
        let targetSpoilerButton = event.currentTarget;
        let spoilerContainer = targetSpoilerButton.nextElementSibling;
        if (spoilerContainer.classList.contains('_slide') === false) {
            toggleSpoilerAnimation(spoilerContainer, SpoilerMenu.animationDuration);
            targetSpoilerButton.classList.toggle(SpoilerMenu.btnActiveClass);
            spoilerContainer.classList.toggle(SpoilerMenu.contentActiveClass);
        }
    }
}
SpoilerMenu.btnActiveClass = 'active';
SpoilerMenu.contentActiveClass = 'active';
function spoilerUp(spoilerContainer, duration) {
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
function spoilerDown(spoilerContainer, duration) {
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
function toggleSpoilerAnimation(spoilerContainer, duration) {
    if (spoilerContainer.hidden) {
        return spoilerDown(spoilerContainer, duration);
    }
    else {
        return spoilerUp(spoilerContainer, duration);
    }
}