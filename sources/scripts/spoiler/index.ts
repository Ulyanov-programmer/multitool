import Spoiler, { Ajar } from './spoiler.src.js'

new Spoiler({
  wrappersSelector: '[data-spoiler]',
  maxWorkWidth: 10000,
  animationDuration: 300,

  // ajar: new Ajar({
  //   defaultHeight: '1em',
  //   deleteButtonAfterOpening: false,
  // })
})