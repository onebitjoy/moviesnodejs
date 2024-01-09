import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import jwt from "jsonwebtoken"
import CustomError from "../utils/CustomError.js"
import util from "util"
/**
 * 1 - Check if token exist and then read
 * 2 - validate token
 * 3 - check if user exist
 * 4 - If the user change password after the token was issued
 * 5 - Allow the user to access route
 */
export const auth = asyncErrorHandler(
  async (req, res, next) => {
    const token = req.headers.authorization

    if (!token || !token.startsWith('Bearer')) {
      return next(new CustomError("Please login first!", 401))
    }

    let authToken = token.split(" ")[1]

    const decodedToken = await util.promisify(jwt.verify)(authToken, process.env.SECRET_KEY)

    if (decodedToken) {
      //
      // console.log(`Token: ${authToken} is verified!`);
    }
    next()
  }
)