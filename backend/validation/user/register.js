const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegister(data) {
  let errors = {};

  // Convert the empty fields into empty strings for the validator to recognize
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Errors checking
  if (Validator.isEmpty(data.name)) errors.name = "Name field is required";
  if (Validator.isEmpty(data.email)) errors.email = "E-mail field is required";
  else if (!Validator.isEmail(data.email)) errors.email = "The e-mail is invalid";
  if (Validator.isEmpty(data.password)) errors.password = "Password field is required";
  if (Validator.isEmpty(data.password2)) errors.password2 = "Confirm password field is required";
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) errors.password = "Password must be between 6 and 30 characters";
  if (!Validator.equals(data.password, data.password2)) errors.password2 = "Password doesn't match";

  return { errors, isValid: isEmpty(errors) };
};