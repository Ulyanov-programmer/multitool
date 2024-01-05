import StepByStepBlock, { Form, Direction } from './stepByStepBlock.src.js'
// import '../../libs/just-validate.production.min.js'

new StepByStepBlock({
  stepsContainerSelector: '.steps_container',
  nextButtonsSelector: '.next_step',
  prevButtonsSelector: '.prev_step',
  statusBlocksSelector: '.status',
  switchCurrentBlockByClickOnStatus: true,

  transitionDuration: 500,
  // transitionTimingFunction: 'ease-in-out',
  // gapPercent: 10,
  // direction: Direction.toRight,

  // checkFunctions: {
  //   0: () => { return true },
  //   final: () => { return false },
  // },

  // form: new Form({
  //   formSelector: '#form',

  //   onSubmitFunction(submitEvent: SubmitEvent) {
  //     submitEvent.preventDefault()
  //   },
  // })
})