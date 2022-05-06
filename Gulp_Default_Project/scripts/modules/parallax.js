import { elementIsExistWithLog } from "./general.js";
export default class Parallax {
    constructor(arg, ...parallaxItems) {
        this.parallaxElements = new Array();
        this.reverse = false;
        if (!elementIsExistWithLog('Parallax', arg.parallaxContainerSelector))
            return;
        this.parallaxContainer = document.querySelector(arg.parallaxContainerSelector);
        this.containerRect = this.parallaxContainer.getBoundingClientRect();
        this.containerCenterCoordX = Math.round(this.containerRect.width / 2);
        this.containerCenterCoordY = Math.round(this.containerRect.height / 2);
        this.reverse = arg.reverse;
        for (let parallaxItem of parallaxItems) {
            if (!parallaxItem)
                return;
            if (!parallaxItem.htmlElement) {
                parallaxItem.htmlElement = document.querySelector(parallaxItem.selector);
            }
            this.parallaxElements.push(parallaxItem);
        }
        this.parallaxContainer.addEventListener('mousemove', (e) => window.outerWidth >= arg.minWorkWidth ? this.moveElements(e) : false);
    }
    moveElements(e) {
        let mouseX = e.pageX - this.parallaxContainer.offsetLeft;
        let mouseY = e.pageY - this.parallaxContainer.offsetTop;
        let relativeCoordX = mouseX - this.containerCenterCoordX;
        let relativeCoordY = mouseY - this.containerCenterCoordY;
        if (this.reverse) {
            relativeCoordX *= -1;
            relativeCoordY *= -1;
        }
        for (let el of this.parallaxElements) {
            el.htmlElement.style.transform =
                `translate3d(${relativeCoordX * el.parallaxCoeffX}px, ${relativeCoordY * el.parallaxCoeffY}px, 0)`;
        }
    }
}
export class ParallaxElement {
    constructor(arg) {
        if (typeof arg.selectorOrElement == 'string') {
            if (!elementIsExistWithLog('ParallaxElement'))
                return;
            this.selector = arg.selectorOrElement;
        }
        else {
            this.htmlElement = arg.selectorOrElement;
        }
        this.parallaxCoeffX = arg.parallaxCoeffX;
        this.parallaxCoeffY = arg.parallaxCoeffY;
    }
}
