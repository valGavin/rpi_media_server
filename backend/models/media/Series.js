const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a series schema
const SeriesSchema = new Schema({
  title: { type: String, required: true },
  episode: { type: Number, min: 1, required: true },
  season: { type: Number, min: 1, required: true },
  series: { type: String, required: true },
  year: { type: Number, min: 1888, required: true },
  icon: { type: String },
  path: { type: String },
  genre: { type: String }
});

module.exports = Series = mongoose.model("series", SeriesSchema);