import express from "express";
import { movieController } from "../controller/movieController.js";
import { auth } from "../middlewares/auth.js"
import { authController } from "../controller/authController.js";

const movieRouter = express.Router()

movieRouter.route('/highest-rated')
  .get(movieController.getHighestRated, movieController.getAllMovies)

movieRouter.route('/movies-by-genre/:genre')
  .get(movieController.getMovieByGenre)

movieRouter.route("/")
  .get(movieController.getAllMovies)
  .post(auth, movieController.createMovie)

movieRouter.route("/stats")
  .get(movieController.getMovieStats)

movieRouter.route("/:movieId")
  .get(movieController.getMovie)
  .post(auth, movieController.updateMovie)
  .delete(auth, authController.accessChecker("admin", "manager"), movieController.deleteMovie)

export default movieRouter