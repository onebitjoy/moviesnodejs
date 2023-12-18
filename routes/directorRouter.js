import express from "express";

import { directorController } from "../controller/directorController.js";
const directorRouter = express.Router()

directorRouter.route("/")
  .get(directorController.getAllDirectors)
  .post(directorController.createDirector)

directorRouter.route("/:directorId")
  .get(directorController.getDirector)
  .post(directorController.updateDirector)
  .delete(directorController.deleteDirector)

export default directorRouter