class ApiError extends Error {
  constructor(message = "Something went wrong", status_code = 500) {
    super(message);
    this.status = "error";
    this.code = status_code;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;