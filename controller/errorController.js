/*
Lessons
-------
1. An invalid Id is dif fr a movie that is not found! So if you use equal length valid string but not
  a movieId, it is not going to return an error object, just null, to get null,
  use shorter/longer lengthed movieId, which is invalid
2. When we are using CustomError, it attaches a `isOperational=true` to the error,
  then productionErrors checks if there is isOperational,
  and then those handled errors are handled properly, else send a generic error. 
*/

import CustomError from "../utils/CustomError.js"

function productionError(res, error) {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message
    });
  } else {
    // generic error
    res.status(500).json({
      status: "error",
      message: "Something went wrong!"
    })
  }
}

function developmentError(res, error) {
  res.status(error.statusCode).json(
    {
      status: error.statusCode,
      message: error.message,
      stackTrace: error.stack,
      error: error
    }
  )
}

function castErrorHandler(error) {
  const msg = `Invalid value passed -- ${error.path}(${error.kind}) : ${error.value}(${error.valueType})`
  return new CustomError(msg, 400)
}

function validationErrorHandler(error) {
  const errors = Object.values(error.errors).map(e => e.message).join(", ")
  const msg = `Invalidation Errors: ${errors}`
  return new CustomError(msg, error.statusCode)
}


function JWTTokenExpireErrorHandler(error) {
  const msg = `Token Expired. Login Again`
  return new CustomError(msg, 401)
}

function JWTInvalidErrorHandler(params) {
  const msg = `Invalid Token Signature`
  return new CustomError(msg, 401)
}

// the reason why express understands this is global error handler is its function signature
export default (error, req, res, next) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || "error"

  if (process.env.NODE_ENV === 'development') {
    developmentError(res, error)
  } else if (process.env.NODE_ENV === 'production') {
    if (error.name === "CastError") { error = castErrorHandler(error) }
    if (error.name === "ValidationError") { error = validationErrorHandler(error) }
    if (error.name === "TokenExpiredError") { error = JWTTokenExpireErrorHandler(error) }
    if (error.name === "JsonWebTokenError") { error = JWTInvalidErrorHandler(error) }
    productionError(res, error)
  }
}