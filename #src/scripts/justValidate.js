const someValidation = new JustValidate('#form', {
	errorFieldCssClass: 'invalid',
	errorLabelCssClass: 'invalid',
	errorContainer: '#errors_container',
})

someValidation
	.addField('[name="name"]', [
		{
			rule: 'minLength',
			value: 3,
		},
	])