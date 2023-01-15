class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

const notFoundMessage = 'Card is not found';

module.exports = { NotFoundError, notFoundMessage };
