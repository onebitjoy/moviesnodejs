import User from "../models/user.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"

export const authController = {
  signup: asyncErrorHandler(
    async (req, res, next) => {
      const newUser = await User.create(req.body)
      res.status(201).json({
        status: "success",
        data: newUser
      })
    }
  )
}