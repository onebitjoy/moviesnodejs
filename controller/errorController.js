// the reason why express understands this is global error handler is its function signature

function productionError(res, error) {
  if (error.isOperational) {
    res.status(error.statusCode).json(
      {
        status: error.statusCode,
        message: error.message,
      }
    )
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
      stack: error.stack,
      error
    }
  )
}

export default (error, req, res, next) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || "error"

  if (process.env.NODE_ENV === 'development') {
    developmentError(res, error)
  } else if (process.env.NODE_ENV === 'production') {
    productionError(res, error)
  }
}