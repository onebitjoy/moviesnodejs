// We are only catching Operational Errors, which are different from grammatical errors
class CustomError extends Error {

  constructor(message, statusCode) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error"

    // to identify whether we have prepared an error fallback for particular error
    this.isOperational = true

    // cST() is used to customize error object by reducing stack traces and adding additional details
    // Error.captureStackTrace(this, CustomError) -- another way of doing it,
    // adding this.constructor or CustomError, we exclude the error class itself from the stack trace
    // this -- instance for which you want to capture the stackTrace for(since there may be multiple)
    Error.captureStackTrace(this, this.constructor)
  }

}

export default CustomError