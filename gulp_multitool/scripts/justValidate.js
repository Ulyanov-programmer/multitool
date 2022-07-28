const someValidation = new JustValidate("#form", {
	errorFieldCssClass: "invalid",
	errorLabelCssClass: "invalid",
	errorLabelStyle: {
		position: 'absolute',
		bottom: '110%',
		left: '0px',
		fontSize: "14px",
		color: "white"
	},
	errorsContainer: "#errors_container"
})
someValidation.onSuccess((e) => {
	ev.preventDefault()
	window.showNotification()
	ev.target.submit()
})
