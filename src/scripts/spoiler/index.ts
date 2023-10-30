import Spoiler, { Ajar } from './spoiler.src.js'

new Spoiler({
  wrappersSelector: '.spoiler_1',
  maxWorkWidth: 10000,
  animationDuration: 300,

  // ajar: new Ajar({
  //   defaultHeight: '2em',
  //   deleteButtonAfterOpening: false,
  // })
})