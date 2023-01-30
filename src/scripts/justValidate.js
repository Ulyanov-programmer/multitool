import '../libs/just-validate.production.min.js'
// import '../libs/inputmask.min.js'

// const inputMaskTel = new Inputmask('+7 (999) 999-99-99')
// let telInputSelector = document.querySelector('input[type="tel"]')
// inputMaskTel.mask(telInputSelector)

new JustValidate('#form', {
  errorFieldCssClass: 'invalid',
  errorLabelCssClass: 'invalid',
  errorLabelStyle: {
    // position: 'absolute',
    // top: '0',
    // left: '0',
    fontSize: '14px',
    color: 'white',
  },
  // tooltip: {
  // 	position: 'bottom',
  // },
  errorsContainer: '#errorsContainer',
})
  .addField('[name="inputName"]', [

  ])

  .onSuccess((e) => {
    // ? Use this code if you send data through a particular backend system.
    // e.preventDefault()
    // submitRequestForm()
  })

/* ? HINTS
  .addField('[name="inputName"]', [

  ])

  {
    rule: 'required',
    errorMessage: '',
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

  ? only LETTERS and NUMBERS, with spaces.
  {
    rule: 'function',
    validator: (str) => {
      return /^[a-zA-Z1-9() ]+$/.test(str)
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
  ? Sending a mail.
  let formData = new FormData(e.target)

  fetch('../php/mail.php', { method: 'POST', body: formData, })
    .then((response) => {
      if (response.ok) {
        console.log('The letter was send.')
      } else {
        console.log('The letter was not sended!')
      }
    })
    .catch((error) => {
      console.log('Mail error!' + error)
    })

  ? Tooltips displayed instead of regular error labels.
  tooltip: {
    position: 'left' | 'top' | 'right' | 'bottom',
  },
*/