import { errorMsg } from "../messages/errorMsg.js"
import { successMsg } from "../messages/successMsg.js"
import Actor from "../models/actor.js"

export const ActorController = {
  // require a ActorId
  getActor:
    async (req, res) => {
      try {
        const actor = await Actor.findById(req.params.ActorId)
        res.status(201).json(successMsg(actor))
      } catch (error) {
        res.status(500).json(errorMsg(error))
      }
    },

  deleteActor: async (req, res) => {
    try {
      const { deletedCount } = await Actor.deleteOne({})
      if (deletedCount == 1) {
        res.status(200).json(successMsg("The Actor has been successfully deleted!"))
      } else {
        res.status(500).json(errorMsg("Can't delete actor"))
      }
    } catch (error) {
      res.status(500).json(errorMsg(error))
    }
  },

  updateActor: async (req, res) => {

  },

  // doesnt require a ActorId
  getAllActors:
    async (req, res) => {
      try {
        const actors = await Actor.find()
        res.status(201).json(successMsg(actors))
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