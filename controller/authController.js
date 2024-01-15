import User from "../models/user.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import CustomError from "../utils/CustomError.js"
import { sendEmail } from "../utils/email.js"
import crypto from "crypto"
import pkg from "bcryptjs"
const { compare } = pkg

export const authController = {
  signup: asyncErrorHandler(
    async (req, res, next) => {
      const user = await User.create(req.body)

      const token = await user.generateAuthToken()
      res.status(200).json(
        {
          status: "successful",
          token,
          user
        }
      )
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

    const updatedUser = user

    delete updatedUser.password
    delete updatedUser.passwordChangedAt

    res.status(200).json(
      {
        status: "successful",
        token,
        updatedUser
      }
    )
  }),

  logout: asyncErrorHandler(
    async (req, res, next) => {

      const user = req.user

      const token = req.headers.authorization
      if (!token || !token.startsWith('Bearer')) {
        return next(new CustomError("Please login first!", 401))
      }

      let authToken = token.split(" ")[1]

      let tokens = user.tokens.filter((tkn) => {
        return tkn.token !== authToken
      })

      user.tokens = tokens
      await user.save()

      res.status(200).json({
        status: "successful",
        message: "You have been successfully logged out"
      })
    }
  ),

  logoutAll: asyncErrorHandler(
    async (req, res, next) => {

      const user = req.user

      const token = req.headers.authorization
      if (!token || !token.startsWith('Bearer')) {
        return next(new CustomError("Please login first!", 401))
      }

      // check if the user even has auth token from step 1
      let authToken = token.split(" ")[1] //redundant, but keeping it
      let userTokens = []
      user.tokens.forEach(tkn => userTokens.push(tkn.token))
      if (!userTokens.includes(authToken)) {
        return next(new CustomError("Please login first. No auth.", 401))
      }

      // reset token list
      user.tokens = []
      await user.save()

      res.status(200).json({
        status: "successful",
        message: "You have been successfully logged out from all your devices!"
      })
    }
  ),

  forgotPassword: asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return next(new Error("No such user with credentials found!", 404))
    }

    const resetToken = user.createPasswordResetToken()

    await user.save({ validateBeforeSave: false })
    const resetLink = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`

    try {
      await sendEmail({
        sender: "Resetter@funmail.com",
        email: user.email,
        subject: "Password Reset",
        username: user.name,
        resetLink: resetLink
      })

      res.status(200).json({
        status: "success",
        message: "Reset mail sent!",
      })
    } catch (error) {
      user.passwordResetExpires = undefined
      user.passwordResetToken = undefined
      await user.save()
      return next(CustomError("Can't initiate password reset!", 500))
    }
  }),

  resetPassword: asyncErrorHandler(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } })

    if (!user) {
      return next(new CustomError("No such user with credentials found!", 404))
    }

    user.password = req.body.password

    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()
    const token = await user.generateAuthToken()

    const updatedUser = user

    delete updatedUser.password
    delete updatedUser.passwordChangedAt

    res.status(200).json(
      {
        status: "successful",
        token,
        updatedUser
      }
    )
  }),

  updatePassword: asyncErrorHandler(async (req, res, next) => {
    // user.password -- hashed in DB
    // req.body.currentUserPassword -- the password that was hashed
    // req.body.newPassword -- new password to be set
    const { currentUserPassword, newPassword } = req.body

    const user = await User.findById(req.user.id).select("+password")

    if (!currentUserPassword) {
      next(new CustomError("No password given, can't update password!", 403))
    }
    const comparePassword = await compare(currentUserPassword, user.password)
    if (!comparePassword) {
      return next(new CustomError("Wrong password given!", 403))
    }

    user.password = newPassword
    await user.save()

    const token = await user.generateAuthToken()

    const updatedUser = user

    delete updatedUser.passwordChangedAt
    delete updatedUser.password

    res.status(200).json(
      {
        status: "successful",
        token,
        user
      }
    )

  }),

  // a closure fn to return function with specified roles
  accessChecker: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new CustomError(`Unauthorized Access`, 403))
      }
      next()
    }
  },
  /*
   The function is called with the role(enum: user | admin) parameter which returns a function
   which  will return an error if the role doesnt match the specified role in the calling.
   So the function is called as => authController.accessChecker("admin"), returns 
    (req, res, next) => {
      if (req.user.role !== "admin") {
        return next(new CustomError(`User is not authorized to access the path`, 403))
      }
      next()
    }
    This function will be executed by express as a middleware
  */
}