const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSeries(data) {
  let errors = {};

  // Convert the empty fields into empty strings for the validator to recognize
  data.title = !isEmpty(data.title) ? data.title : "";
  data.episode = !isEmpty(data.episode) ? data.episode : "";
  data.season = !isEmpty(data.season) ? data.season : "";
  data.series = !isEmpty(data.series) ? data.series : "";
  data.year = !isEmpty(data.year) ? data.year : "";

  // Errors check
  let currentYear = new Date().getFullYear();
  if (Validator.isEmpty(data.title)) errors.title = "The episode must have a title, doesn't it?";
  if (Validator.isEmpty(data.episode)) errors.episode = "The episodes were aired in order, weren't they?";
  else if (!Validator.isInt(data.episode, { min: 1 })) errors.episode = "The valid episode order is starting from 1";
  if (Validator.isEmpty(data.season)) errors.season = "The episode belongs to a season, doesn't it?";
  else if (!Validator.isInt(data.season, { min: 1 })) errors.season = "The valid season is starting from 1";
  if (Validator.isEmpty(data.series)) errors.series = "The episode belongs to a series, doesn't it?";
  if (Validator.isEmpty(data.year)) errors.year = "The season must've been aired in a certain year, isn't it?";
  else if (!Validator.isInt(data.year, { min: 1888, max: currentYear})) errors.year = `The valid years are between 1888 and ${currentYear}`;

  return { errors, isValid: isEmpty(errors) };
};