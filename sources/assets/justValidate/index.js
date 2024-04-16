/*
  https://just-validate.dev/docs/intro
  https://robinherbots.github.io/Inputmask/#/documentation
*/

import './just-validate.production.min.js'
import Inputmask from "../inputmask/inputmask.es6.js"


new Inputmask('+7 (999) 999-99-99')
  .mask(document.querySelector('input[type="tel"]'))


new JustValidate('#form', {
  errorFieldCssClass: 'invalid',

  // errorLabelCssClass: 'invalid',
  // errorLabelStyle: {
  //   // position: 'absolute',
  //   // top: '0',
  //   // left: '0',
  //   fontSize: '14px',
  //   color: 'white',
  // },

  // OR

  // tooltip: {
  // 	position: 'top',
  // },

  // ? Must be inside the form.
  errorsContainer: '#errorsContainer',
})
  .addField('[name="inputName"]', [

  ])

  .onSuccess((e) => {
    // ? Use the code below if you send data through a particular backend system.
    // e.preventDefault()
    // submitRequestForm()
  })

/* ? HINTS
  .addField('[name="inputName"]', [

  ])

  {
    rule: 'required',
    errorMessage: 'error',
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'error',
  },
  {
    rule: 'maxLength',
    value: 30,
    errorMessage: 'error',
  },
  {
    rule: 'email',
    errorMessage: 'error',
  },

  ? Write below the selector of CONTAINER with radio/checkbox inputs.
  .addRequiredGroup(
    '.selector',
    'Message'
  )

  ? only LETTERS and NUMBERS, RU and EN, with spaces.
  {
    rule: 'function',
    validator: (str) => {
      // ru: [а-яА-ЯёЁ ]
      // en: [a-zA-Z ]
      return /^[а-яА-ЯёЁa-zA-Z ]+$/.test(str)
    },
    errorMessage: 'error',
  },

  ? only LETTERS, with spaces.
  {
    rule: 'function',
    validator: (str) => {
      return /^[a-zA-Z() ]+$/.test(str)
    },
    errorMessage: 'error',
  },

  ? only CAPITAL LETTERS, with spaces.
  {
    rule: 'function',
    validator: (str) => {
      return /^[A-Z() ]+$/.test(str)
    },
    errorMessage: 'error',
  },

  ? only NUMBERS with min count.
  {
    rule: 'function',
    validator: (str) => {
      return /^[0-9]{countOfNumbers}/.test(str)
    },
    errorMessage: 'error',
  },

  ? your validator
  {
    rule: 'function',
    validator: () => {
      return true
    },
    errorMessage: 'error',
  },

  ? Checking for a number
  {
    rule: 'function',
    validator: () => {
      ? If you use inputmask...
      let phoneUnmaskedValue = telInputSelector.inputmask.unmaskedvalue()
      return Number(phoneUnmaskedValue) && phoneUnmaskedValue.length > 9
    },
    errorMessage: 'error',
  },

  ? File input validation
  {
    rule: 'files',
    files: {
      extensions: ['.jpg', 'png'],
      types: ['image/jpeg', 'image/png'],
      // in bytes, 1 000 = ~1kb
      minSize: 1000,
      maxSize: 25000,
    },
    errorMessage: 'error',
  }

  ? Tooltips displayed instead of regular error labels.
  tooltip: {
    position: 'left' | 'top' | 'right' | 'bottom',
  },
*/