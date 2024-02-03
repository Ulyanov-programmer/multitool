import StepByStepBlock from './stepByStepBlock.src.js'

new StepByStepBlock({
  stepsContainerSelector: '.steps_container',
  nextButtonsSelector: '.next_step',
  prevButtonsSelector: '.prev_step', transitionDuration: 2000
})