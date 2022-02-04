const { Op } = require("sequelize");

const { Movie } = require("../models");

const getAllMovies = async (req, res) => {
  const { searchText } = req.query;
  try {
    const conditions = searchText
      ? {
          where: {
            title: {
              [Op.iRegexp]: searchText,
            },
          },
        }
      : {};
    const movies = await Movie.findAll(conditions);
    return res.json(movies);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findOne({
      where: {
        id: Number(movieId),
      },
    });
    if (!movie) throw new Error("Movie not found");
    res.json({
      message: "Movie Found",
      movie,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const addMovie = async (req, res) => {
  const { title, casts, director, poster, rating } = req.body;

  try {
    const createdMovie = await Movie.create({
      title,
      casts,
      director,
      poster,
      rating,
    });
    return res.json({
      message: "Movie Created",
      movie: createdMovie,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  addMovie,
};