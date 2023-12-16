import { errorMsg } from "../messages/errorMsg.js"
import { successMsg } from "../messages/successMsg.js"
import Director from "../models/director.js"

export const DirectorController = {
  // require a DirectorId
  getDirector:
    async (req, res) => {
      try {
        const director = await Director.findById(req.params.DirectorId)
        res.status(201).json(successMsg(director))
      } catch (error) {
        res.status(500).json(errorMsg(error))
      }
    },

  deleteDirector: async (req, res) => {
    try {
      const { deletedCount } = await Director.deleteOne()
      if (deletedCount == 1) {
        res.status(200).json(successMsg("The Director has been successfully deleted!"))
      } else {
        res.status(500).json(errorMsg("Can't delete director"))
      }
    } catch (error) {
      res.status(500).json(errorMsg(error))
    }
  },

  updateDirector: async (req, res) => {

  },

  // doesnt require a DirectorId
  getAllDirectors:
    async (req, res) => {
      try {
        const directors = await Director.find()
        res.status(201).json(successMsg(directors))
      } catch (error) {
        res.status(500).json(errorMsg(error))
      }
    },

  createDirector:
    async (req, res) => {
      try {
        const director = await Director.create(req.body)
        res.status(201).json(successMsg(director))
      } catch (err) {
        res.status(500).json(errorMsg(err))
      }
    },
}