import express from "express";
import { movieController } from "../controller/movieController.js";

const movieRouter = express.Router()

movieRouter.route('/highest-rated')
  .get(movieController.getHighestRated, movieController.getAllMovies)

movieRouter.route('/movies-by-genre/:genre')
  .get(movieController.getMovieByGenre)

movieRouter.route("/")
  .get(movieController.getAllMovies)
  .post(movieController.createMovie)

movieRouter.route("/stats")
  .get(movieController.getMovieStats)

movieRouter.route("/:movieId")
  .get(movieController.getMovie)
  .post(movieController.updateMovie)
  .delete(movieController.deleteMovie)


export default movieRouter