import { errorMsg } from "../messages/errorMsg.js"
import { successMsg } from "../messages/successMsg.js"
import Movie from "../models/movie.js"

export const movieController = {
  // require a movieId
  getMovie:
    async (req, res) => {
      try {
        const movie = await Movie.findById(req.params.movieId)
        res.status(200).json(successMsg(movie))
      } catch (error) {
        res.status(500).json(errorMsg(error))
      }
    },

  deleteMovie: async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.movieId)
      if (movie.title) {
        res.status(200).json(successMsg("The movie has been successfully deleted!"))
      } else {
        res.status(500).json(errorMsg("Can't delete Movie"))
      }
    } catch (error) {
      res.status(500).json(errorMsg("Something went wrong"))
    }
  },

  updateMovie: async (req, res) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(203).json(errorMsg("No Content to Update!"))
      }
      const movie = await Movie.findOneAndUpdate({ _id: req.params.movieId }, req.body, { new: true })
      res.status(200).send(movie)
    } catch (error) {
      res.status(500).json(errorMsg("Something went wrong"))
    }
  },

  // doesnt require a movieId
  getAllMovies:
    async (req, res) => {
      const { rating, duration, totalRatingCount, genre, }
      try {
        const movies = await Movie.find()
        res.status(200).json(successMsg(movies))
      } catch (error) {
        res.status(500).json(errorMsg(error))
      }
    },

  createMovie:
    async (req, res) => {
      try {
        const movie = await Movie.create(req.body)
        res.status(201).json(successMsg(movie))
      } catch (err) {
        res.status(500).json(errorMsg(err))
      }
    },
}