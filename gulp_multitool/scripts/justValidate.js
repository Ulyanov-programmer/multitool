const someValidation = new JustValidate("#form", {
  errorFieldCssClass: "invalid",
  errorLabelCssClass: "invalid",
  errorLabelStyle: {
    fontSize: "14px",
    color: "white"
  },
  errorsContainer: "#errors_container"
});
someValidation.onSuccess((e) => {
});
