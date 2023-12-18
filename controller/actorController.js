import { errorMsg } from "../messages/errorMsg.js"
import { successMsg } from "../messages/successMsg.js"
import Actor from "../models/actor.js"

export const actorController = {
  // require a ActorId
  getActor:
    async (req, res) => {
      try {
        const actor = await Actor.findById(req.params.actorId)
        res.status(200).json(successMsg(actor))
      } catch (error) {
        res.status(500).json(errorMsg(error))
      }
    },

  deleteActor: async (req, res) => {
    try {
      const actor = await Actor.findByIdAndDelete(req.params.actorId)
      if (actor.fullName) {
        res.status(200).json(successMsg("The actor has been successfully deleted!"))
      } else {
        res.status(500).json(errorMsg("Can't delete Actor"))
      }
    } catch (error) {
      res.status(500).json(errorMsg("Something went wrong"))
    }
  },

  updateActor: async (req, res) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(403).json(errorMsg("No content to update!"))
      }
      const actor = await Actor.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true })
      res.status(200).send(actor)
    } catch (error) {
      res.status(500).json(errorMsg(error))
    }
  },

  // doesnt require a ActorId
  getAllActors:
    async (req, res) => {
      try {
        const actors = await Actor.find()
        res.status(200).json(successMsg(actors))
      } catch (error) {
        res.status(500).json(errorMsg(error))
      }
    },

  createActor:
    async (req, res) => {
      try {
        const actor = await Actor.create(req.body)
        res.status(201).json(successMsg(actor))
      } catch (err) {
        res.status(500).json(errorMsg(err))
      }
    },
}