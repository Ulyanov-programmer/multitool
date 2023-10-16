import Spoiler, { Ajar } from './spoiler.src.js'

new Spoiler({
  wrappersSelector: '.spoiler_1',
  maxWorkWidth: 10000,
  animationDuration: 300,

  // ajar: new Ajar({
  //   deleteButtonAfterOpening: false,
  //   defaultHeight: '2em'
  // })
})