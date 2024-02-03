# Instruction

This script allows you to create an interface element, parts of which will be shown to the user in strict sequence. <br>
This is useful, for example, for forms.

## Initialization

1. To initialize, create an ts/js file and connect it to your HTML page.

2. Write the following code in the created file:

```ts
import StepByStepBlock from './your_path_to_stepByStep_folder/stepByStepBlock.src.js';

new StepByStepBlock({
  stepsContainerSelector: '.steps_container',
  nextButtonsSelector: '.next_step',
  prevButtonsSelector: '.prev_step',
});
```

3. Create the following markup in your HTML file:

```html
<div class="steps_container">
  <div>Item number one</div>
  <div>Item number two</div>
  <div>Item number three</div>
</div>

<button class="next_step" type="button">Next</button>
<button class="prev_step" type="button">Previous</button>
```

4. That's all!

## API

To fine-tune the script, you can use the following API functions:

```ts
import StepByStepBlock, {
  Direction,
} from './your_path_to_stepByStep_folder/stepByStepBlock.src.js';

new StepByStepBlock({
  // The selector of the html element that contains the step blocks.
  stepsContainerSelector: '.steps_container',

  // The selector of the buttons that will switch the blocks-steps to the next ones.
  nextButtonsSelector: '.next_step',

  // The selector of the buttons that will switch the blocks-steps to the previous ones.
  prevButtonsSelector: '.prev_step',

  // Transition animation time in milliseconds.
  transitionDuration: 500,

  // The transition function.
  transitionTimingFunction: 'ease-in-out',

  // The indentation between the steps inside the container. Specify the percentage.
  gapPercent: 10,

  /*
    You can change the direction of the transition animation for the steps.
    Don't forget to import the Direction:
    import StepByStepBlock, { Direction } from '...'

    Acceptable values: 
      Direction.toRight
      Direction.toLeft
      Direction.toTop
      Direction.toBottom
  */
  direction: Direction.toRight,
});
```

### Status Blocks

You can let the user know what stage they are at, and also allow them to quickly switch between steps using the following API functions:

```ts
new StepByStepBlock({
  ...,

  // A selector of blocks that will change depending on the current active step.
  statusBlocksSelector: '.steps_statuses .status',

  // If true, it allows you to switch steps by clicking on the status block, but only to a previous step.
  switchCurrentBlockByClickOnStatus: true,
})
```

```html
<!-- Usage example -->
<header class="steps_statuses">
  <button class="status" type="button">Step one</button>
  <button class="status" type="button">Step two</button>
  <button class="status" type="button">Step three</button>
</header>

<div class="steps_container">
  <div>Item number one</div>
  <div>Item number two</div>
  <div>Item number three</div>
</div>
```

1. The status block whose step block is active gets the `active-step` class.
2. If the step was switched to the next one, the status block will receive the `completed` class.
3. A status block whose step is _current_ or _next_ is not clickable.
4. If `switchCurrentBlockByClickOnStatus: true`, then all status blocks get `role='button'`.

### Validation

You can specify the functions that will be triggered when switching to the next block. <br>
You can assign a separate function for each individual block.

```ts
// Also try with other libraries!
// import './just-validate.production.js'

new StepByStepBlock({
  ...,

  // Specify a validating function for each step.
  checkFunctions: {
    /*
      Specify the step number, after trying to switch which one, this function will work.
      It is triggered only when switching to the next step.
      The function must return a <Boolean> value. If it returns <true> (or promise with true), the step will be switched, otherwise there will be no switching.
    */
    0: () => {
      return true
      // or return Promise
    },

    // You can specify the <final> keyword to assign a validation function to the last block instead of specifying its number.
    final: () => true,
  },
});
```

### Forms

You can set an action when trying to submit a form if your step container is a form.

```ts
import StepByStepBlock, { Form } from './your_path_to_stepByStep_folder/stepByStepBlock.src.js';

new StepByStepBlock({
  ...,

  form: new Form({
    formSelector: '#form',

    onSubmitFunction(submitEvent: SubmitEvent) {
      submitEvent.preventDefault()
    },
  }),
});
```
