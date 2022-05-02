import { isNullOrWhiteSpaces } from "./general.js";
export default class Parallax {
    constructor(arg, ...parallaxItems) {
        this.coordProcX = 0;
        this.coordProcY = 0;
        this.parallaxElements = new Array();
        if (isNullOrWhiteSpaces(arg.parallaxContainerSelector))
            throw '[PARALLAX] Incorrect args in constructor.';
        this.parallaxContainer = document.querySelector(arg.parallaxContainerSelector);
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
        let parallaxWidth = this.parallaxContainer.clientWidth;
        let parallaxheight = this.parallaxContainer.clientHeight;
        let coordX = e.pageX - parallaxWidth / 2;
        let coordY = e.pageY - parallaxheight / 2;
        this.coordProcX = coordX / parallaxWidth * 100;
        this.coordProcY = coordY / parallaxheight * 100;
        for (let el of this.parallaxElements) {
            el.htmlElement.style.transform =
                `translate3d(${this.coordProcX / el.parallaxCoeff}%, ${this.coordProcY / el.parallaxCoeff}%, 0)`;
        }
    }
}
export class ParallaxElement {
    constructor(arg) {
        if (typeof arg.selectorOrElement == 'string') {
            if (isNullOrWhiteSpaces(arg.selectorOrElement) || arg.parallaxCoeff < 1)
                throw '[PARALLAX] Incorrect arguments in ParallaxElement.';
            this.selector = arg.selectorOrElement;
        }
        else {
            this.htmlElement = arg.selectorOrElement;
        }
        this.parallaxCoeff = arg.parallaxCoeff;
    }
}
