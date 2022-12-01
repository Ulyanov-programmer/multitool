import { elementIsExistWithLog } from "./general.js";
export default class StepByStepBlock {
  constructor(arg) {
    if (!elementIsExistWithLog("StepByStep", arg.stepsContainerSelector, arg.nextButtonsSelector, arg.prevButtonsSelector))
      return;
    this.stepsContainer = document.querySelector(arg.stepsContainerSelector);
    this.stepBlocks = this.stepsContainer.children;
    this.currentActiveBlockIndex = 0;
    this.currentTranslateMultipler = this.currentActiveBlockIndex;
    this.transitionTimeout = arg.transitionTimeout ? arg.transitionTimeout : 500;
    this.gapPercent = arg.gapPercent ? arg.gapPercent : 5;
    this.statusBlocksSelector = document.querySelectorAll(arg.statusBlocksSelector);
    this.nextButtons = document.querySelectorAll(arg.nextButtonsSelector);
    this.prevButtons = document.querySelectorAll(arg.prevButtonsSelector);
    this.stepsContainer.style.display = "flex";
    this.stepsContainer.style.flexFlow = "row nowrap";
    this.stepsContainer.style.overflowX = "hidden";
    for (let stepBlock of this.stepBlocks) {
      stepBlock.style.transition = `transform ${this.transitionTimeout}ms ease`;
    }
    for (let nextButton of this.nextButtons) {
      nextButton.addEventListener("click", this.toggleNextFormBlock.bind(this));
    }
    for (let prevButton of this.prevButtons) {
      prevButton.addEventListener("click", this.togglePrevFormBlock.bind(this));
    }
    if (arg.statusBlocksSelector) {
      this.statusBlocksSelector[this.currentActiveBlockIndex].classList.add("active");
    }
    this.initFormBlocksRow();
  }
  initFormBlocksRow() {
    let activeElement = this.stepBlocks[this.currentActiveBlockIndex];
    let nextElement = this.stepBlocks[this.currentActiveBlockIndex + 1];
    if (nextElement == void 0)
      return;
    activeElement.style.transform = `translateX(0%)`;
    nextElement.style.transform = `translateX(${this.gapPercent}%)`;
  }
  toggleNextFormBlock() {
    let activeElement = this.getActiveBlock();
    let nextElement = this.getSecondBlock(false);
    let afterNextElement = this.getThriedBlock(false);
    let activeDependentBlock = this.statusBlocksSelector[this.currentActiveBlockIndex + 1];
    if (nextElement == void 0)
      return;
    this.currentTranslateMultipler += 1;
    activeElement.style.transform = `translateX(-${this.currentTranslateMultipler * 100 + this.gapPercent}%)`;
    if (activeDependentBlock) {
      activeDependentBlock.classList.add("active");
    }
    this.currentActiveBlockIndex += 1;
    nextElement.style.transform = `translateX(-${this.currentTranslateMultipler * 100}%)`;
    if (afterNextElement) {
      afterNextElement.style.transform = `translateX(-${this.currentTranslateMultipler * 100 - this.gapPercent}%)`;
    }
  }
  togglePrevFormBlock() {
    let activeElement = this.getActiveBlock();
    let prevElement2 = this.getSecondBlock(true);
    let beforePrevElement2 = this.getThriedBlock(true);
    let activeDependentBlock = this.statusBlocksSelector[this.currentActiveBlockIndex];
    if (prevElement2 == void 0)
      return;
    this.currentTranslateMultipler -= 1;
    let activeElementTransform = this.currentTranslateMultipler * 100 - this.gapPercent;
    if (activeElementTransform < 0) {
      activeElementTransform = this.gapPercent;
      activeElement.style.transform = `translateX(${activeElementTransform}%)`;
    } else {
      activeElement.style.transform = `translateX(-${activeElementTransform}%)`;
    }
    if (activeDependentBlock) {
      activeDependentBlock.classList.remove("active");
    }
    this.currentActiveBlockIndex -= 1;
    prevElement2.style.transform = `translateX(-${this.currentTranslateMultipler * 100}%)`;
    if (beforePrevElement2) {
      beforePrevElement2.style.transform = `translateX(-${this.currentTranslateMultipler * 100 + this.gapPercent}%)`;
    }
  }
  getActiveBlock() {
    let activeElement = this.stepBlocks[this.currentActiveBlockIndex];
    return activeElement;
  }
  getSecondBlock(prevOrNextElement) {
    let multipler = this.returnMultipler(prevOrNextElement);
    let prevElement = this.stepBlocks[eval(`${this.currentActiveBlockIndex} ${multipler} 1`)];
    return prevElement;
  }
  getThriedBlock(prevOrNextElement) {
    let multipler = this.returnMultipler(prevOrNextElement);
    let beforePrevElement = this.stepBlocks[eval(`${this.currentActiveBlockIndex} ${multipler} 2`)];
    return beforePrevElement;
  }
  returnMultipler(prevOrNextElement2) {
    if (prevOrNextElement2) {
      return "-";
    } else {
      return "+";
    }
  }
}
