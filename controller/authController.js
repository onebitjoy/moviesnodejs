import User from "../models/user.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import CustomError from "../utils/CustomError.js"

export const authController = {
  signup: asyncErrorHandler(
    async (req, res, next) => {
      const new_user = await User.create(req.body)
      const token = await new_user.generateAuthToken()
      res.status(201).json({
        status: "success",
        token,
        data: new_user
      })

    }
  ),
  login: asyncErrorHandler(async function (req, res, next) {

    const { email, password } = req.body

    if (!email || !password) {
      const error = new CustomError("Please enter email & password for login", 400)
      return next(error)
    }

    const user = await User.findByCredentials(email, password, next)
    const token = await user.generateAuthToken()

    user.password = undefined
    res.status(200).json(
      {
        status: "successful",
        token,
        user
      }
    )
  })
}
