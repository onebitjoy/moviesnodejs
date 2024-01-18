import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import jwt from "jsonwebtoken"
import CustomError from "../utils/CustomError.js"
import util from "util"
import User from "../models/user.js"
import { customAlphabet } from "nanoid"
/**
 * 1 - Check if token exist and then read
 * 2 - validate token
 * 3 - check if user exist
 * 4 - If the user change password after the token was issued
 * 5 - Allow the user to access route
 */
export const auth = asyncErrorHandler(
  async (req, res, next) => {

    // // get auth token from request headers
    // const token = req.headers.authorization
    // if (!token || !token.startsWith('Bearer')) {
    //   return next(new CustomError("Please login first!", 401))
    // }
    // let authToken = token.split(" ")[1]

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      token = req.cookies["jwt"];
    }

    // find user using decoded token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_KEY)
    const user = await User.findById(decodedToken.id)
    if (!user) {
      return next(new CustomError("Can't find any user with the credentials", 401))
    }

    // check if the user even has auth token from step 1
    let userTokens = []
    user.tokens.forEach(tkn => userTokens.push(tkn.token))
    if (!userTokens.includes(token)) {
      return next(new CustomError("Please login first. No auth.", 401))
    }

    // check if the password has been changed after token issue epoch
    if (await user.isPasswordChanged(decodedToken.iat)) {
      return next(new CustomError("Unauthorized! Password has been changed. Please re-login!", 401))
    }

    // attaching so it can be used later on other following functions, since this is auth.
    req.user = user
    next()
  }
)