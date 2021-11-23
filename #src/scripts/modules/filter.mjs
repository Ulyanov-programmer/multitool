export default class Filter {
  filterButtons = NodeList;
  filterContentElements = NodeList;

  constructor(filtButtons, filtElements) {

    if (filtButtons.length > 0 && filtElements.length > 0) {
      this.filterButtons = filtButtons;
      this.filterContentElements = filtElements;

      for (const filtButton of this.filterButtons) {
        filtButton.addEventListener('click', () => {
          Filter.filtContentByType(filtButton, this.filterContentElements)
        });
      }
    } else {
      throw 'Length of filter elements must be more than zero.'
    }
  }


  static filtContentByType(filterButton, filterContentElements) {
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