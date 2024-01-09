import asyncErrorHandler from "../utils/asyncErrorHandler.js"

export const getHighestRated = asyncErrorHandler(
  function (req, res, next) {
    req.query.limit = '10'
    req.query.sort = '-rating'

    next()
  }
)