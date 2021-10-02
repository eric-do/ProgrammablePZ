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

class AuthenticationError extends ServerError {
  constructor(error) {
    super(error.message);
    this.statusCode = 401;
    this.name="Authentication error";
    this.message = "Authentication unsuccessful. Please login and try again.";
  }
}

class InvalidLoginError extends ServerError {
  constructor(error) {
    super(error.message);
    this.statusCode = 401;
    this.name="Login error";
    this.message = "Invalid username or password.";
  }
}

class InvalidRegistrationError extends ServerError {
  constructor(error) {
    super(error.message);
    this.statusCode = 409;
    this.name = "Registration Error";
    this.message = "Username or email are unavailable."
  }
}

module.exports = {
  BadRequestError,
  InternalServerError,
  AuthenticationError,
  InvalidLoginError,
  InvalidRegistrationError
}