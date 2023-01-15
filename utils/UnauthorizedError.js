class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

const authorizationErrorMessage = 'Authorization error';

module.exports = { UnauthorizedError, authorizationErrorMessage };
