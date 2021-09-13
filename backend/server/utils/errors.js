class ServerError extends Error {
  constructor(error) {
    super(error);
    this.data = error;
  }
}

class BadRequestError extends ServerError {
  constructor(error) {
    super(error.message);
    this.statusCode = 400;
  }
}

class InternalServerError extends ServerError {
  constructor(error) {
    super(error.message);
    this.statusCode = 500;
  }
}

module.exports = {
  BadRequestError,
  InternalServerError
}