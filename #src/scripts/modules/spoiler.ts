import { elementIsExistWithLog } from "./general.js";

interface SpoilerMenuArgs {
	/** Selector for ALL buttons that open some spoiler. */
	btnsSelector: string
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
	/** Animation duration in ms, unless you want spoilers to open and close too quickly. */
	animationDuration: number
}

export default class SpoilerMenu {
	private static spoilerButtons: NodeListOf<HTMLElement>
	private static spoilerContentElements: NodeListOf<HTMLElement>
	private static spoilerVisibleWidth: number
	private static animationDuration: number
	public static btnActiveClass: string = 'active'
	public static contentActiveClass: string = 'active'

	constructor(args: SpoilerMenuArgs) {
		if (!elementIsExistWithLog('SpoilerMenu', args.btnsSelector, args.contentBlocksSelector)) {
			return
		} else if (args.maxWorkWidth < 0 || args.animationDuration < 0) {
			console.log('[SpoilerMenu] maxWorkWidth < 0 or animationDuration < 0!')
		}

		SpoilerMenu.spoilerButtons = document.querySelectorAll(args.btnsSelector);
		SpoilerMenu.spoilerContentElements = document.querySelectorAll(args.contentBlocksSelector);

		if (SpoilerMenu.spoilerButtons.length != SpoilerMenu.spoilerContentElements.length) {
			console.log('[SpoilerMenu] The count of buttons and content-elements must be equal.')
			return
		}

		SpoilerMenu.spoilerVisibleWidth = args.maxWorkWidth;
		SpoilerMenu.animationDuration = args.animationDuration;

		this.toggleToSpoilers();

		//? Determines spoilers when the page is resized.
		window.addEventListener(`resize`, this.toggleToSpoilers)
	}


	private toggleToSpoilers() {
		for (let i = 0; i < SpoilerMenu.spoilerContentElements.length; i++) {
			if (window.innerWidth <= SpoilerMenu.spoilerVisibleWidth) {
				SpoilerMenu.spoilerContentElements[i].classList.add('spoiler-content-active');
				SpoilerMenu.spoilerButtons[i].classList.add('spoiler-btn-active');
			} else {
				SpoilerMenu.spoilerContentElements[i].classList.remove('spoiler-content-active');
				SpoilerMenu.spoilerButtons[i].classList.remove('spoiler-btn-active');
			}
			if (SpoilerMenu.spoilerButtons[i].classList.contains(SpoilerMenu.btnActiveClass)) {
				SpoilerMenu.spoilerContentElements[i].hidden = false
			} else {
				SpoilerMenu.spoilerContentElements[i].hidden = true
			}
		}

		for (let spoilerButton of SpoilerMenu.spoilerButtons) {
			spoilerButton.addEventListener('click', this.toggleSpoilerState);
		}
	}

	private toggleSpoilerState(event: Event) {
		let targetSpoilerButton = event.currentTarget as HTMLElement;
		let spoilerContainer = targetSpoilerButton.nextElementSibling as HTMLElement;

		if (spoilerContainer.classList.contains('_slide') === false) {
			toggleSpoilerAnimation(spoilerContainer, SpoilerMenu.animationDuration);

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