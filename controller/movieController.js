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
      const movie = await Movie
        .findById(req.params.movieId)
        .select("-createdAt -updatedAt -__v")
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
      const movie = await Movie.findOneAndUpdate({ _id: req.params.movieId }, req.body, { new: true, runValidators: true })
      res.status(200).send(movie)
    } catch (error) {
      res.status(500).json(errorMsg("Something went wrong"))
    }
  },

  // doesnt require a movieId, but may recieve query parameters
  getAllMovies: async (req, res) => {
    // try {
    let query = Movie.find()
    let apiFeatures = new ApiFeatures(query, req.query)
    apiFeatures.filter().sort().paginate()

    try {
      const result = await apiFeatures.query
      res.status(200).json(successMsg(result))
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

  getMovieStats: async (req, res) => {
    // aggregate function takes an array of stages,
    // the data goes from one stage to another while being manipulated by the current stage
    try {
      const stats = await Movie.aggregate([
        // { $match: { releaseDate: { $lte: new Date() } } }, -- works, but done in aggregation pipeline
        { $match: { rating: { $gte: 7 } } },
        {
          $group: {
            // The _id is the key according to which the documents will be grouped
            _id: '$releaseYear',
            averageRating: { $avg: '$rating' },
            highestRated: { $max: '$rating' },
            lowestRated: { $min: '$rating' },
            movieCount: { $sum: 1 }
            // The sum property adds one for each movie,
            // so it gets the total count
          }
        },
        // the property below needs to be a property that we get from grouping
        { $sort: { averageRating: 1 } }
        // We can also repeat any steps - match, group and sort
      ])

      res.status(200).json(successMsg(stats))
    } catch (error) {
      res.status(500).json(errorMsg(error))
    }
  },

  getMovieByGenre: async (req, res) => {
    try {
      const genre = req.params.genre
      // sometimes, we are using $ with fieldnames, that is when we refer to fields in mongoDB
      // the fields without $ are fetched
      const movies = await Movie.aggregate([
        { $unwind: '$genre' },
        { $match: { genre: { $eq: genre } } },
        {
          $group: {
            _id: '$genre',
            movieCount: { $sum: 1 },
            movies: { $push: '$title' }
          }
        },
        { $addFields: { genre: '$_id' } }, // the IDs of the fetched docs
        { $project: { _id: 0 } }, // project is used to include(1) or exclude(0)
        { $sort: { movieCount: -1 } }, // movieCount is local to this operation
        // { $limit: 6 }
      ])
      /*
      The unwind creates multiple documents for the same movie
      If the movie Interstellar has two genre - [ Action, Thriller ]
      The unwind will create two copies of movie Interstellar each
      with one genre -
      Interstellar : {genre: Action} and Interstellar : {genre: Thriller}
      */

      res.status(200).json((successMsg(movies)))
    } catch (error) {
      res.status.json(errorMsg(error))
    }
  }
}