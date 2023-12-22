import { AutoScrollPaddingItem, PaddingDirection } from './autoScrollPadding.src.js'
/**
  Need to install scroll-padding and scroll-behavior, but too lazy to bother, or is the element constantly changing? Initialize AutoScrollPadding and pass the parameters, he will do everything himself.
*/
new AutoScrollPaddingItem({
  fixedElementSelector: '#some_fixed_element',

  gap: 10,
  scrollBehavior: 'smooth',
  scrollableParentSelector: 'html',
  setInCssVariable: '--scroll-padding',
  // cssVariableLocation: '.element',
  paddingDirection: PaddingDirection.Top,
})