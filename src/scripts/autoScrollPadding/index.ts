import { AutoScrollPadding, AutoScrollPaddingItem, PaddingDirection } from './autoScrollPadding.src.js'
/**
  Need to install scroll-padding and scroll-behavior, but too lazy to bother, or is the element constantly changing? Initialize AutoScrollPadding and pass the parameters, he will do everything himself.
*/
new AutoScrollPadding(
  // new AutoScrollPaddingItem({
  //   fixedElementSelector: '.some_header',
  //   gap: 0,
  //   // scrollableParentSelector: '.parent',
  //   // setInCssVariable: '--scroll-padding',
  //   // paddingDirection: PaddingDirection.Top,
  // }),
)