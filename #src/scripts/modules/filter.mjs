export default class Filter {
  filterButtons;
  filterContentElements;

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
/*
? For working add data-attributes [ data-filt-content="type" ] for filter buttons,
? And [ data-content-type="type" ] for content-blocks.
*/