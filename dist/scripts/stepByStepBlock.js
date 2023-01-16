import StepByStepBlock from "./modules/stepByStepBlock.src.js";
new StepByStepBlock({
  stepsContainerSelector: ".steps_container",
  nextButtonsSelector: ".next_step_button",
  prevButtonsSelector: ".prev_step_button",
  statusBlocksSelector: ".status_block",
  transitionTimeout: 500,
  gapPercent: 20
});
