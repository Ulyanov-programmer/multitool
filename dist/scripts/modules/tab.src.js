import { sleep, elementIsExistWithLog } from "./general.js";
export var ToggleTabsEvent = /* @__PURE__ */ ((ToggleTabsEvent2) => {
  ToggleTabsEvent2[ToggleTabsEvent2["Click"] = 0] = "Click";
  ToggleTabsEvent2[ToggleTabsEvent2["Hover"] = 1] = "Hover";
  return ToggleTabsEvent2;
})(ToggleTabsEvent || {});
export default class Tab {
  constructor(arg) {
    this.isToggling = false;
    this.toggleTabsEvent = "click";
    this.containerheight = 0;
    if (!elementIsExistWithLog("Tab", arg.btnsSelector, arg.contentBlocksSelector))
      return;
    this.buttons = document.querySelectorAll(arg.btnsSelector);
    this.contentElements = document.querySelectorAll(arg.contentBlocksSelector);
    if (this.buttons.length != this.contentElements.length) {
      console.log("[Tab] The count of buttons and content-elements is not equal.");
      return;
    }
    this.buttonsActiveClass = arg.buttonsActiveClass ? arg.buttonsActiveClass : "active";
    this.contentActiveClass = arg.contentActiveClass ? arg.contentActiveClass : "active";
    this.autoHeight = arg.autoHeight ? arg.autoHeight : false;
    if (!arg.firstButtonIsNotActive)
      this.buttons[0].classList.add(this.buttonsActiveClass);
    this.contentElements[0].classList.add(this.contentActiveClass);
    let someTabElement = document.querySelector(arg.contentBlocksSelector);
    this.parentOfContentElements = someTabElement.parentElement;
    if (arg.animationDuration) {
      this.animationDuration = arg.animationDuration;
    } else {
      this.animationDuration = parseFloat(getComputedStyle(someTabElement).getPropertyValue("transition-duration")) * 1e3;
    }
    this.switchingLockTime = this.animationDuration;
    this.setToggleTabsEvent(arg.toggleTabsBy);
    if (arg.fadeEffect) {
      this.setFadeTabs();
      this.resizeFadeTabs();
      window.addEventListener("resize", this.resizeFadeTabs.bind(this));
      for (let tabButton of this.buttons) {
        tabButton.addEventListener(this.toggleTabsEvent, () => this.toggleTabsFade(tabButton));
      }
    } else {
      this.setDefaultTabs();
      this.resizeTabs();
      window.addEventListener("resize", this.resizeTabs.bind(this));
      for (let tabButton of this.buttons) {
        tabButton.addEventListener(this.toggleTabsEvent, () => this.toggleTabs(tabButton));
      }
    }
  }
  setFadeTabs() {
    let marginForCurrentElement = 0;
    for (let contentElement of this.contentElements) {
      if (!this.autoHeight && contentElement.clientHeight > this.containerheight) {
        this.containerheight = contentElement.clientHeight;
      } else if (this.autoHeight && this.containerheight <= 0) {
        this.containerheight = this.contentElements[0].clientHeight;
      }
      if (contentElement.classList.contains(this.contentActiveClass) == false) {
        contentElement.style.opacity = "0";
        contentElement.style.pointerEvents = "none";
      }
      contentElement.style.transform = `translateY(-${marginForCurrentElement}px)`;
      marginForCurrentElement += contentElement.clientHeight;
    }
    this.parentOfContentElements.style.overflow = "hidden";
    this.setContainerHeight(this.containerheight);
    this.parentOfContentElements.style.transition = `height ${this.animationDuration}ms`;
    for (let contentElement of this.contentElements) {
      contentElement.style.transition = `opacity ${this.animationDuration}ms`;
    }
  }
  setDefaultTabs() {
    for (let contentElement of this.contentElements) {
      if (contentElement.classList.contains(this.contentActiveClass) == false) {
        contentElement.setAttribute("hidden", "");
        contentElement.style.display = "none";
        contentElement.style.opacity = "0";
        contentElement.style.pointerEvents = "none";
      }
      contentElement.style.transition = `opacity ${this.animationDuration}ms`;
      this.setContainerHeight();
      this.parentOfContentElements.style.transition = `height ${this.animationDuration}ms`;
    }
  }
  resizeFadeTabs() {
    let currentActiveElement = this.getCurrentActiveTab();
    let marginForCurrentElement = 0;
    if (currentActiveElement) {
      this.parentOfContentElements.style.height = `${currentActiveElement.clientHeight}px`;
    } else {
      this.parentOfContentElements.style.height = `${this.contentElements[0].clientHeight}px`;
    }
    for (let contentElement of this.contentElements) {
      contentElement.style.transform = `translateY(-${marginForCurrentElement}px)`;
      marginForCurrentElement += contentElement.clientHeight;
    }
  }
  resizeTabs() {
    let currentActiveElement = this.getCurrentActiveTab();
    if (currentActiveElement) {
      this.parentOfContentElements.style.height = `${currentActiveElement.clientHeight}px`;
    } else {
      this.parentOfContentElements.style.height = `${this.contentElements[0].clientHeight}px`;
    }
  }
  toggleTabsFade(activeTabButton) {
    if (this.toggleTogglingStateIfPossible(activeTabButton) == false) {
      return;
    }
    this.toggleTabButtons(activeTabButton);
    let currentActiveElement = this.getCurrentActiveTab();
    let nextContentElement = this.getTabByPressedButton(activeTabButton);
    currentActiveElement.style.opacity = "0";
    currentActiveElement.style.pointerEvents = "none";
    if (this.autoHeight) {
      this.setContainerHeight(nextContentElement.clientHeight);
    }
    nextContentElement.style.opacity = "1";
    nextContentElement.style.removeProperty("pointer-events");
    currentActiveElement.classList.remove(this.contentActiveClass);
    nextContentElement.classList.add(this.contentActiveClass);
    setTimeout(() => {
      this.isToggling = false;
    }, this.switchingLockTime);
  }
  async toggleTabs(activeTabButton) {
    if (this.toggleTogglingStateIfPossible(activeTabButton) == false) {
      return;
    }
    this.toggleTabButtons(activeTabButton);
    let currentActiveElement = this.getCurrentActiveTab();
    let nextContentElement = this.getTabByPressedButton(activeTabButton);
    currentActiveElement.classList.remove(this.contentActiveClass);
    currentActiveElement.style.opacity = "0";
    currentActiveElement.style.pointerEvents = "none";
    await sleep(this.animationDuration);
    currentActiveElement.setAttribute("hidden", "");
    currentActiveElement.style.display = "none";
    nextContentElement.removeAttribute("hidden");
    nextContentElement.style.removeProperty("pointer-events");
    nextContentElement.style.display = "";
    this.setContainerHeight(nextContentElement.clientHeight);
    await sleep(20);
    nextContentElement.style.opacity = "1";
    nextContentElement.classList.add(this.contentActiveClass);
    setTimeout(() => {
      this.isToggling = false;
    }, this.switchingLockTime);
  }
  toggleTabButtons(activeTabButton) {
    for (let accordBtn of this.buttons) {
      if (accordBtn != activeTabButton) {
        accordBtn.classList.remove(this.buttonsActiveClass);
      } else {
        accordBtn.classList.add(this.buttonsActiveClass);
      }
    }
  }
  toggleTogglingStateIfPossible(activeTabButton) {
    if (activeTabButton.classList.contains(this.buttonsActiveClass) || this.isToggling) {
      return false;
    } else {
      this.isToggling = true;
      return true;
    }
  }
  getCurrentActiveTab() {
    for (let contElem of this.contentElements) {
      if (contElem.classList.contains(this.contentActiveClass)) {
        return contElem;
      }
    }
    return this.contentElements[0];
  }
  getTabByPressedButton(activeTabButton) {
    return this.contentElements[activeTabButton.dataset.toggleElemNumber];
  }
  setContainerHeight(height) {
    if (height) {
      this.parentOfContentElements.style.height = `${height}px`;
    } else {
      this.parentOfContentElements.style.height = `${this.contentElements[0].clientHeight}px`;
    }
  }
  setToggleTabsEvent(toggleTabsEvent) {
    switch (toggleTabsEvent) {
      case 1 /* Hover */:
        this.toggleTabsEvent = "mouseenter";
        this.switchingLockTime = 0;
        break;
      default:
        this.toggleTabsEvent = "click";
        break;
    }
  }
}
