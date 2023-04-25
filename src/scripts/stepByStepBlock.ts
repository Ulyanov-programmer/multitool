import StepByStepBlock from './modules/stepByStepBlock.src.js'
import '../libs/just-validate.production.min.js'

let validateOneBlock = new JustValidate('#mainForm', {
  errorFieldCssClass: 'invalid',
  errorLabelCssClass: 'invalid',
  errorLabelStyle: {
    fontSize: '14px',
    color: 'white',
    marginBlock: '5px',
  },

  errorsContainer: '#errorsContainer',
})
  .addField('#firstEmail', [
    {
      rule: 'function',
      validator: (str) => {
        return /^[0-9]{2}/.test(str)
      },
      errorMessage: 'error',
    },
    {
      rule: 'required',
      errorMessage: 'error',
    },
  ])


new StepByStepBlock({
  stepsContainerSelector: '.steps_container',
  nextButtonsSelector: '.next_step_button',
  prevButtonsSelector: '.prev_step_button',
  statusBlocksSelector: '.status_block',
  transitionTimeout: 500,
  gapPercent: 20,
  checkFunctions: {
    0: () => {
      return validateOneBlock.revalidate()
    },
    1: () => {
      return true
    },
    final: () => {
      return false
    },
  }
})