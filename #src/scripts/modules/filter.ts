export default class Filter {
  filterButtons;
  filterContentElements;

  /**
  *? this is try to use tsdocs.
  * Register or update value for specified key.
  * @param filtButtonsSelector Key to identify value in container.
  * @param filtElementsSelector Value to inject.
  * @returns Created new Filter
  */
  constructor(filtButtonsSelector, filtElementsSelector) {
    if (filtButtonsSelector && filtElementsSelector) {

      this.filterButtons = document.querySelectorAll(filtButtonsSelector);
      this.filterContentElements = document.querySelectorAll(filtElementsSelector);;

      for (const filtButton of this.filterButtons) {
        filtButton.addEventListener('click', () => {
          this.filtContentByType(filtButton, this.filterContentElements)
        });
      }
    } else {
      throw '[FILTER] Length of filter elements must be more than zero.'
    }
  }


  filtContentByType(filterButton, filterContentElements) {
    let typeOfContent = filterButton.dataset.filtContent;

    for (const filtElement of filterContentElements) {
      if (typeOfContent === 'all' || filtElement.dataset.contentType === typeOfContent) {
        filtElement.style.display = '';
      } else {
        filtElement.style.display = 'none';
      }
    }
  }
}