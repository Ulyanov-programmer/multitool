import { AutoScrollPadding, AutoScrollPaddingItem } from './modules/autoScrollPadding.src.js'
/**
  Need to install scroll-padding and scroll-behavior, but too lazy to bother, or is the element constantly changing? Initialize AutoScrollPadding and pass the parameters, he will do everything himself.
*/
new AutoScrollPadding(
  new AutoScrollPaddingItem({
    fixedElementSelector: '.header',
    gap: 10,
  }),
  // new AutoScrollPaddingItem({
  //   fixedElementSelector: '.some_fixed_element',
  //   localParams: {
  //     scrollableParentSelector: '.some_scrollable_parent',
  //   }
  // }),
)