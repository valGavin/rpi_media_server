const express = require("express");
const router = express.Router();

// Load the media model
const Songs = require("../../models/media/Song");
const Movies = require("../../models/media/Movie");
const Series = require("../../models/media/Series");

/**
 * @route GET api/media/songs/:id
 * @desc Get the songs list with range limit but without search query
 * @access Public
 */
router.get("/songs/:id", (req, res) => {
  const limit = 50;
  Songs.find((error, data) => {
    if (error) return res.status(400).json({ errormessage: error });
    else res.json(data);
  }).skip(req.params.id * limit).limit(limit).sort('path');
});

/**
 * @route GET api/media/songs/:id/:query
 * @desc Get the songs list with range limit and search query
 * @access Public
 */
router.get("/songs/:id/:query", (req, res) => {
  const limit = 50;
  Songs.find({ $or: [
    { artist: { $regex: req.params.query, $options: 'i' } },
    { title: { $regex: req.params.query, $options: 'i' } }] }, (error, data) => {
    if (error) return res.status(400).json({ errormessage: error });
    else res.json(data);
  }).skip(req.params.id * limit).limit(limit).sort('path');
});

/**
 * @route GET api/media/movies
 * @desc Movies list
 * @access Public
 */
router.get("/movies", (req, res) => {
  Movies.find((error, data) => {
    if (error) return res.status(400).json({ errormessage: error });
    else res.json(data);
  });
});

/**
 * @route GET api/media/series
 * @desc Series list
 * @access Public
 */
router.get("/series", (req, res) => {
  Series.find((error, data) => {
    if (error) return res.status(400).json({ errormessage: error });
    else res.json(data);
  });
});

module.exports = router;