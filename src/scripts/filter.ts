import Filter from './modules/filter.src.js'
/*
	When you press the filter__button, all elements that do not have 
	a value similar to the filter__button attribute value will be hidden.
	To reset the filter through a filter__button, 
	you should use the 'all' value for the data-filt-content attribute.

	You can declare multiple filters to work separately.
*/
let someFilter = new Filter({
	filtButtonsSelector: '.filter__button',
	filtElementsSelector: '.filter__item',
})