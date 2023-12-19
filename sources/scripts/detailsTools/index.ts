import DetailsMain, { Details, Ajar } from './detailsTools.src.js'

new DetailsMain(
  new Details({
    // You can specify as many instances as you want, a sequence is not important.

    // if not specified, value is equivalent to: detailsSelector: 'details'
    // Options with the specified detailsSelector have a higher priority than without it.
    // detailsSelector: '[data-spoiler]',

    maxWorkWidth: 768,
    animationDuration: 300,

    // ajar: new Ajar({
    //   defaultHeight: '1em',
    //   hideButtonAfterOpening: false,
    // })
  }),
)