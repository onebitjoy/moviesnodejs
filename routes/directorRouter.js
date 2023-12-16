import express from "express";
import { directorController } from "../controller/directorController.js";

const directorRouter = express.Router()

directorRouter.route("/")
  .get(directorController.getAllMovies)
  .post(directorController.createMovie)

directorRouter.route("/:movieId")
  .get(directorController.getMovie)
  .post(directorController.updateMovie)
  .delete(directorController.deleteMovie)

export default directorRouter