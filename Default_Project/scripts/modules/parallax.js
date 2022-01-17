import { isNullOrWhiteSpaces } from "./general.js";
export class Parallax {
    constructor(parallaxContainerSelector, ...parallaxItems) {
        this.speed = 0.05;
        this.coordProcX = 0;
        this.coordProcY = 0;
        this.parallaxElements = new Array();
        if (isNullOrWhiteSpaces(parallaxContainerSelector)) {
            throw '[PARALLAX] Count of filter elements must be more than zero.';
        }
        this.parallaxContainer = document.querySelector(parallaxContainerSelector);
        for (const parallaxItem of parallaxItems) {
            if (parallaxItem) {
                parallaxItem.htmlElement = document.querySelector(parallaxItem.selector);
                this.parallaxElements.push(parallaxItem);
            }
        }
        this.parallaxContainer.addEventListener('mousemove', (e) => {
            let parallaxWidth = this.parallaxContainer.clientWidth;
            let parallaxheight = this.parallaxContainer.clientHeight;
            let coordX = e.pageX - parallaxWidth / 2;
            let coordY = e.pageY - parallaxheight / 2;
            this.coordProcX = coordX / parallaxWidth * 100;
            this.coordProcY = coordY / parallaxheight * 100;
            for (const element of this.parallaxElements) {
                element.htmlElement.style.transform =
                    `translate(${this.coordProcX / element.parallaxCoeff}%, ${this.coordProcY / element.parallaxCoeff}%)`;
            }
        });
    }
}
export class ParallaxElement {
    constructor(selector, parallaxCoeff) {
        this.selector = selector;
        this.parallaxCoeff = parallaxCoeff;
    }
}
