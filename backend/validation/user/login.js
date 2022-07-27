const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert the empty fields into empty strings for the validator to recognize
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Errors check
  if (Validator.isEmpty(data.email)) errors.email = "E-mail field is required";
  else if (!Validator.isEmail(data.email)) errors.email = "E-mail is invalid";
  if (Validator.isEmpty(data.password)) errors.password = "Password field is required";

  return { errors, isValid: isEmpty(errors) };
};