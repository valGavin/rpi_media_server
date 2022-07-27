const express = require("express");
const router = express.Router();

// Load the media model
const Songs = require("../../models/media/Song");
const Movies = require("../../models/media/Movie");
const Series = require("../../models/media/Series");

/**
 * @route GET api/media/songs
 * @desc Songs list
 * @access Public
 */
router.get("/songs", (req, res) => {
  Songs.find((error, data) => {
    if (error) return res.status(400).json({ errormessage: error });
    else res.json(data);
  });
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