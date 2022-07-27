const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSong(data) {
  let errors = {};

  // Convert the empty fields into empty strings for the validator to recognize
  data.title = !isEmpty(data.title) ? data.title : "";
  data.path = !isEmpty(data.path) ? data.path : "";
  data.icon = !isEmpty(data.icon) ? data.icon : "";
  data.artist = !isEmpty(data.artist) ? data.artist : "Unknown";

  // Errors check
  let currentYear = new Date().getFullYear();
  if (Validator.isEmpty(data.title)) errors.title = "The song must have a title, doesn't it?";
  if (!Validator.isInt(data.year, { min: 1860, max: currentYear})) errors.year = `The valid years are between 1860 and ${currentYear}`;

  return { errors, isValid: isEmpty(errors) };
};