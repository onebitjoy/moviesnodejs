export default (error, req, res, next) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || "error"
  res.status(error.statusCode).json(
    {
      message: error.message,
      status: error.statusCode,
    }
  )
}