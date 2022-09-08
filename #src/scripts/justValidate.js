import './just-validate.production.min.js'
// import './inputmask.min.js'

// const inputMask = new Inputmask('+7 (999) 999-99-99')
// const formTel = requestForm.querySelector('input[type="tel"]')
// inputMask.mask(formTel)

new JustValidate('#form', {
	errorFieldCssClass: 'invalid',
	errorLabelCssClass: 'invalid',
	errorLabelStyle: {
		fontSize: '14px',
		color: 'white',
	},
	errorsContainer: '#errors_container',
})

someValidation

	.onSuccess((e) => {

	})

/* ? HINTS
 .addField('.selector', [

	])

	? Use this code if you send data through a particular backend system.
	e.preventDefault()
	submitRequestForm()

	{
		rule: 'required',
		errorMessage: '',
	},
	{
		rule: 'minLength',
		value: 3,
		errorMessage: '',
	},
	{
		rule: 'maxLength',
		value: 30,
		errorMessage: '',
	},
	{
		rule: 'email',
		errorMessage: '',
	},

	? Write below the selector of CONTAINER with radio/checkbox inputs.
	.addRequiredGroup(
		'.selector',
		'Message'
	)

	? only LETTERS, with spaces.
	{
		rule: 'function',
		validator: (str) => {
			return /^[a-zA-Z() ]+$/.test(str)
		},
		errorMessage: '',
	},

	? only CAPITAL LETTERS, with spaces.
	{
		rule: 'function',
		validator: (str) => {
			return /^[A-Z() ]+$/.test(str)
		},
		errorMessage: '',
	},

	{
		rule: 'function',
		validator: () => {
			return true
		},
		errorMessage: '',
	},

	? Checking for a number
	{
		rule: 'function',
		validator: (number) => {
			return Number(number) > 0
		},
		errorMessage: '',
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
		errorMessage: '',
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
*/