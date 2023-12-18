import express from "express";
import { actorController } from "../controller/actorController.js";

const actorRouter = express.Router()

actorRouter.route("/")
  .get(actorController.getAllActors)
  .post(actorController.createActor)

actorRouter.route("/:actorId")
  .get(actorController.getActor)
  .post(actorController.updateActor)
  .delete(actorController.deleteActor)

export default actorRouter