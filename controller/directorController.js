import { errorMsg } from "../messages/errorMsg.js"
import { successMsg } from "../messages/successMsg.js"
import Director from "../models/director.js"

export const directorController = {
  // requires a DirectorId
  getDirector:
    async (req, res) => {
      try {
        const director = await Director.findById(req.params.directorId)
        res.status(200).json(successMsg(director))
      } catch (error) {
        res.status(500).json(errorMsg(error))
      }
    },

  deleteDirector: async (req, res) => {
    try {
      const director = await Director.findByIdAndDelete(req.params.directorId)
      if (director.fullName) {
        res.status(200).json(successMsg("The director has been successfully deleted!"))
      } else {
        res.status(500).json(errorMsg("Can't delete Director"))
      }
    } catch (error) {
      res.status(500).json(errorMsg("Something went wrong"))
    }
  },

  updateDirector: async (req, res) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.status(203).json(errorMsg("No Content to Update!"))
      }
      const director = await Director.findOneAndUpdate({ _id: req.params.directorId }, req.body, { new: true })
      res.status(200).send(director)
    } catch (error) {
      res.status(500).json(errorMsg(error))
    }
  },

  // doesnt require a DirectorId
  createDirector:
    async (req, res) => {
      try {
        const director = await Director.create(req.body)
        res.status(201).json(successMsg(director))
      } catch (err) {
        res.status(500).json(errorMsg(err))
      }
    },
  getAllDirectors:
    async (req, res) => {
      try {
        const directors = await Director.find()
        res.status(200).json(successMsg(directors))
      } catch (error) {
        res.status(500).json(errorMsg(error))
      }
    },

}