import { sleep, elementIsExistWithLog } from "./general.js";
export var ToggleTabsEvent;
(function (ToggleTabsEvent) {
    ToggleTabsEvent[ToggleTabsEvent["Click"] = 0] = "Click";
    ToggleTabsEvent[ToggleTabsEvent["Hover"] = 1] = "Hover";
})(ToggleTabsEvent || (ToggleTabsEvent = {}));
export default class Tab {
    constructor(arg) {
        this.isToggling = false;
        this.autoHeight = false;
        this.toggleTabsEvent = 'click';
        this.containerheight = 0;
        this.buttonsActiveClass = 'active';
        this.contentActiveClass = 'active';
        if (!elementIsExistWithLog('Tab', arg.btnsSelector, arg.contentBlocksSelector))
            return;
        this.buttons = document.querySelectorAll(arg.btnsSelector);
        this.contentElements = document.querySelectorAll(arg.contentBlocksSelector);
        if (this.buttons.length != this.contentElements.length) {
            console.log('[Tab] The count of buttons and content-elements is not equal.');
            return;
        }
        if (arg.buttonsActiveClass)
            this.buttonsActiveClass = arg.buttonsActiveClass;
        if (arg.contentActiveClass)
            this.contentActiveClass = arg.contentActiveClass;
        if (arg.firstButtonIsNotActive == undefined || arg.firstButtonIsNotActive == false)
            this.buttons[0].classList.add(this.buttonsActiveClass);
        this.contentElements[0].classList.add(this.contentActiveClass);
        if (arg.autoHeight)
            this.autoHeight = arg.autoHeight;
        let someTabElement = document.querySelector(arg.contentBlocksSelector);
        this.parentOfContentElements = someTabElement.parentElement;
        if (arg.animationDuration) {
            this.animationDuration = arg.animationDuration;
        }
        else {
            this.animationDuration = parseFloat(getComputedStyle(someTabElement)
                .getPropertyValue('transition-duration')) * 1000;
        }
        this.switchingLockTime = this.animationDuration;
        this.setToggleTabsEvent(arg.toggleTabsBy);
        if (arg.fadeEffect) {
            this.setFadeTabs();
            window.addEventListener('resize', this.resizeFadeTabs.bind(this));
            for (let tabButton of this.buttons) {
                tabButton.addEventListener(this.toggleTabsEvent, () => this.toggleTabsFade(tabButton));
            }
        }
        else {
            this.setDefaultTabs();
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
            }
            else if (this.autoHeight && this.containerheight <= 0) {
                this.containerheight = this.contentElements[0].clientHeight;
            }
            if (contentElement.classList.contains(this.contentActiveClass) == false)
                contentElement.style.opacity = '0';
            contentElement.style.transform = `translateY(-${marginForCurrentElement}px)`;
            marginForCurrentElement += contentElement.clientHeight;
        }
        this.parentOfContentElements.style.display = 'flex';
        this.parentOfContentElements.style.flexDirection = 'column';
        this.parentOfContentElements.style.overflow = 'hidden';
        this.setContainerHeight(this.containerheight);
        this.parentOfContentElements.style.transition = `height ${this.animationDuration}ms`;
        for (let contentElement of this.contentElements) {
            contentElement.style.transition = `opacity ${this.animationDuration}ms`;
        }
    }
    setDefaultTabs() {
        for (let contentElement of this.contentElements) {
            if (contentElement.classList.contains(this.contentActiveClass) == false) {
                contentElement.setAttribute('hidden', '');
                contentElement.style.display = 'none';
                contentElement.style.opacity = '0';
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
        }
        else {
            this.parentOfContentElements.style.height = `${this.contentElements[0].clientHeight}px`;
        }
        for (let contentElement of this.contentElements) {
            contentElement.style.transform = `translateY(-${marginForCurrentElement}px)`;
            marginForCurrentElement += contentElement.clientHeight;
        }
    }
    toggleTabsFade(activeTabButton) {
        if (this.toggleTogglingStateIfPossible(activeTabButton) == false) {
            return;
        }
        this.toggleTabButtons(activeTabButton);
        let currentActiveElement = this.getCurrentActiveTab();
        let nextContentElement = this.getTabByPressedButton(activeTabButton);
        currentActiveElement.style.opacity = '0';
        if (this.autoHeight) {
            this.setContainerHeight(nextContentElement.clientHeight);
        }
        nextContentElement.style.opacity = '1';
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
        currentActiveElement.style.opacity = '0';
        await sleep(this.animationDuration);
        currentActiveElement.setAttribute('hidden', '');
        currentActiveElement.style.display = 'none';
        nextContentElement.removeAttribute('hidden');
        nextContentElement.style.display = '';
        this.setContainerHeight(nextContentElement.clientHeight);
        await sleep(20);
        nextContentElement.style.opacity = '1';
        nextContentElement.classList.add(this.contentActiveClass);
        setTimeout(() => {
            this.isToggling = false;
        }, this.switchingLockTime);
    }
    toggleTabButtons(activeTabButton) {
        for (let accordBtn of this.buttons) {
            if (accordBtn != activeTabButton) {
                accordBtn.classList.remove(this.buttonsActiveClass);
            }
            else {
                accordBtn.classList.add(this.buttonsActiveClass);
            }
        }
    }
    toggleTogglingStateIfPossible(activeTabButton) {
        if (activeTabButton.classList.contains(this.buttonsActiveClass) || this.isToggling) {
            return false;
        }
        else {
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
    }
    getTabByPressedButton(activeTabButton) {
        return this.contentElements[activeTabButton.dataset.toggleElemNumber];
    }
    setContainerHeight(height) {
        if (height) {
            this.parentOfContentElements.style.height = `${height}px`;
        }
        else {
            this.parentOfContentElements.style.height = `${this.contentElements[0].clientHeight}px`;
        }
    }
    setToggleTabsEvent(toggleTabsEvent) {
        switch (toggleTabsEvent) {
            case ToggleTabsEvent.Hover:
                this.toggleTabsEvent = 'mouseenter';
                this.switchingLockTime = 0;
                break;
            default:
                this.toggleTabsEvent = 'click';
                break;
        }
    }
}