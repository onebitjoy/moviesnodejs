import User from "../models/user.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import CustomError from "../utils/CustomError.js"
import util from "util"
import jwt from "jsonwebtoken"

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

    // user.password = undefined
    res.status(200).json(
      {
        status: "successful",
        token,
        // user
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
  )
}

