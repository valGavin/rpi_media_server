const express = require("express");
const router = express.Router();

// Load the input validation
const validateSongInput = require("../../validation/media/song");
const validateMovieInput = require("../../validation/media/movie");
const validateSeriesInput = require("../../validation/media/series");

// Load the media model
const Song = require("../../models/media/Song");
const Movie = require("../../models/media/Movie");
const Series = require("../../models/media/Series");

/**
 * @route POST api/admin/songs
 * @desc Song upload
 * @access Private
 */
router.post("/songs", (req, res) => {
  // Form and check the validation
  const { errors, isValid } = validateSongInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  Song.findOne({ title: req.body.title, artist: req.body.artist }).then(song => {
    if (song) return res.status(400).json({ song: "This song is already exist" });
    else {
      const newSong = new Song({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
        genre: req.body.genre,
        path: req.body.path,
        icon: req.body.icon
      });
      newSong.save().then(song => res.json(song)).catch(err => console.log(err));
    }
  });
});

/**
 * @route POST api/admin/movies
 * @desc Movie upload
 * @access Private
 */
router.post("/movies", (req, res) => {
  // Form and check the validation
  const { errors, isValid } = validateMovieInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  Movie.findOne({ title: req.body.title, year: req.body.year }).then(movie => {
    if (movie) return res.status(400).json({ movie: "This movie is already exist"});
    else {
      const newMovie = new Movie({
        title: req.body.title,
        year: req.body.year,
        genre: req.body.genre,
        sequel: req.body.sequel,
        path: req.body.path,
        icon: req.body.icon
      });
      newMovie.save().then(movie => res.json(movie)).catch(err => console.log(err));
    }
  });
});

/**
 * @route POST api/admin/series
 * @desc Episode upload
 * @access Private
 */
router.post("/series", (req, res) => {
  // Form and check the validation
  const { errors, isValid } = validateSeriesInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  Series.findOne({ episode: req.body.episode, season: req.body.season, series: req.body.series }).then(episode => {
    if (episode) return res.status(400).json({ episode: "This episode is already exist" });
    else {
      const newSeries = new Series({
        title: req.body.title,
        episode: req.body.episode,
        season: req.body.season,
        series: req.body.series,
        year: req.body.year,
        genre: req.body.genre,
        path: req.body.path,
        icon: req.body.icon
      });
      newSeries.save().then(episode => res.json(episode)).catch(err => console.log(err));
    }
  });
});

module.exports = router;