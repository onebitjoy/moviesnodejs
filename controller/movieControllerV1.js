import Movie from "../models/movie.js"

import { getHighestRated } from './middlewares/getHighestRated.js'
import { ApiFeatures } from "../utils/apiFeatures.js"

import { errorMsg } from "../messages/errorMsg.js"
import { successMsg } from "../messages/successMsg.js"

export const movieController = {
  //middlewares
  getHighestRated,

  // require a movieId
  getMovie: async (req, res) => {
    try {
      const movie = Movie
        .findById(req.params.movieId)
        .select("-createdAt -updatedAt -__v")

      res.status(200).json(successMsg(await movie))
    } catch (error) {
      console.log(error);
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

  // doesnt require a movieId, but may recieve query parameters
  getAllMovies: async (req, res) => {
    try {
      // let features = new ApiFeatures(Movie.find(), query).filter()
      const { rating, duration, totalRatingCount, genre, language, releaseYear } = req.query

      const filter = {}

      if (rating) filter.rating = { $gte: parseFloat(rating) }
      if (duration) filter.duration = { $lte: parseInt(duration) }
      if (totalRatingCount) filter.totalRatingCount = { $gte: parseInt(totalRatingCount) }
      if (genre) {
        // If multiple genres are given, it will split them into an array,
        // mongoose then finds all the movies that contains one or more specified genres
        let genres = []
        genres = genre.split(',')
        filter.genre = { $in: genres }
      }
      if (language) {
        let languages = []
        languages = language.split(',')
        filter.language = { $in: languages }
      }
      if (releaseYear) filter.releaseYear = { $eq: parseInt(releaseYear) }

      let query = Movie.find(filter)

      //sorting

      if (req.query.sort) {
        let sortField =
          ['title', 'rating', 'totalRatingCount', 'releaseDate', '-title', '-rating', '-totalRatingCount', '-releaseDate']
            .includes(req.query.sort) ?
            req.query.sort :
            '-totalRatingCount'
        // default - ascending, to get descending, just forward - with field name
        query = query.sort(sortField)
      }
      // -----------------------------------------------------

      // limiting fields
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ")
        query = query.select(fields)
      } else {
        query = query.select("-createdAt -updatedAt -__v")
      }
      // -----------------------------------------------------

      // pagination
      const page = req.query.page || 1
      // if the limit is undefined, then limit = 10
      // if 0 < limit <= 50 , limit is req.query.limit, else limit is 50
      const limit =
        (!req.query.limit) ? 20 :
          (req.query.limit > 0 && req.query.limit <= 50) ?
            +req.query.limit : 50
      const skip = (page - 1) * limit
      // -----------------------------------------------------

      const movies = await query.skip(skip).limit(limit)
      if (movies.length) {
        res.status(200).json(successMsg(movies))
      } else {
        res.status(404).json(errorMsg("No more movies"))
      }
    } catch (error) {
      res.status(500).json(errorMsg(error))
    }

  },

  createMovie: async (req, res) => {
    try {
      const movie = await Movie.create(req.body)
      res.status(201).json(successMsg(movie))
    } catch (err) {
      res.status(500).json(errorMsg(err))
    }
  },
}