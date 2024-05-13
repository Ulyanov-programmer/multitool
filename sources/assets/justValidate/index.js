/*
  https://just-validate.dev/docs/intro
  https://robinherbots.github.io/Inputmask/#/documentation
*/

import './just-validate.production.min.js'
import Inputmask from "../inputmask/inputmask.es6.js"


new Inputmask({
  mask: "A9[*]{1,10}",
  // repeat: 10,

  // definitions: {
  //   '*': {
  //     validator: "[0-9A-Za-z]",
  //     casing: "upper"
  //   }
  // },
}).mask(document.querySelector('input[name="your_name"]'))


new JustValidate('#form', {
  errorFieldCssClass: 'invalid',

  // errorLabelStyle: {
  //   fontSize: '14px',
  // },

  // ? Tooltips displayed instead of regular error labels.
  // tooltip: {
  //   position: 'left' | 'top' | 'right' | 'bottom',
  // },

  // errorLabelStyle: { display: 'none', },

  // errorsContainer: '#errorsContainer', // ? Must be inside the form.
})
  .onSuccess(event => {
    // ? Use the code below if you send data through a particular backend system.
    // event.preventDefault()
    // submitRequestForm()
  })

  .addField('[name="inputName"]', [

  ])



/* ? HINTS
  .addField('[name="inputName"]', [

  ])

  {
    rule: 'required',
    rule: 'minLength', value: 1,
    rule: 'maxLength', value: 10,
    rule: 'minFilesCount', value: 1,
    rule: 'maxFilesCount', value: 10,
    rule: 'email',

    rule: 'function',
    validator: (str) => {
      ? only LETTERS and NUMBERS, RU and EN, with spaces.
      // ru: [а-яА-ЯёЁ ]
      // en: [a-zA-Z ]
      return /^[а-яА-ЯёЁa-zA-Z ]+$/.test(str)

      ? only LETTERS, with spaces.
      return /^[a-zA-Z() ]+$/.test(str)

      ? only CAPITAL LETTERS, with spaces.
      return /^[A-Z() ]+$/.test(str)
      
      ? only NUMBERS with count.
      return /^[0-9]{countOfNumbers}/.test(str)

      ? Checking for a phone number
      return Number(unmaskedValue) && unmaskedValue.length >= 11

      ? If you use inputmask...
      let unmaskedValue = HTMLElement.inputmask.unmaskedvalue()
    },

    rule: 'files',
    value: {
      files: {
        extensions: ['jpg', 'jpeg', 'png'],
        types: ['image/jpeg', 'image/jpg', 'image/png'],
        // in bytes, 1 000 = ~1kb
        minSize: 1000,
        maxSize: 25000,
      }
    }

    errorMessage: 'error',
  },

  ? Write below the selector of CONTAINER with radio/checkbox inputs.
  .addRequiredGroup(
    '.selector',
    'Message'
  )
*/