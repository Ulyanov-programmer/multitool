import "./just-validate.production.min.js";
// import "./inputmask.min.js"

// const inputMask = new Inputmask("+7 (999) 999-99-99");
// const formTel = requestForm.querySelector('input[type="tel"]');
// inputMask.mask(formTel);

const someValidation = new JustValidate('#form', {
	errorFieldCssClass: 'invalid',
	errorLabelCssClass: 'invalid',
	errorLabelStyle: {
		fontSize: '14px', 
		color: 'white',
	},
	errorsContainer: '#errors_container',
})

someValidation
	// .addField('.selector', [
	// 	
	// ])

	// {
	// 	rule: 'required',
	// 	errorMessage: '',
	// },
	// {
	// 	rule: 'minLength',
	// 	value: 3,
	// 	errorMessage: '',
	// },
	// {
	// 	rule: 'maxLength',
	// 	value: 30,
	// 	errorMessage: '',
	// },
	// {
	// 	rule: 'email',
	// 	errorMessage: '',
	// },
	// // Write below the selector of CONTAINER with radio/checkbox inputs.
	// .addRequiredGroup(
	// 	'.selector',
	// 	'Message'
	// )
	// {
	// 	// only letters, with spaces.
	// 	rule: 'function',
	// 	validator: (str) => {
	// 		return /^[a-zA-Z() ]+$/.test(str)
	// 	},
	// 	errorMessage: '',
	// },
	// {
	// 	// only capital letters, with spaces.
	// 	rule: 'function',
	// 	validator: (str) => {
	// 		return /^[A-Z() ]+$/.test(str)
	// 	},
	// 	errorMessage: '',
	// },
	// {
	// 	rule: 'function',
	// 	validator: () => {
	// 		return true
	// 	},
	// 	errorMessage: '',
	// },
	// {
	// 	rule: 'function',
	// 	validator: (number) => {
	// 		// Checking for a number
	// 		return Number(number) > 0
	// 	},
	// 	errorMessage: '',
	// },
	// {
	// 	rule: 'files',
	// 	files: {
	// 		extensions: ['.jpg', 'png'],
	// 		types: ['image/jpeg', 'image/png'],
	// 	// in bytes.
	// 		minSize: 1000,
	// 		maxSize: 25000,
	// 	},
	// 	errorMessage: '',
	// }
	.onSuccess((e) => {
		//? Sending a mail, just for lulz.

		// let formData = new FormData(e.target);

		// fetch('../php/mail.php', { method: "POST", body: formData, })
		// 	.then((response) => {
		// 		if (response.ok) {
		// 			console.log('The letter was send.');
		// 		} else {
		// 			console.log('The letter was not sended!');
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.log('Mail error!' + error);
		// 	});
	});