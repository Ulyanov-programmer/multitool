import StepByStepBlock, { Form } from './stepByStepBlock.src.js'
// import '../../libs/just-validate.production.min.js'


new StepByStepBlock({
  stepsContainerSelector: '.steps_container',
  nextButtonsSelector: '.next_step_button',
  prevButtonsSelector: '.prev_step_button',
  statusBlocksSelector: '.status_block',
  transitionTimeout: 500,
  gapPercent: 20,
  checkFunctions: {
    0: () => {
      return true
    },
    final: () => {
      return false
    },
  },
  form: new Form({
    formSelector: '#form',
    onSubmitFunction: function onSubmitForm(submitEvent: SubmitEvent) {
      submitEvent.preventDefault()
    }
  })
})