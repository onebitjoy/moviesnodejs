import User from "../models/user.js"
import { ApiFeatures } from "../utils/apiFeatures.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import { filterObject } from "../utils/filterObject.js"

const userController = {

  getUser: asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({
      status: "success",
      data: user
    })
  }),

  // works
  getAllUsers: asyncErrorHandler(async (req, res, next) => {
    let query = User.find()
    let apiFeatures = new ApiFeatures(query, req.query)
    apiFeatures.filter().sort().paginate()
    const users = await apiFeatures.query

    res.status(200).json({
      status: "success",
      length: users?.length,
      data: users
    })
  }),

  // works
  createUser: asyncErrorHandler(async (req, res, next) => {
    const { name, email, role, photo, password } = req.body
    const user = await User.create({ name, email, role, photo, password })

    res.status(200).json({
      status: "success",
      message: `The user has been created!`,
      createdUser: {
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo
      }
    })
  }),


  updateUser: asyncErrorHandler(async (req, res, next) => {
    console.log("updateUser running")
    res.json({
      status: "failure",
      message: "This route is not yet implemented"
    })
  }),


  deleteUser: asyncErrorHandler(async (req, res, next) => {
    res.json({
      status: "failure",
      message: "This route is not yet implemented"
    })
  }),

  updateMe: asyncErrorHandler(async (req, res, next) => {
    if (req.body.password) {
      return next(new CustomError("You can't update password on this route!", 400))
    }
    const sanitizedUpdates = filterObject(req.body, 'name', 'email')
    const updatedUser = await User.findByIdAndUpdate(req.user.id, sanitizedUpdates, { new: true, runValidators: true })
    res.status(200).json({
      status: "success",
      data: { user: updatedUser }
    })
  }),

  deleteMe: asyncErrorHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })

    res.status(204).json({
      status: "success",
      data: null
    })
  }),
}

export default userController