const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a song schema
const SongSchema = new Schema({
  artist: { type: String, default: "Unknown" },
  title: { type: String, required: true },
  path: { type: String },
  icon: { type: String },
  album: { type: String },
  year: { type: Number, min: 1860 },
  genre: { type: String }
});

module.exports = Song = mongoose.model("musics", SongSchema);