const someValidation = new JustValidate("#form", {
  errorFieldCssClass: "invalid",
  errorLabelCssClass: "invalid",
  errorContainer: "#errors_container"
});
someValidation.addField('[type="email"]', [
  {
    rule: "required",
    errorMessage: ""
  },
  {
    rule: "minLength",
    value: 3,
    errorMessage: ""
  },
  {
    rule: "email",
    errorMessage: ""
  },
  {
    rule: "function",
    validator: (value) => {
      return true;
    },
    errorMessage: ""
  }
]).onSuccess((e) => {
  let formData = new FormData(e.target);
  fetch("../php/mail.php", { method: "POST", body: formData }).then((response) => {
    if (response.ok) {
      console.log("The letter was send.");
    } else {
      console.log("The letter was not sended!");
    }
  }).catch((error) => {
    console.log("Mail error!" + error);
  });
});
