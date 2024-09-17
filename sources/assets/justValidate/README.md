# Just use this.

[Just-Validate - documentation](https://just-validate.dev/docs/intro) <br>

### Code preparation:

```js
import './just-validate.production.min.js'

new JustValidate('#your_form_id', {
  errorFieldCssClass: 'invalid',

  // errorLabelStyle: {
  //   fontSize: '14px',
  // },

  /* ? Tooltips displayed instead of regular error labels.
  tooltip: {
    position: 'left' | 'top' | 'right' | 'bottom',
  },
  */

  // errorLabelStyle: { display: 'none', },

  // errorsContainer: '#errorsContainer', // ? Must be inside the form.
})
  .onSuccess((event) => {
    /* ? Use the code below if you send data through a particular backend system.
      event.preventDefault()
      submitRequestForm()
    */
  })

  .addField('[name="inputName"]', [])
```

### Hints:

```js
.addField('[name="inputName"]', [
  // new rule for field, enter the hints into the object below from another object below
  {},
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
    // ? only LETTERS and NUMBERS, RU and EN, with spaces.
    // ru: [а-яА-ЯёЁ ]
    // en: [a-zA-Z ]
    return /^[а-яА-ЯёЁa-zA-Z ]+$/.test(str)

    // ? only LETTERS, with spaces.
    return /^[a-zA-Z() ]+$/.test(str)

    // ? only CAPITAL LETTERS, with spaces.
    return /^[A-Z() ]+$/.test(str)

    // ? only NUMBERS with count.
    return /^[0-9]{countOfNumbers}/.test(str)

    // ? Checking for a phone number
    return str?.length >= 11 && Number.isInteger(parseInt(str))

    // ? If you use inputmask...
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

// ? Write below the selector of CONTAINER with radio/checkbox inputs.
.addRequiredGroup(
  '.selector',
  'Message'
)
```
