class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

const serverMessage = 'Internal Server Error';

module.exports = { InternalServerError, serverMessage };
