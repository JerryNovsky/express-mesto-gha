class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

const forbiddenMessage = 'It is not your card';

module.exports = { ForbiddenError, forbiddenMessage };
