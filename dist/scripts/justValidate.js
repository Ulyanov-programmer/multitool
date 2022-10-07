import "./just-validate.production.min.js";
new JustValidate("#form", {
  errorFieldCssClass: "invalid",
  errorLabelCssClass: "invalid",
  errorLabelStyle: {
    fontSize: "14px",
    color: "white"
  },
  errorsContainer: "#errorsContainer"
}).addField('[name="inputName"]', []).onSuccess((e) => {
});
