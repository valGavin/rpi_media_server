const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a movie schema
const MovieSchema = new Schema({
  title: { type: String, required: true },
  path: { type: String },
  year: { type: Number, min: 1888, required: true},
  icon: { type: String },
  genre: { type: String },
  sequel: { type: String }
});

module.exports = Movie = mongoose.model("movies", MovieSchema);