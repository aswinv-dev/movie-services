const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

//middleware get movie
const getmovie = async (req, res, next) => {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie === null) {
      res.status(400).json({ msg: "movie not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
  res.movie = movie;
  next();
};

//get
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

//get
router.get("/:id", getmovie, (req, res) => {
  res.send(res.movie);
});

//create
router.post("/", async (req, res) => {
  const { name, rating, image, cast, genre, releaseDate } = req.body;
  const movie = new Movie({
    name,
    image,
    rating,
    releaseDate,
    genre,
    cast,
  });
  try {
    const newMovie = await movie.save();
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//update
router.patch("/:id", getmovie, async (req, res) => {
  if (req.body.name) {
    res.movie.name = req.body.name;
  }
  if (req.body.rating) {
    res.movie.rating = req.body.rating;
  }
  if (req.body.genre) {
    res.movie.genre = req.body.genre;
  }
  if (req.body.cast) {
    res.movie.cast = req.body.cast;
  }
  if (req.body.image) {
    res.movie.image = req.body.image;
  }
  if (req.body.releaseDate) {
    res.movie.releaseDate = req.body.releaseDate;
  }
  try {
    const updateMovie = await res.movie.save();
    res.json(updateMovie);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//delete
router.delete("/:id", getmovie, async (req, res) => {
  try {
    await res.movie.remove();
    res.status(200).json({ msg: "deleted successful" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
