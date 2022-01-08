import { isNullOrWhiteSpaces } from "./general.js";
export default class Filter {
    constructor(filtButtonsSelector, filtElementsSelector) {
        if (isNullOrWhiteSpaces(filtButtonsSelector, filtElementsSelector)) {
            throw '[FILTER] Count of filter elements must be more than zero.';
        }
        this.filterButtons = document.querySelectorAll(filtButtonsSelector);
        this.filterContentElements = document.querySelectorAll(filtElementsSelector);
        ;
        for (const filtButton of this.filterButtons) {
            filtButton.addEventListener('click', () => {
                this.filtContentByType(filtButton, this.filterContentElements);
            });
        }
    }
    filtContentByType(filterButton, filterContentElements) {
        let typeOfContent = filterButton.dataset.filtContent;
        for (const filtElement of filterContentElements) {
            if (typeOfContent === 'all' || filtElement.dataset.contentType === typeOfContent) {
                filtElement.style.display = '';
            }
            else {
                filtElement.style.display = 'none';
            }
        }
    }
}
