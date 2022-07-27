const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateMovie(data) {
  let errors = {};

  // Convert the empty fields into empty strings for the validator to recognize
  data.title = !isEmpty(data.title) ? data.title : "";
  data.year = !isEmpty(data.year) ? data.year : "";

  // Errors check
  let currentYear = new Date().getFullYear();
  if (Validator.isEmpty(data.title)) errors.title = "The movie must have a title, doesn't it?";
  if (Validator.isEmpty(data.year)) errors.year = "The movie must've been released in a certain year, isn't it?";
  else if (!Validator.isInt(data.year, { min: 1888, max: currentYear})) errors.year = `The valid years are between 1888 and ${currentYear}`;

  return { errors, isValid: isEmpty(errors) };
};