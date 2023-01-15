const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;
const NOT_FOUND = 404;
const authorizationErrorMessage = 'Authorization error';

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;

module.exports = {
  BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, authorizationErrorMessage,
};
